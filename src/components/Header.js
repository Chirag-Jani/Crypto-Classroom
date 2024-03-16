import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from "./../images/logo.jpg";


const Header = () => {
    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(to right, rgba(0, 51, 102, 1) 30%, rgba(51, 204, 204, 0.8) 190%, rgba(112, 128, 144, 1) 50%)' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {/* Replace with your main logo */}
                    <img src={Logo} alt="Main Logo" style={{ height: '70px', borderRadius: 35 }} />
                </Typography>
                {/* Navigation Buttons */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Button color="inherit" component={Link} to="/home">Homepage</Button>
                    <Button color="inherit" component={Link} to="/about">About Us</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact Us</Button>
                </Box>

                {/* Logo */}
                <Box sx={{ flexGrow: 0 }}>
                    <img src={Logo} alt="Logo" style={{ height: '50px' }} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;