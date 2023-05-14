import React from "react"



export default function WelcomePage() {
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
                    <button className="btn btn-outline-success">Connect to server</button>
                </div>
                <div className="col align-self-center">
                    <h5 className="desc-text">Run in Local</h5>
                    <p>Let Homecentraal run only on your computer.</p>
                    <button className="btn btn-outline-primary">Run locally</button>
                </div>
            </div>
        </div>
      </div>
    )
}