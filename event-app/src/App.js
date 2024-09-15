import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PublicEvents from './components/PublicEvents';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          The start of a great event scheduler!
        </p>
      </header>
      <div className="Content">
        <BrowserRouter>
          <Routes>
            <Route path="/index" element={<HomePage />}>
            </Route>
            <Route path="/events" element={<PublicEvents />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
