import React from 'react'
import { Link } from 'react-router-dom'

export default function Landingscreen() {
    return (
        <div className='row landing justify-content-center'>

            <div className="col-md-9 my-auto text-center" style={{borderRight:'8px solid white'}}>

                <h3 style={{color:'white', fontSize:'130px'}}>River's Edge</h3>
                <h1 style={{color:'white'}}>Unforgettable experience to Guests</h1>

                <Link to='/home'>                
                <button className='btn landingbtn'>Get Started</button>
                </Link>
            </div>
        </div>
    )
}
