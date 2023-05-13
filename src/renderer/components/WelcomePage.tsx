import React from "react"



export default function WelcomePage() {
    return (
      <div>
        <h1 className='text-center title-text'>Homecentraal</h1>
        <div className="Hello">
          <h5 className="desc-text text-center">All your smarthome devices in one place.</h5>
        </div>
        <br></br>
        <h6 className="desc-text text-center">Choose mode of connection</h6>
        <div className="container text-center">
            <div className="row">
                <div className="col align-self-start">
                    <h5 className="desc-text">Connect to Server</h5>
                </div>
                <div className="col align-self-center">
                    <h5 className="desc-text">Run in Local</h5>
                    <div data-bs-theme="dark" className=".welcome-choose card text-center mb-3" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}