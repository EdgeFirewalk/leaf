import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage />}></Route>
          <Route path="/game" element={<GamePage />}></Route>
          <Route path="/error" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
