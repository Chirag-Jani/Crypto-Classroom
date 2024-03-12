// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CCRManager is AccessControl {

    IERC20 ccrCoin;

    // Roles
    bytes32 public constant INSTRUCTOR_ROLE = keccak256("INSTRUCTOR_ROLE");
    bytes32 public constant LEARNER_ROLE = keccak256("LEARNER_ROLE");

    // Events
    event CourseCreated(bytes32 uid, address creator, string videoLink);
    event CourseUpdated(bytes32 uid, address updater, Status status, string videoLink);
    event CourseEnrolled(bytes32 uid, address student);

    constructor(address _ccrCoin) {
        ccrCoin = IERC20(_ccrCoin);
        // _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    struct User {
        address addr;
        Type usertype;
        bytes32[] courses; // Changed to bytes32 array for gas optimization
        uint256 totalRewardsEarned;
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
        users[msg.sender] = User({
            addr: msg.sender,
            usertype: selectedType,
            courses: new bytes32[](0), // Initialize as bytes32 array for gas optimization
            totalRewardsEarned: 0
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
     */
    function createCourse(
        bytes32 _uid,
        Tag _tag,
        uint256 _priceInMatic,
        string memory _videoLink // Added video link parameter
    ) external onlyInstructor returns (Course memory) {
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
     * @dev Allows instructors to update a course's status.
     */
    function updateCourse(bytes32 _uid, Status _status)
        external
        onlyInstructor
        returns (Course memory)
    {
        require(
            courses[_uid].creator == msg.sender,
            "Only course creator can update"
        );
        Course storage course = courses[_uid];
        course.status = _status;
        emit CourseUpdated(_uid, msg.sender, _status, course.videoLink); // Emit the video link along with the event
        return course;
    }

    /**
     * @dev Allows learners to enroll in a course.
     */
    function enrollCourse(bytes32 _uid)
        external
        payable
        onlyLearner
        returns (Course memory)
    {
        Course storage course = courses[_uid];
        require(
            course.status == Status.PUBLISHED ||
                course.status == Status.ACCEPTED,
            "Course not available for enrollment"
        );
        require(
            msg.value == course.priceInMatic,
            "Incorrect amount sent for course enrollment"
        );
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

