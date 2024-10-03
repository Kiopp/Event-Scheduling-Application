import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import HomePage from './routes/HomePage';
import PublicEvents from './routes/PublicEvents';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import EventPage from './routes/EventPage';
import CreateEventPage from './routes/CreateEventPage';
import axios from 'axios';
import FriendPage from './routes/FriendPage';
import stringToColor from './components/StringToColor.js';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

function App() {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(null); // Store user data
  const [anchorEl, setAnchorEl] = useState(null); // For the dropdown menu

  // Check local storage for user information on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle avatar click to open menu
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
    checkSession();
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    handleMenuClose();
    checkSession();
    window.location.href = '/login'; // Redirect to login page
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

  return (
    <ThemeProvider theme={darkTheme}> {/* Sets the theme of all MUI components to dark*/}
      <BrowserRouter>
        <div className="App">
          <header className="Header">
            <div className='header-title'>
              <Link to='/' className='btn'>
                Event Scheduler PRO
              </Link>
            </div>
            <nav className='nav'>
              <Link to="/events" className='btn'>
                <p>Events</p>
              </Link>
              {user ? (
                <>
                {/* The user is logged in */}
                  <Link to="/events/create-new-event" className='btn'>
                    <p>Create Event</p>
                  </Link>
                  <Link to="/friends" className='btn'>
                    <p>Friends</p>
                  </Link>
                </>
              ) : (
                <>
                  {/* The user is not logged in */}
                </>
              )}
            </nav>
            <div className='Login'>
              {/* If the user is logged in, show the avatar instead of login/register */}
              {user ? (
                <>
                  <IconButton onClick={handleAvatarClick}>
                    <Avatar sx={{ bgcolor: stringToColor(user.username)}} >{user.username[0].toUpperCase()}</Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Link to="/login" className='btn'>
                    <p>Login</p>
                  </Link>
                  <Link to="/register" className='btn'>
                    <p>Register</p>
                  </Link>
                </>
              )}
            </div>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<PublicEvents />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} /> {/* Pass setUser as onLogin */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/event/:event_id" element={<EventPage />} />
            <Route path="/events/create-new-event" element={<CreateEventPage />} />
            <Route path="/friends" element={<FriendPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;