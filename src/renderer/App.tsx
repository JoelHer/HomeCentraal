import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import WelcomePage from './components/WelcomePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}
