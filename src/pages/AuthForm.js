import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Card, Radio, RadioGroup, FormControlLabel, Select, MenuItem, Button, FormControl, FormLabel } from '@mui/material';
import cover from "./../images/bg_img.jpg";
import Metamask from "./../images/metamask.jpg";
import Avatar from '@mui/material/Avatar';
import Logo from './../images/logo.jpg'
import { useTheme } from '@mui/material/styles';
import ConnectButton from "./../components/ConnectWallet";



// import { Image } from '@mui/icons-material';
// // Custom theme
// const theme = createTheme({
//     palette: {
//         primary: { main: '#003366' },
//         secondary: { main: '#33CCCC' },
//         background: { paper: '#708090' },
//     },
//     // Additional theme customization here
// });


const useStyles = makeStyles(theme => ({
    // root: {
    //     height: '100vh',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
    // },
    container: {
        display: 'flex',
        height: '100vh',
    },
    imageSide: {
        flex: 1,
        backgroundImage: 'url(/bg_img.jpg)', // Replace with your image path
        backgroundSize: 'cover',
    },
    formSide: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        // padding: theme.spacing(4),
        minWidth: 300,
    },
    formControl: {
        // margin: theme.spacing(2, 0),
    },
    button: {
        // margin: theme.spacing(2, 0),
    },
}));

const AuthForm = () => {
    const classes = useStyles();
    const [formType, setFormType] = useState('login');
    const [userType, setUserType] = useState('');

    const handleFormTypeChange = (event) => {
        setFormType(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleSubmit = () => {
        // API call logic here
    };

    return (
        // <MuiThemeProvider theme={theme}>
        <Box sx={{
            display: 'flex',
            height: '100vh',
            flex: 1,

        }}>
            <Box sx={{
                flex: 1,
                // backgroundImage: `url(${cover})`, // Replace with your image path
                backgroundSize: 'cover',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#011f35',
                display: 'flex'
            }} >
                <Avatar sx={{ height: 350, width: 350, alignItems: 'center', justifyContent: 'center' }} src={Logo} />

            </Box>
            <Box sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: 2,
                background: 'linear-gradient(to right, rgba(0, 51, 102, 1) 30%, rgba(51, 204, 204, 0.8) 190%, rgba(112, 128, 144, 1) 50%)',
                // Adjust padding as needed
            }}>
                <Card sx={{ minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel sx={{ marginTop: 24, marginBottom: 4, paddingTop: 2, fontWeight: 700, fontSize: 24 }} component="legend">Login / Register</FormLabel>
                        <RadioGroup sx={{ display: 'flex', flexDirection: 'row', marginBottom: 1 }} value={formType} onChange={handleFormTypeChange}>
                            <FormControlLabel value="login" control={<Radio />} label="Login" />
                            <FormControlLabel value="signup" control={<Radio />} label="Signup" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ marginBottom: 1.5, width: 270 }}  >
                        <Select value={userType} onChange={handleUserTypeChange} displayEmpty>
                            <MenuItem value="" disabled>Select User Type</MenuItem>
                            <MenuItem value="tutor">Tutor</MenuItem>
                            <MenuItem value="learner">Learner</MenuItem>
                        </Select>
                    </FormControl>

                    {/* <Button variant="contained" sx={{ marginBottom: 1.5 }} onClick={() => { }}>Connect Metamask</Button> */}
                    <ConnectButton />
                    <Button startIcon={<img src={Metamask} alt="Metamask" style={{ width: '24px', height: '24px', borderRadius: 12 }} />} variant="contained" color="primary" sx={{ marginBottom: 4, marginTop: 1.5 }} onClick={handleSubmit}>Sign up with Metamask</Button>
                </Card>
            </Box>
        </Box>
        // </MuiThemeProvider>
    );
};

export default AuthForm;