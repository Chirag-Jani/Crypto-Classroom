import React, { useState } from "react";
import {
  Box,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  Avatar,
} from "@mui/material";

import Metamask from "./../images/metamask.jpg";
import Logo from "./../images/logo.jpg";
import ConnectButton from "./../components/ConnectWallet";
import { ethers } from "ethers";

const AuthForm = ({ CCRManagerABI, CCRManagerAddress, setLoggedInUser }) => {
  const [formType, setFormType] = useState("login");
  const [userType, setUserType] = useState("");

  const handleFormTypeChange = (event) => {
    setFormType(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async () => {
    // API call logic here
    console.log(userType);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CCRManagerAddress,
      CCRManagerABI,
      signer
    );
    if (formType !== "login") {
      const auth = await contract.signup(userType === "learner" ? 0 : 1);
      setLoggedInUser(auth);
    } else {
      const auth = await contract.login();
      console.log(auth);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundSize: "cover",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#011f35",
          display: "flex",
        }}
      >
        <Avatar
          sx={{
            height: 350,
            width: 350,
            alignItems: "center",
            justifyContent: "center",
          }}
          src={Logo}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 2,
          background:
            "linear-gradient(to right, rgba(0, 51, 102, 1) 30%, rgba(51, 204, 204, 0.8) 90%, rgba(112, 128, 144, 1) 50%)",
          // Adjust padding as needed
        }}
      >
        <Card
          sx={{
            minWidth: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
          }}
        >
          <FormControl component="fieldset" sx={{ marginY: 2 }}>
            <FormLabel
              sx={{
                marginTop: 2,
                marginBottom: 1,
                paddingTop: 2,
                fontWeight: 700,
                fontSize: 24,
              }}
              component="legend"
            >
              Login / Register
            </FormLabel>
            <RadioGroup
              sx={{ display: "flex", flexDirection: "row", marginBottom: 1 }}
              value={formType}
              onChange={handleFormTypeChange}
            >
              <FormControlLabel
                value="login"
                control={<Radio />}
                label="Login"
              />
              <FormControlLabel
                value="signup"
                control={<Radio />}
                label="Signup"
              />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ marginBottom: 1.5, width: 270 }}>
            <Select
              value={userType}
              onChange={handleUserTypeChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select User Type
              </MenuItem>
              <MenuItem value="tutor">Tutor</MenuItem>
              <MenuItem value="learner">Learner</MenuItem>
            </Select>
          </FormControl>

          <ConnectButton />
          <Button
            startIcon={
              <img
                src={Metamask}
                alt="Metamask"
                style={{ width: "24px", height: "24px", borderRadius: 12 }}
              />
            }
            variant="contained"
            color="primary"
            sx={{ marginBottom: 4, marginTop: 1.5 }}
            onClick={handleSubmit}
          >
            Sign up with Metamask
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default AuthForm;
