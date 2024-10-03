import * as React from 'react';
import Grid2 from '@mui/material/Grid2';
import { Avatar, Button, IconButton, TextField, Link, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import '../App.css';

const LoginPage = ({ onLogin }) => { // Receive onLogin prop
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "19px auto" };
    const avatarStyle = { backgroundColor: '--clr-background-bright' };
    const btnstyle = { backgroundColor: '--clr-background-bright', margin: '12px 0' };
    axios.defaults.withCredentials = true;

    // State to manage form inputs
    const [form, setForm] = React.useState({
        username: '',
        password: '',
    });

    // State for errors
    const [errors, setErrors] = React.useState({
        username: '',
        password: '',
    });

    // Password visibility toggle state
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    // Validation logic
    const validate = () => {
        let tempErrors = { ...errors };

        // Validate username
        if (!form.username) {
            tempErrors.username = 'Username is required.';
        } else {
            tempErrors.username = '';
        }

        // Validate password
        if (!form.password) {
            tempErrors.password = 'Password is required.';
        } else {
            tempErrors.password = '';
        }

        setErrors(tempErrors);

        // Return true if no errors
        return Object.values(tempErrors).every(error => error === '');
    };

    const checkSession = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/session');
            if (response.data.user) {
                console.log('Active session found:', response.data.user);
            }
        } catch (error) {
            console.log('No active session');
        }
    };

    // Handle form submission
    const handleLoginClick = async () => {
        if (validate()) {
            try {
                // Make POST request to backend
                const response = await axios.post('http://localhost:5001/api/login', {
                    username: form.username,
                    password: form.password
                });

                // Handle successful login
                console.log('Login successful:', response.data);

                // Save the user to localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // Update user state in App
                onLogin(response.data.user); // Call onLogin to update user in App

                navigate('/'); // Redirect to dashboard or home page
            } catch (error) {
                // Check if the response contains a message
                if (error.response && error.response.data) {
                    console.error('Login failed:', error.response.data.message);
                    // Set error message for UI feedback
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        password: error.response.data.message,
                    }));
                } else {
                    console.error('Login error:', error);
                }
            }
        }

        checkSession();
    };

    return (
        <div className='LoginForm'>
            <Grid2 container spacing={2} justifyContent="center">
                <Grid2 style={paperStyle}>
                    <Grid2 align='center'>
                        <Avatar style={avatarStyle}>
                            <HomeIcon style={{ color: '--clr-background-mid' }} />
                        </Avatar>
                        <h2>Login</h2>
                    </Grid2>

                    {/* Username Field with Error Handling */}
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        variant="standard"
                        placeholder="Enter Your Username"
                        fullWidth
                        required
                        value={form.username}
                        onChange={handleChange}
                        error={Boolean(errors.username)}
                        helperText={errors.username}
                        sx={{
                            '& .MuiInputLabel-root': { color: 'var(--clr-text-bright)' },
                            '& .MuiInputBase-root': { color: 'var(--clr-text-bright)' },
                        }}
                    />

                    {/* Password Field with Visibility Toggle and Error Handling */}
                    <TextField
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        variant="standard"
                        placeholder="Enter Your Password"
                        fullWidth
                        required
                        value={form.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        sx={{
                            '& .MuiInputLabel-root': { color: 'var(--clr-text-bright)' },
                            '& .MuiInputBase-root': { color: 'var(--clr-text-bright)' },
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />

                    {/* Login Button */}
                    <Button
                        style={btnstyle}
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={handleLoginClick}>
                        Login
                    </Button>

                    {/* Sign Up Link */}
                    <Typography>
                        Don't have an account?
                        <div>
                            <Link component={RouterLink} to="/register" color="primary">
                                Sign Up Here
                            </Link>
                        </div>
                    </Typography>
                </Grid2>
            </Grid2>
        </div>
    );
};

export default LoginPage;