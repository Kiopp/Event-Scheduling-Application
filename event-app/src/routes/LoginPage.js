import * as React from 'react';
import Grid2 from '@mui/material/Grid2';
import { Avatar, Button, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import '../App.css';

const LoginPage=()=>{

    const paperStyle={padding :20,height:'70vh',width:280,margin:"19px auto"}
    const avatarStyle={backgroundColor:'--clr-background-bright'}
    const btnstyle={backgroundColor:'--clr-background-bright',margin:'12px 0'}
    const logoStyle={backgroundColor:'--clr-background-bright', margin:'10px 0', width: 70, height: 70}
    const adStyle = { backgroundColor: '#f0f0f0', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' };

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSignUpClick = () => {
        navigate('/register'); // Navigate to the register page

    }

    return(
        <Grid2 container spacing={2} justifyContent="center">
            {/* Ad box on the left */}
        
        <Grid2 style={paperStyle}>
            
            <Grid2 align='center'>
                <Avatar style={avatarStyle}>
                    <HomeIcon style={{ color: '--clr-background-mid'}}/>
                </Avatar>
                <h2>Login</h2>
            </Grid2>
            <TextField 
                id="standard-basic" 
                label="Username" 
                variant="standard" 
                placeholder='Enter Your Username' 
                fullWidth required
                sx={{
                    '& .MuiInputLabel-root': { color: 'var(--clr-text-bright)' }, // Label color
                    '& .MuiInputBase-root': { color: 'var(--clr-text-bright)' },   // Input text color
                }}/>

            <TextField 
                id="standard-basic" 
                label="Password" 
                variant="standard" 
                placeholder='Enter Your Password' 
                type='password' 
                fullWidth required
                sx={{
                    '& .MuiInputLabel-root': { color: 'var(--clr-text-bright)' }, // Label color
                    '& .MuiInputBase-root': { color: 'var(--clr-text-bright)' },   // Input text color
                }}/>

            <Button 
                style={btnstyle} 
                type='submit' 
                color='primary' 
                variant="contained" 
                fullWidth>Login
            </Button>

            <Typography className="--clr-background-dark">
                Don't have an account?
                <Button color="primary" onClick={handleSignUpClick}>
                    Sign Up Here
                </Button>
            </Typography>
        </Grid2>
        {/* Ad box on the right */}
        </Grid2>
    )
}

export default LoginPage