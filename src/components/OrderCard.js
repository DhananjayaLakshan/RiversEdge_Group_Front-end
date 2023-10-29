import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Aos from 'aos';
import 'aos/dist/aos.css';
import img4 from '../img/eeee.png';
import axios from 'axios';
import Loader from "../components/Loader"
import Swal from "sweetalert2"

export default function OrderCard() {

    return (
        <div >

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: '#C27503' }}>{event.eventName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <h1>Order food</h1>
                    <div className="form-group col-md-6">
                        <label className="formLabel2">Food Item</label>
                        <input
                            type="text"
                            className="form-control inputFeild"

                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="formLabel2">Price</label>
                        <input
                            type="text"
                            className="form-control inputFeild"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="formLabel2">Quantity</label>
                        <input
                            type="text"
                            className="form-control inputFeild"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="formLabel2">Total Amount</label>
                        <input
                            type="text"
                            className="form-control inputFeild"
                        // onChange={(e) => setTotalAmount(e.target.value)}
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
    )
}
