import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';


var foundDevices = "false";
function Home() {
  const [isShown, setIsShown] = useState(true);
  setTimeout(() => {
    foundDevices = "true";
  }, 3000);
  if (isShown) {
    return (
      <div>
        <h1 className='text-center title-text'>Installation</h1>
        <div className="Hello">
          <h5 className="desc-text text-center">We are looking for smarthome devices on your local network, please stand by...</h5>
          {foundDevices}
        </div>
      </div>
    ) 
  }
  return ( null )
}

function WelcomePage() {
  const [isShown, setIsShown] = useState(true);
  function onSelectEnv() {
    setIsShown(false);
  }

  if (isShown) {
    return (
      <div>
        <h1 className='text-center title-text'>Homecentraal</h1>
        <div className="Hello">
          <h5 className="desc-text text-center">All your smarthome devices in one place.</h5>
        </div>
        <h6 className="desc-text text-center">To continue, please choose a mode of connection</h6>
        <br></br>
        <div className="container text-center">
            <div className="row">
                <div className="col align-self-start">
                    <h5 className="desc-text">Connect to Server</h5>
                    <p>Let Homecentraal connect to a server on your network</p>
                    <button className="btn btn-outline-success" disabled>Connect to server</button>
                </div>
                <div className="col align-self-center">
                    <h5 className="desc-text">Run in Local</h5>
                    <p>Let Homecentraal run only on your computer.</p>
                    <button className="btn btn-outline-primary" onClick={onSelectEnv}>Run locally</button>
                </div>
            </div>
        </div>
      </div>
    ) 
  }
  return (
    <Home />
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <WelcomePage />
        }/>
      </Routes>
    </Router>
  );
}
