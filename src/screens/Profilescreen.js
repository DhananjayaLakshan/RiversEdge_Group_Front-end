import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { TabPane } from 'react-bootstrap'
import axios from 'axios'
import Loader from "../components/Loader";
import Swal from 'sweetalert2'
import { Tag } from 'antd';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Link } from "react-router-dom"
import { UilTrashAlt, UilEdit, UilFileGraph } from '@iconscout/react-unicons'

export default function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    //check user login or not
    useEffect(() => {

        if (!user) {
            window.location.href = '/login'
        }

    })

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key="1">
                    <Userprofile />
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>

        </div>
    )
}




function MyBookings() {

    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const response = await axios.post('api/bookings/getbookingsbyuserid', { userid: user._id });
                setBookings(response.data);
                setLoading(false)

            } catch (error) {
                console.error(error);
                setLoading(false)
                setError(error)

            }
        };

        fetchBookings();
    }, [user._id]);

    async function cancelBooking(bookingid, roomid) {

        try {
            setLoading(true)
            const result = await (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result);
            setLoading(false)
            Swal.fire('Noted', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })

        } catch (error) {
            setLoading(false)
            console.log(error);
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }
    }



    return (

        <div>
            <div className="row">
                <div className="col-md-6">

                    {loading && <Loader />}
                    {bookings && (bookings.map(booking => {

                        return <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" className='bs mt-5 mb-5 ml-5 profileBookings'>


                            <p><b>{booking.room} </b></p>
                            <p><b>BookingID : </b> {booking._id} </p>
                            <p><b>CheckIn : </b> {booking.fromdate} </p>
                            <p><b>CheckOut : </b> {booking.todate} </p>
                            <p><b>Total Bill : </b> Rs. {booking.totalamount}.00 </p>
                            <p>
                                <b>Status : </b>
                                {booking.status == 'cancelled' ? (<Tag color="orange">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                            </p>


                            {booking.status !== 'cancelled' && (
                                <div className='text-right'>
                                    <button className='btn btnColour' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>Cancel Booking</button>
                                </div>
                            )}
                        </div>

                    }))}

                </div>
            </div>
        </div>
    )
}


function Userprofile() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    //check user login or not
    useEffect(() => {

        if (!user) {
            window.location.href = '/login'
        }

    })

    let [firstName, setfirstName] = useState(user.firstName)
    const [description, setDescription] = useState("")


    async function addFeedback(e) {
        e.preventDefault

        const newFeedback = {
            firstName,
            description
        }

        try {
            const result = axios.post("/api/feedback/addfeedback", newFeedback)
            Swal.fire('Noted', 'Your feedback has been added', 'success').then(result => {
                window.location.reload()
            })
        } catch (err) {
            console.log(err)
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }
    }

    const [feedback, setFeedback] = useState([]);

    console.log(feedback);


    // useEffect to fetch users data when the component mounts
    useEffect(() => {
        async function fetchFeedback() {
            try {

                // Fetch users data from the server
                const response = await axios.post("/api/feedback/getFeedbackByName", { firstName: firstName });

                // Set the users data in the state
                setFeedback(response.data);


            } catch (error) {
                console.error(error);
            }
        }

        fetchFeedback(); // Call the async function here
    }, []);


    //add feed back


    return (
        <div class="jumbotron-fluid center bs" style={{ display: 'flex', alignItems: 'center', width: '80%', }}>

            <div class="container">

                <h1 class="display-2">Profile</h1>
                <br />

                <table>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td><h1 class="display-6"> <b>First Name </b>  </h1></td>
                        <td><h1>:{user.firstName}</h1></td>
                    </tr>
                    <tr>
                        <td><h1 class="display-6"> <b>Last Name </b>  </h1></td>
                        <td><h1>:{user.lastName}</h1></td>
                    </tr>
                    <tr>
                        <td><h1 class="display-6"> <b>Phone Number</b>  </h1></td>
                        <td><h1>:{user.phoneNumber}</h1></td>
                    </tr>
                    <tr>
                        <td><h1 class="display-6"> <b>Email</b>  </h1></td>
                        <td><h1>:{user.email}</h1></td>
                    </tr>
                    <br />
                    <tr>
                        <td>
                            <Link to={`/userUpdate/${user._id}`}>
                                <button class="btn btnColour">Update Profile</button>
                            </Link>
                        </td>
                        <td>



                        </td>
                    </tr>
                </table>


            </div>

            <div className="container">
                <div class="mb-3">
                    <h1 class="display-6" >FeedBack</h1>
                    <textarea
                        class="form-control"
                        id="validationTextarea"
                        required

                        value={description}

                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}

                    ></textarea>
                    <button class="btn btnColour mt-3" onClick={addFeedback}>FeedBack</button>
                </div>

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>


                            <th scope="col">FeedBack</th>
                            <th scope="col" style={{ width: '30%' }}>Action</th>

                        </tr>
                    </thead>

                    <tbody style={{ backgroundColor: "#E9E3D3" }}>

                        {feedback.length &&
                            feedback.map((feed) => {
                                return (
                                    <tr>

                                        <td>{feed.description}</td>
                                        <td>
                                            <button

                                                className="btn"
                                                style={{ backgroundColor: "#9B804E"}}
                                            >
                                                <UilEdit />
                                            </button>

                                            <button
                                                className="btn ml-2"
                                                style={{ backgroundColor: "#3B362E"}}

                                            >
                                                <UilTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}

                    </tbody>
                </table>

            </div>
        </div>
    )
}