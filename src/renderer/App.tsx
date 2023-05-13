import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img className='home-icon-grad' width="200" alt="icon" src={icon} />
      </div>
      <h1 className='text-center title-text'>Homecentraal</h1>
      <div className="Hello">
        <h4 className="desc-text">All your smarthome devices in one place.</h4>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
