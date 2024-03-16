import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./../images/logo.jpg";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(to right, rgba(0, 51, 102, 1) 30%, rgba(51, 204, 204, 0.8) 190%, rgba(112, 128, 144, 1) 50%)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/">
          {/* Replace with your main logo */}
          <img
            src={Logo}
            alt="Main Logo"
            style={{ height: "50px", borderRadius: 35, margin: "10px" }}
          />
        </Typography>
        {/* Navigation Buttons */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Button color="inherit" component={Link} to="/home">
            Homepage
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About Us
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact Us
          </Button>
        </Box>

        {/* Logo */}
        <ConnectWallet />
        <Link to={"/profile"}>
          <Box sx={{ flexGrow: 0, mx: 2 }}>
            <img
              src="https://www.svgrepo.com/show/170633/profile-user.svg"
              alt="Logo"
              style={{ height: "50px" }}
            />
          </Box>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
