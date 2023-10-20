import React, { useEffect } from "react";
import img from "../img/service2.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

export default function ServiceCard({service}) {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <>
            <div
                className="card mt-3 col-md-10 bs hoverRoomCard"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="row no-gutters ">
                    <div className="col-md-4">
                        {/* <img src={room.imageurls[0] || ""} className="card-img" alt="image" /> */}
                        <img src={`http://localhost:5000/uploads/${service.imageUrl}`} className="card-img" alt="image" />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <b>                            
                                <h4 className="card-text">{service.title}</h4>
                            </b>
                            <br />
                            <p className="card-text">{service.description}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
