import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { TabPane } from 'react-bootstrap'
import axios from 'axios'
import Loader from "../components/Loader";
import Swal from 'sweetalert2'
import { Tag } from 'antd';
import Aos from 'aos'
import 'aos/dist/aos.css'

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
                    <h1>My Profile</h1>
                    <br />

                    <h1><b>Name : </b> {user.name} </h1>
                    <h1><b>Email : </b> {user.email} </h1>
                    <h1><b>isAdmin : </b> {user.isAdmin ? 'YES' : 'NO'} </h1>
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

    async function cancelBooking(bookingid, roomid){
        
        try {
            setLoading(true)
            const result = await (await axios.post("/api/bookings/cancelbooking", {bookingid, roomid})).data
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

                    {loading && <Loader/>}
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
                                <button className='btn btnColour' onClick={() => {cancelBooking(booking._id , booking.roomid)}}>Cancel Booking</button>
                            </div>
                            )}
                        </div>

                    }))}

                </div>
            </div>
        </div>
    )
}
