// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CCRManager is AccessControl {
    using SafeMath for uint256;

    address payable admin = payable(msg.sender);

    IERC20 ccrCoin;
    uint256 public tokenToMaticRate = 10; // 1 token = 0.1 matic

    // Roles
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant INSTRUCTOR_ROLE = keccak256("INSTRUCTOR_ROLE");
    bytes32 public constant LEARNER_ROLE = keccak256("LEARNER_ROLE");

    // Events
    event CourseCreated(bytes32 uid, address creator, string videoLink);
    event CourseUpdated(
        bytes32 uid,
        address updater,
        Status status,
        string videoLink
    );
    event CourseEnrolled(bytes32 uid, address student);
    event EarningsWithdrawn(address admin, uint256 amount);

    // Global variable for course creation fee
    uint256 public courseCreationFee = 35; // Default course creation fee

    constructor(address _ccrCoin) {
        ccrCoin = IERC20(_ccrCoin);
        grantRole(ADMIN_ROLE, msg.sender);
    }

    struct User {
        address addr;
        Type usertype;
        bytes32[] courses; // Changed to bytes32 array for gas optimization
        uint256 totalRewardsEarned;
        uint256 currentBalance;
    }

    enum Type {
        Learner,
        Instructor
    }

    mapping(address => User) public users;

    struct Course {
        bytes32 uid; // Changed to bytes32 for gas optimization
        address creator;
        Tag tag;
        Status status;
        uint256 priceInMatic;
        address[] students;
        string videoLink; // New field for video link
    }

    enum Tag {
        Frontend,
        Backend,
        Web3,
        Fullstack
    }

    enum Status {
        CREATED,
        UNDER_REVIEW,
        HIDDEN,
        PUBLISHED,
        ACCEPTED,
        REJECTED
    }

    mapping(bytes32 => Course) public courses; // Changed to bytes32 for gas optimization
    mapping(bytes32 => mapping(address => bool)) public isStudentEnrolled; // Changed to bytes32 for gas optimization

    /**
     * @dev Modifier to restrict function access to instructors only.
     */
    modifier onlyInstructor() {
        require(
            hasRole(INSTRUCTOR_ROLE, msg.sender),
            "Caller is not an instructor"
        );
        _;
    }

    /**
     * @dev Modifier to restrict function access to learners only.
     */
    modifier onlyLearner() {
        require(hasRole(LEARNER_ROLE, msg.sender), "Caller is not a learner");
        _;
    }

    /**
     * @dev Allows users to sign up.
     */
    function signup(Type selectedType) external {
        require(users[msg.sender].addr == address(0), "User already exists");

        // 100 user rewards
        ccrCoin.transfer(msg.sender, 100);

        users[msg.sender] = User({
            addr: msg.sender,
            usertype: selectedType,
            courses: new bytes32[](0), // Initialize as bytes32 array for gas optimization
            totalRewardsEarned: 100,
            currentBalance: 100
        });
        if (selectedType == Type.Instructor) {
            grantRole(INSTRUCTOR_ROLE, msg.sender);
        } else {
            grantRole(LEARNER_ROLE, msg.sender);
        }
    }

    /**
     * @dev Allows users to log in.
     */
    function login() external view returns (User memory) {
        require(users[msg.sender].addr != address(0), "User not registered");
        return users[msg.sender];
    }

    /**
     * @dev Allows instructors to create a new course.
     * @param _uid Unique identifier for the course.
     * @param _tag Tag of the course.
     * @param _priceInMatic Price of the course in Matic.
     * @param _videoLink Video link for the course.
     * @param _payWithMatic Boolean indicating whether the payment is made with Matic or CCR tokens.
     */
    function createCourse(
        bytes32 _uid,
        Tag _tag,
        uint256 _priceInMatic,
        string memory _videoLink, // Added video link parameter
        bool _payWithMatic // Added boolean parameter to indicate payment method
    ) external payable onlyInstructor returns (Course memory) {
        // Ensure the payment is enough in the chosen payment method
        if (_payWithMatic) {
            // Payment in Matic
            require(
                msg.value >= courseCreationFee.div(tokenToMaticRate),
                "Insufficient Matic payment"
            );
        } else {
            // Payment in CCR tokens
            require(
                ccrCoin.allowance(msg.sender, address(this)) >= _priceInMatic,
                "Insufficient CCR token allowance for payment"
            );
        }

        // Transfer Matic or CCR tokens based on the chosen payment method
        if (_payWithMatic) {
            // Payment in Matic
            (bool success, ) = admin.call{value: msg.value}("");
            require(success, "Fund transfer error");
        } else {
            // Payment in CCR tokens
            require(
                ccrCoin.transferFrom(msg.sender, address(this), _priceInMatic),
                "Failed to transfer CCR tokens"
            );
        }

        Course memory newCourse = Course({
            uid: _uid,
            creator: msg.sender,
            tag: _tag,
            status: Status.CREATED,
            priceInMatic: _priceInMatic,
            students: new address[](0),
            videoLink: _videoLink // Set the video link
        });
        courses[_uid] = newCourse;
        emit CourseCreated(_uid, msg.sender, _videoLink); // Emit the video link along with the event
        return newCourse;
    }

    /**
     * @dev Allows learners to enroll in a course.
     * @param _uid Unique identifier of the course.
     * @param _priceInMatic Price of the course in Matic.
     * @param _priceInCCR Price of the course in CCR tokens.
     * @param _payWithMatic Boolean indicating whether the payment is made with Matic or CCR tokens.
     */
    function enrollCourse(
        bytes32 _uid,
        uint256 _priceInMatic,
        uint256 _priceInCCR,
        bool _payWithMatic
    ) external payable onlyLearner returns (Course memory) {
        Course storage course = courses[_uid];
        uint256 totalPayment;

        // Ensure the course is available for enrollment
        require(
            course.status == Status.PUBLISHED ||
                course.status == Status.ACCEPTED,
            "Course not available for enrollment"
        );

        // Determine the total payment based on the chosen payment method
        if (_payWithMatic) {
            // Payment in Matic
            require(
                msg.value >= _priceInMatic.mul(tokenToMaticRate),
                "Insufficient Matic payment"
            );
            totalPayment = _priceInMatic;
        } else {
            // Payment in CCR tokens
            require(
                ccrCoin.allowance(msg.sender, address(this)) >= _priceInCCR,
                "Insufficient CCR token allowance for payment"
            );
            totalPayment = _priceInCCR;
        }

        // Ensure the correct payment is made
        require(
            totalPayment == _priceInMatic || totalPayment == _priceInCCR,
            "Incorrect payment amount"
        );

        // Transfer payment to the course creator
        if (_payWithMatic) {
            // Payment in Matic
            payable(course.creator).transfer(msg.value);
        } else {
            // Payment in CCR tokens
            require(
                ccrCoin.transferFrom(msg.sender, course.creator, _priceInCCR),
                "Failed to transfer CCR tokens to course creator"
            );
        }

        // Mark the learner as enrolled in the course
        require(
            !isStudentEnrolled[_uid][msg.sender],
            "Already enrolled in this course"
        );
        isStudentEnrolled[_uid][msg.sender] = true;
        course.students.push(msg.sender);
        emit CourseEnrolled(_uid, msg.sender);
        return course;
    }

    /**
     * @dev Allows instructors to withdraw their earnings.
     */
    function withdrawEarnings() external {
        User storage user = users[msg.sender];
        require(
            user.usertype == Type.Instructor,
            "Only instructors can withdraw earnings"
        );
        uint256 totalRewards = user.totalRewardsEarned;
        require(totalRewards > 0, "No rewards to withdraw");
        user.totalRewardsEarned = 0;
        require(
            ccrCoin.transfer(msg.sender, totalRewards),
            "Failed to transfer earnings"
        );
    }
}
