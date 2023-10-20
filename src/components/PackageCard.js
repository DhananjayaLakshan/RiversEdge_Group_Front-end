import React, { useEffect } from 'react'
import img from '../img/6.jpg'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function PackageCard({ppackage}) {
            useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

return (

    <>



    <div className="card mt-3 col-md-10 bs hoverRoomCard" data-aos="fade-up" data-aos-anchor-placement="top-bottom" >
    
                <div className="row no-gutters " >


                    <div className="col-md-4">
                        <img src={`http://localhost:5000/uploads/${ppackage.imageUrl}`} className="card-img" alt="image" />
                        {/* <img src={img} className="card-img" alt="image" /> */}
                    </div>

                    <div className="col-md-8">                    
                        <div className="card-body">

                            <h5 className="card-title">{ppackage.name}</h5>
                            <p className="card-text">Price: Rs.{ppackage.price}.00</p>
                            <p className="card-text">{ppackage.description}</p>

                            <p className="card-text">
                                {/* <small className="text-muted">Perks: Tea/Coffee maker, AC, TV</small><br /> */}
                                <small className="text-muted">Non Refundable</small>
                            </p>

                            
                            <div className="d-flex justify-content-end"> {/* Align the button to the right */}
                                <button className="btn btnHome m-2">Book Now</button>
                            </div>
                                

                            </div>
                        </div>                        
                </div>
            </div>

            </>
            )
}
