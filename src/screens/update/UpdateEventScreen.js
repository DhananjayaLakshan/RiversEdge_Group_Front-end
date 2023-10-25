import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function UpdateEventScreen() {

    const {eventId} = useParams()


    let back = useNavigate()
    
    const handleBackClick = () => {
        // Navigate to a specific route when the "Back" button is clicked
        back('/event');
    };

    const [event, setEvent] = useState({
        id: eventId,
        eventName:'',
        eventDate: '',
        numOfTickets: '',
        ticketPrice:'',
        moreDetails: ''

    })



    useEffect(() => {

        async function fetchData() {
            try {                
                
                axios.post('/api/event/geteventbyid', { eventid: eventId })
                .then(res => setEvent({
                    ...event, 
                    eventName: res.data.eventName,
                    eventDate: res.data.eventDate,
                    numOfTickets: res.data.numOfTickets,
                    ticketPrice: res.data.ticketPrice,
                    moreDetails: res.data.moreDetails,
                    
                    }))

            } catch (error) {                
                console.log(error);
            }
        }
        fetchData();    
    }, [])
    
    const navigate = useNavigate()   

    const handleSubmit = (e) => {
        e.preventDefault()

        try {

            console.log(event)
            
        axios.put(`/api/event/updateEvents/${ eventId }`, event)

        Swal.fire('Updated', 'Event details has been successful', 'success').then(result => {
                    navigate('/event')})

        } catch (error) {

            console.error('Failed to update Event:', error)
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }

        
    }


    return (

        <div className='col-md-8 bs center mt-5 mb-5' style={{ backgroundColor: '#E9E3D3' }}>
            
            <h4 style={{ fontSize: '30px', color: '#C18239', fontWeight: 'bold', marginBottom: '50px' }}>Update Event</h4>


            <div class="form-row">


                <div class="form-group col-md-6">
                    <label className='formLabel2' >Event Name</label>
                    <input type="text" class="form-control inputFeild" 
                    value={event.eventName} onChange={e => setEvent({...event, eventName:e.target.value})}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel2' for="inputPassword4">Date</label>
                    <input type="email" class="form-control inputFeild" id="inputPassword4" v
                    value={event.eventDate} onChange={e => setEvent({...event, eventDate:e.target.value})}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel2' >Num of Tickets</label>
                    <input type="text" class="form-control inputFeild" 
                    value={event.numOfTickets} onChange={e => setEvent({...event, numOfTickets:e.target.value})}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel2' for="inputPassword4">Ticket Price</label>
                    <input type="email" class="form-control inputFeild" id="inputPassword4" 
                    value={event.ticketPrice} onChange={e => setEvent({...event, ticketPrice:e.target.value})}
                    />
                </div>
            </div>

            <div class="form-group">
                <label className='formLabel2' for="inputAddress">Details</label>
                <input type="text" class="form-control inputFeild" id="inputAddress"  
                value={event.moreDetails} onChange={e => setEvent({...event, moreDetails:e.target.value})}
                />
            </div>

            <div className="d-flex justify-content-between mt-5">
                <button
                    type="button"
                    className="btn btnColour"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                    onClick={handleBackClick}
                >
                    Back
                </button>
                <button type="submit" class="btn btnColour" onClick={handleSubmit}>Update</button>
            </div>

        </div>
    )
}
