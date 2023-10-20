import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Aos from 'aos'
import 'aos/dist/aos.css'

function Room({ room , fromdate, todate}) {

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])
    

    return (
        <div className="row bs" data-aos="fade-up" data-aos-anchor-placement="top-bottom">

            <div className="col-md-4">
                <img src={room.imageurls[0] || ""} alt="" className="smallimg" />
            </div>

            <div className="col-md-7 text-left">
                <h1>{room.name}</h1>
                <b>
            
                    <p>Max Count : {room.maxcount}</p>
                    <p>Phone Number: {room.phonenumber}</p>
                    <p>Type: {room.type}</p>
                </b>

                <div style={{ float: "right" }}>

                {(fromdate && todate) && (
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                        <button className="btn m-2">Book Now</button>
                    </Link>
                )}
                </div>
            </div>
        </div>
    );
}

export default Room;
