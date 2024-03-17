import "./App.css";
import AuthForm from "./pages/AuthForm";
// import CourseUpload from "./components/CourseUpload";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/Profile";
import Header from "./components/Header";
import ProductDetails from "./pages/ProductDetails";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const CCRManagerAddress = "0x8d33753E5A0B17298e711598C15B74BdD1e6d88E";
const CCRManagerABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ccrCoin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "uid",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "videoLink",
        type: "string",
      },
    ],
    name: "CourseCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "uid",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "student",
        type: "address",
      },
    ],
    name: "CourseEnrolled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "uid",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "updater",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum CCRManager.Status",
        name: "status",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "videoLink",
        type: "string",
      },
    ],
    name: "CourseUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EarningsWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "INSTRUCTOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LEARNER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "courseCreationFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "courses",
    outputs: [
      {
        internalType: "bytes32",
        name: "uid",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "enum CCRManager.Tag",
        name: "tag",
        type: "uint8",
      },
      {
        internalType: "enum CCRManager.Status",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "priceInMatic",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "videoLink",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_uid",
        type: "bytes32",
      },
      {
        internalType: "enum CCRManager.Tag",
        name: "_tag",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_priceInMatic",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_videoLink",
        type: "string",
      },
      {
        internalType: "bool",
        name: "_payWithMatic",
        type: "bool",
      },
    ],
    name: "createCourse",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "enum CCRManager.Tag",
            name: "tag",
            type: "uint8",
          },
          {
            internalType: "enum CCRManager.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "priceInMatic",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "students",
            type: "address[]",
          },
          {
            internalType: "string",
            name: "videoLink",
            type: "string",
          },
        ],
        internalType: "struct CCRManager.Course",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_uid",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_priceInMatic",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_priceInCCR",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_payWithMatic",
        type: "bool",
      },
    ],
    name: "enrollCourse",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "enum CCRManager.Tag",
            name: "tag",
            type: "uint8",
          },
          {
            internalType: "enum CCRManager.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "priceInMatic",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "students",
            type: "address[]",
          },
          {
            internalType: "string",
            name: "videoLink",
            type: "string",
          },
        ],
        internalType: "struct CCRManager.Course",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllCourses",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "enum CCRManager.Tag",
            name: "tag",
            type: "uint8",
          },
          {
            internalType: "enum CCRManager.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "priceInMatic",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "students",
            type: "address[]",
          },
          {
            internalType: "string",
            name: "videoLink",
            type: "string",
          },
        ],
        internalType: "struct CCRManager.Course[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isStudentEnrolled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "login",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "enum CCRManager.Type",
            name: "usertype",
            type: "uint8",
          },
          {
            internalType: "bytes32[]",
            name: "courses",
            type: "bytes32[]",
          },
          {
            internalType: "uint256",
            name: "totalRewardsEarned",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct CCRManager.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum CCRManager.Type",
        name: "selectedType",
        type: "uint8",
      },
    ],
    name: "signup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenToMaticRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "enum CCRManager.Type",
        name: "usertype",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "totalRewardsEarned",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawEarnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CCRTokenAddress = "0xc4d571A3F5B772310d137aFc14289a31D897Bb60";
const CCRTokenABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allCourses, setAllCourses] = useState(null);

  useEffect(() => {
    const getAllCourses = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CCRManagerAddress,
        CCRManagerABI,
        signer
      );
      const courses = await contract.getAllCourses();
      setAllCourses(courses);
    };
    getAllCourses();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <AuthForm
                CCRManagerABI={CCRManagerABI}
                CCRManagerAddress={CCRManagerAddress}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
          <Route path="/home" element={<Homepage allCourses={allCourses} />} />
          <Route path="/contact" element={<Homepage />} />
          <Route
            path="/profile"
            element={
              <ProfilePage
                CCRManagerABI={CCRManagerABI}
                CCRManagerAddress={CCRManagerAddress}
                loggedInUser={loggedInUser}
              />
            }
          />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                CCRManagerABI={CCRManagerABI}
                CCRManagerAddress={CCRManagerAddress}
                allCourses={allCourses}
                CCRTokenAddress={CCRTokenAddress}
                CCRTokenABI={CCRTokenABI}
              />
            }
          />
          {/* <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// "react-swipeable-views": "^0.14.0",
// "react-swipeable-views-utils": "^0.14.0",
