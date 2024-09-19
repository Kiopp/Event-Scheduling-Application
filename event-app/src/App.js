import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import HomePage from './routes/HomePage';
import PublicEvents from './routes/PublicEvents';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';

function App() {
  return (
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
      <div className="Content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<PublicEvents />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
