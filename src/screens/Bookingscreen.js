import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Aos from 'aos'
import 'aos/dist/aos.css'

function Bookingscreen() {

    //get URL Parameters
    const { roomid, fromdate, todate }  = useParams();

    // Define state variables
    const [loading, setLoading]    = useState()
    const [error, setError]        = useState()
    const [room, setroom]          = useState({})


    // Parse user information from localStorage
    const userName  = JSON.parse(localStorage.getItem('currentUser')).name
    const userID    = JSON.parse(localStorage.getItem('currentUser'))._id
    const email     = JSON.parse(localStorage.getItem('currentUser')).email

    // Calculate the duration of the stay (total days)
    const checkIn   = moment(fromdate)
    const checkOut  = moment(todate)
    const totaldays = moment.duration(checkOut.diff(checkIn)).asDays() + 1

    // Calculate the total amount to be paid
    const [totalamount, settotalamount] = useState(0)

    // Initialize AOS library with a duration of 1000 milliseconds
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    // Fetch room details and calculate the total amount when the component mounts
    useEffect(() => {

        async function fetchData() {
            try {
                setLoading(true)

                const response = await axios.post('/api/rooms/getroombyid', { roomid: roomid })
                setroom(response.data)

                settotalamount(response.data.rentperday * totaldays)
                setLoading(false)

            } catch (error) {

                setLoading(false)
                setError(true)
            }
        }

        fetchData();
        
    }, [roomid, fromdate, todate])

    // If the user is not logged in, redirect to the login page
    if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login'
    }

    return (
        <>
            {loading ? (<h1><Loader /></h1>)
                : error ? (<Error />)
                    : (<div >
                        <div data-aos="zoom-out-up" className="row mt-5 ml-5 mr-5 mb-5 bs bookingCard">

                            <div className="col-md-6">
                                <h1>{room.name}</h1>
                                <img src={`http://localhost:5000/uploads/${room.imageUrl}`} alt="" className="card-img bigimg" />
                            </div>

                            <div className="col-md-6">

                                <div>
                                    <h1> <b>Booking Details</b> </h1>
                                    <hr />
                                    
                                        <p><b>Name: </b> {userName}</p>
                                        <p><b>CheckIn Date :</b> {fromdate}</p>
                                        <p><b>CheckOut Date:</b> {todate}  </p>
                                        <p><b>Max Board: </b>{room.maxcount}</p>
                                    
                                </div><br />

                                <div>
                                    
                                        <b><h1>Amount</h1></b>
                                        <hr />
                                        <p><b>Total days : </b>{totaldays}</p>
                                        <p><b>rent per day : </b>Rs.{room.rentperday}.00</p>
                                        <p><b>Total amount : </b>Rs.{totalamount.toFixed(2)} </p>
                                    
                                </div>


                                <div style={{ float: 'right' }}>
                                <Link to={`/payment/${room._id}/${fromdate}/${todate}/${totalamount.toFixed(2)}/${userID}/${userName}/${totaldays}/${email}`}>
                                    <button className="btn">Pay Now</button>
                                </Link>
                                </div>

                            </div>
                        </div>

                    </div>)}
        </>
    );
}

export default Bookingscreen;
