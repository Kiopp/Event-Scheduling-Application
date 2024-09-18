import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import PublicEvents from './components/PublicEvents';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <div className='header-title'>
          Event Scheduler PRO
        </div>
        <nav className='nav'>
          <Link to="/">
            <button type='button'>Home</button>
          </Link>
          <Link to="/events">
            <button type='button'>Events</button>
          </Link>
        </nav>
        <div className='login'>
          <button type='button'>Login</button>
          <button type='button'>Register</button>
        </div>
      </header>
      <div className="Content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<PublicEvents />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
