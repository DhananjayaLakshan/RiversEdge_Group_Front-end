import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../../components/Loader'
import Aos from 'aos'
import 'aos/dist/aos.css'
import img1 from '../../img/pc01.png'
import img2 from '../../img/pc02.png'
import img3 from '../../img/pc03.png'
import img4 from '../../img/eeee.png'
import EventCard from '../../components/EventCard'
import EventCarosal from '../../components/EventCarosal'

export default function EventHomescreen() {


    // State for rooms data, loading state, and error handling
    const [events, setEvents]     = useState([])
    const [loading, setLoading] = useState()
    const [error, setError]     = useState()

    
    
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

//get all Rooms
    useEffect(() => {

        
        async function fetchData() {
            try {
                setLoading(true)
                const response = await axios.get('/api/event/display')
                
                setEvents(response.data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.error(error)
                setLoading(false)
            }
        }

        
        fetchData()
    }, []) 

    return (
        <>
            <EventCarosal img1={img1} img2={img2} img3={img3}/>

            <div className="row justify-content-center mt-5 ">
                {loading ? (
                    <h1>
                        <Loader />
                    </h1>                    
                ) : (
                    events.map((event) => {
                        return <EventCard   key={event._id} event={event} />
                    })
                )}

                
            </div>
        </>
    )
}

