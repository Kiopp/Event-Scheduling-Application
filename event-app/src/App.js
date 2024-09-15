import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

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
            <Route path="/" element={<HomePage />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
