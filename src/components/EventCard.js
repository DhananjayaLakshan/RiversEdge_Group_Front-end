import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Aos from 'aos';
import 'aos/dist/aos.css';
import img4 from '../img/eeee.png';
import axios from 'axios';
import Loader from "../components/Loader"
import Swal from "sweetalert2"

export default function EventCard({ event }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const user = JSON.parse(localStorage.getItem("currentUser"))

    const userName = user.firstName;
    const [userPhone, setUserPhone] = useState('');
    const [numOfTickets, setNumOfTickets] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
        
    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [maxCountError, setMaxCountError] = useState(null)

    

    async function addReserve(e) {
        e.preventDefault();

        const newReserve = {
            userName,
            userPhone,
            numOfTickets,
            totalAmount,
        };

        try {
            setLoading(true);

            const result = await axios.post('/api/eventres/addevent', newReserve);
            // Handle the result as needed
            Swal.fire("Added", "New Reservstion Added Successfully", "success").then(
                (result) => (window.location.href = "/eventHome")
            );
            

        } catch (err) {
            console.log(err);
            // Handle errors here
            setLoading(false);
            Swal.fire("Oops!!", "Something went wrong", "error");
        }
    }

    return (
        <div className="card mt-3 col-md-10 bs hoverRoomCard" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={img4} className="card-img" alt="image" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{event.eventName}</h5>
                        <p className="card-text">Date: {event.eventDate}</p>
                        <p className="card-text">Number of Tickets: {event.numOfTickets}</p>
                        <p className="card-text">Price for one Ticket: Rs.{event.ticketPrice}.00</p>
                        <p className="card-text">{event.moreDetails}</p>
                        <div style={{ float: 'right' }} className="mb-3">
                            <button className="btn btnHome m-2" onClick={handleShow}>View details</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: '#C27503' }}>{event.eventName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{event.moreDetails}</p>
                    <h1>Reserve Ticket</h1>
                    <div className="form-group col-md-6">
                        <label className="formLabel2">User Name</label>
                        <input
                            type="text"
                            className="form-control inputFeild"
                            value={user.firstName}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="formLabel2">User Phone</label>
                        <input
                            type="text"
                            className="form-control inputFeild"
                            onChange={(e) => setUserPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="formLabel2">Number of Tickets</label>
                        <input
                            type="text"
                            className="form-control inputFeild"
                            onChange={(e) => setNumOfTickets(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="formLabel2">Total Amount</label>
                        <input
                            type="text"
                            className="form-control inputFeild"
                            onChange={(e) => setTotalAmount(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btnHome" variant="secondary" onClick={addReserve}>
                        Reserve
                    </Button>
                    <Button className="btn btnHome" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
