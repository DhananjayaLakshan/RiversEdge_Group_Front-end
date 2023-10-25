import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Aos from 'aos'
import 'aos/dist/aos.css'



export default function Paymentscreen() {

    //fetching url parameters
    const { roomid, fromdate, todate, totalamount, userID, userName, totaldays, email } = useParams()

    const [loading, setLoading] = useState()
    const [error, setError]     = useState()
    const [room, setroom]       = useState({})

    const [phonenumber, setphonenumber] = useState("required")
    const [address, setAddress] = useState("required")
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])


    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await axios.post('/api/rooms/getroombyid', { roomid: roomid })
                setroom(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
        }
        fetchData();
    }, [])

    async function bookRoom() {
        /** set booking collection details to sent to dataBase */

        const bookingDetails = {
            room,
            userid: userID,
            userName,
            email,
            address,
            phonenumber,
            fromdate,
            todate,
            totalamount,
            totaldays,


        }

        try {
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            Swal.fire('Checked-In', 'Your booking has been successful', 'success').then(result => {
                window.location.href = '/'
            })
        } catch (error) {
            console.log(error)
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }

    }


    return (
        <div data-aos="fade-down" className='col-md-8 bs center formColour mt-5 mb-5'>

            <h4 style={{ fontSize: '50px', color: 'black', fontWeight: 'bold', marginBottom: '50px', textAlign: 'center' }}>Hotel Booking</h4>

            <div class="form-row">


                <div class="form-group col-md-6">
                    <label className='formLabel' >Name</label>
                    <input type="text" class="form-control" value={userName} disabled />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel' for="inputPassword4">Email</label>
                    <input type="email" class="form-control" id="inputPassword4" value={email} disabled />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel' for="inputPassword4">Phone Number <span style={{color:'red'}}>*</span></label>
                    <input
                        type="text"
                        class={`form-control ${!isValidPhoneNumber ? 'is-invalid' : ''}`}
                        value={phonenumber}
                        onChange={(e) => {
                            const phoneNumber = e.target.value;
                            setphonenumber(phoneNumber);

                            // Validation function for phone number (you can customize the regex)
                            const phoneNumberRegex = /^\d{10}$/;

                            // Check if the entered phone number matches the regex pattern
                            const isValid = phoneNumberRegex.test(phoneNumber);
                            setIsValidPhoneNumber(isValid);
                        }}
                        required
                    />
                    {!isValidPhoneNumber && (
                        <div className="invalid-feedback">Please enter a valid 10-digit phone number.</div>
                    )}

                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel' for="inputPassword4">Total Days</label>
                    <input type="email" class="form-control" id="inputPassword4" value={totaldays} disabled />
                </div>
            </div>

            <div class="form-group">
                <label className='formLabel' for="inputAddress">Address<span style={{color:'red'}}> *</span></label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
                    value={address} onChange={(e) => { setAddress(e.target.value) }} required
                />
            </div>

            <div class="form-row">


                <div class="form-group col-md-6">
                    <label className='formLabel' >Arrival Date</label>
                    <input type="text" class="form-control" value={fromdate} disabled />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel' for="inputPassword4">Departure Date</label>
                    <input type="email" class="form-control" id="inputPassword4" value={todate} disabled />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel' >Bill Amount</label>
                    <input type="text" class="form-control" value={'Rs.' + totalamount} disabled />
                </div>
            </div>

            {(phonenumber && address == "required") ? (<p style={{ color: 'red' }}>Fill the required fields</p>) :

                <div style={{ marginLeft: '850px' }}>
                    <Link to={`/payment/${roomid}/${fromdate}/${todate}/${totalamount}/${userID}/${userName}/${totaldays}/${email}`}>
                        <button type="submit" class="btn  btnColour mt-5 float-sm-end" onClick={bookRoom}>CheckIn</button>
                    </Link>
                </div>

            }
        </div>
    )
}
