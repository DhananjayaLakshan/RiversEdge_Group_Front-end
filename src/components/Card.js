import React, { useState, useEffect } from 'react'
import { Modal, Button, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import Aos from 'aos'
import 'aos/dist/aos.css'
import img          from '../img/4.jpg'
import acIcon       from '../img/icon/acicon.png'
import foodIcon     from '../img/icon/foodicon.png'
import fridgeIcon   from '../img/icon/fridgeicon.png'
import teaicon      from '../img/icon/teaicon.png'
import teleicon     from '../img/icon/teleicon.png'
import tubicon      from '../img/icon/tubicon.png'
import tvicon       from '../img/icon/tvicon.png'
import wifiicon     from '../img/icon/wifiicon.png'

export default function Card({ room , fromdate, todate}) {

    const [show, setShow] = useState(false);

    const handleClose   = () => setShow(false);
    const handleShow    = () => setShow(true);

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        

        <div className="card mt-3 col-md-10 bs hoverRoomCard" data-aos="fade-up" data-aos-anchor-placement="top-bottom">

                <div className="row no-gutters">

                    <div className="col-md-4">
                        <img src={`http://localhost:5000/uploads/${room.imageUrl}`} className="card-img" alt="image" />
                        {/* <img src={img} className="card-img" alt="image" /> */}
                    </div>

                    <div className="col-md-8">                    
                        <div className="card-body">

                            <h5 className="card-title">{room.name}</h5>
                            <p className="card-text">Room type: {room.type}</p>
                            <p className="card-text">Max board: {room.maxcount}</p>
                            <p className="card-text">Price for one night: Rs.{room.rentperday}.00</p>

                            <p className="card-text">
                                <small className="text-muted">Perks: Tea/Coffee maker, AC, TV</small><br />
                                <small className="text-muted">Non Refundable</small>
                            </p>

                            <div style={{ float: "right" }} className="mb-3">
                                {(fromdate && todate) && (
                                    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                                        <button className="btn btnHome m-2">Book Now</button>
                                    </Link>
                                )}

                                <button className="btn btnHome m-2" onClick={handleShow}>View details</button>

                            </div>
                        </div>                        
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} size="lg" > 

                <Modal.Header closeButton>
                    <Modal.Title style={{color:'#C27503'}}>{room.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Carousel prevLabel='' nextLabel=''>
                            {/* {room.imageurls.map(url => { */}
                                {/* return (                                     */}
                                    <Carousel.Item>
                                        <img src={`http://localhost:5000/uploads/${room.imageUrl}`} alt="" className="d-block w-100 bigimg" />
                                        {/* <img src={img} alt="" className="d-block w-100 bigimg" /> */}
                                    </Carousel.Item>                                    
                                {/* ) */}

                            {/* })} */}

                    </Carousel>
                    <br />
                    <p>{room.description}</p>
                    
                        <h1>Facilities</h1>
                    <div className='row col-md-12 ml-4 '>
                        <div className='col-md'><img src={tubicon}    style={{width:'70px', alignItems:'center'}}/> <p>BATHTUB</p> </div>
                        <div className='col-md'><img src={teleicon}   style={{width:'70px', alignItems:'center'}}/> <p>IDD FACILITY</p> </div>
                        <div className='col-md'><img src={foodIcon}   style={{width:'70px', alignItems:'center'}}/> <p>IN-ROOM DINING</p> </div>
                        <div className='col-md'><img src={teaicon}    style={{width:'70px', alignItems:'center'}}/> <p>COFFEE MAKER</p> </div>
                        
                    </div>
                    <div className='row col-md-12 ml-4'>
                        <div className='col-md'><img src={tvicon}       style={{width:'70px', alignItems:'center'}}/> <p>SATELLITE TV</p> </div>
                        <div className='col-md'><img src={fridgeIcon}   style={{width:'70px', alignItems:'center'}}/> <p>MINI FRIDGE</p> </div>
                        <div className='col-md'><img src={acIcon}       style={{width:'70px', alignItems:'center'}}/> <p>AIR CONDITIONER</p></div>
                        <div className='col-md'><img src={wifiicon}     style={{width:'70px', alignItems:'center'}}/> <p>IN-ROOM WI-FI</p></div>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button className='btn btnHome' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

                </Modal>    
        </div>

        
    )
}
