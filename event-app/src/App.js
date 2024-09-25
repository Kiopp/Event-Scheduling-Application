import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import HomePage from './routes/HomePage';
import PublicEvents from './routes/PublicEvents';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import CreateEventPage from './routes/CreateEventPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}> {/* Sets the theme of all MUI components to dark*/}
    <BrowserRouter>
    <div className="App">
      <header className="Header">
        <div className='header-title'>
          Event Scheduler PRO
        </div>
        <nav className='nav'>
          <Link to="/" className='btn'>
            <p>Home</p>
          </Link>
          <Link to="/events" className='btn'>
            <p>Events</p>
          </Link>
        </nav>
        {/* Login buttons should not show up when already logged in. Instead show a round button that shows the user a drop down menu. */}
        <div className='Login'>
          <Link to="/login" className='btn'>
            <p>Login</p>
          </Link>
          <Link to="/register" className='btn'>
            <p>Register</p>
          </Link>
        </div>
      </header>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<PublicEvents />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events/create-new-event" element={<CreateEventPage />} />
        </Routes>
    </div>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
