import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { DatePicker } from 'antd'
import moment from 'moment'
import Card from '../components/Card'
import Carousel from '../components/Carosal'
import Aos from 'aos'
import 'aos/dist/aos.css'
import img1 from '../img/caro1.png'
import img2 from '../img/caro2.png'
import img3 from '../img/caro3.png'

const { RangePicker } = DatePicker;

function Homescreen() {

    // State for rooms data, loading state, and error handling
    const [rooms, setRooms]     = useState([])
    const [loading, setLoading] = useState()
    const [error, setError]     = useState()

    // State for selected date range
    const [fromDate, setFromDate]   = useState(null)
    const [toDate, setToDate]       = useState(null)

    // State for duplicate rooms data (for filtering)
    const [duplicaterooms, setduplicaterooms] = useState([])

    // Search-related states
    const [searchkey, setsearchkey]             = useState('') // State for search input
    const [type, settype]                       = useState('all') // State for room type filter
    const [matchingDetails, setMatchingDetails] = useState(true) 
    
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

//get all Rooms
    useEffect(() => {

        // Function to fetch room data from the server
        async function fetchData() {
            try {
                setLoading(true)
                const response = await axios.get('/api/rooms/getallrooms')

                // Store the data in duplicaterooms and rooms state
                setduplicaterooms(response.data)
                setRooms(response.data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.error(error)
                setLoading(false)
            }
        }

        // Fetch data when the component mounts
        fetchData()
    }, []) // Empty dependency array means this effect runs once on mount



    // Function to filter rooms by selected date range
    function filterByDate(dates) {

        if (dates) {
        setFromDate (moment(new Date(dates[0])).format('YYYY-MM-DD'))
        setToDate   (moment(new Date(dates[1])).format('YYYY-MM-DD'))

        var temprooms = []
        var availability = false

        for (const room of duplicaterooms) {

            if (room.currentbookings.length > 0) {

                for (const booking of room.currentbookings) {

                    if (
                        !moment(moment(new Date(dates[0])).format('YYYY-MM-DD')).isBetween(
                            booking.fromdate,
                            booking.todate
                        ) &&
                        !moment(moment(new Date(dates[1])).format('YYYY-MM-DD')).isBetween(
                            booking.fromdate,
                            booking.todate
                        )
                    ) {
                        if (
                            moment(new Date(dates[0])).format('YYYY-MM-DD') !== booking.fromdate &&
                            moment(new Date(dates[0])).format('YYYY-MM-DD') !== booking.todate &&
                            moment(new Date(dates[1])).format('YYYY-MM-DD') !== booking.fromdate &&
                            moment(new Date(dates[1])).format('YYYY-MM-DD') !== booking.todate
                        ) {
                            availability = true
                        }
                    }
                }
            }

            if (availability === true || room.currentbookings.length === 0) {
                temprooms.push(room)
            }
            
            setRooms(temprooms)
        }
        }
    }


    // Function to filter rooms by search keyword
    function filterBySearch() {        

        const temprooms = duplicaterooms.filter((room) =>
            room.name.toLowerCase().includes(searchkey.toLowerCase())
        )

        if(temprooms.length === 0){
            setMatchingDetails(false)// No matching details
        }else{
            setMatchingDetails(true) // Matching details found
        }

        setRooms(temprooms)
    }



    // Function to filter rooms by room type
    function filterByType(e) {

        if (e !== 'all') {
            
            const temprooms = duplicaterooms.filter(
                (room) => room.type.toLowerCase() === e.toLowerCase()
            )

            if(temprooms.length === 0){
            setMatchingDetails(false)// No matching details
            }else{
                setMatchingDetails(true) // Matching details found
            }
            
            setRooms(temprooms)
        } else {
            setRooms(duplicaterooms)
        }
    }


    return (
        <>
            <Carousel img1={img1} img2={img2} img3={img3}/>

            <div
                data-aos="fade-up" data-aos-anchor-placement="center-bottom"
                className="row col-md-10 bs filterBar"
                style={{ margin: '0 auto', float: 'none' }}
            >

                <h4 style={{textAlign:'center'}}>CHECK AVAILABILITY</h4>

                <div className="col-md-3 center">
                    <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
                </div>                

                <div className="col-md-3 center"> 
                    <input                        
                        type="text"
                        className="form-control"
                        placeholder="search rooms"
                        value={searchkey}
                        onChange={(e) => {
                            setsearchkey(e.target.value)
                        }}
                        onKeyUp={filterBySearch}
                    />
                </div>

                

                <div className="con-md-3 center" value={type} onChange={(e) => filterByType(e.target.value)}>
                    <select className="form-control">
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>

            <div className="row justify-content-center mt-5 ">
                {loading ? (
                    <h1>
                        <Loader />
                    </h1>                    
                ) : (
                    rooms.map((room) => {
                        return <Card key={room._id} room={room} fromdate={fromDate} todate={toDate} />
                    })
                )}

                {//if there is no matching details display message
                !matchingDetails && (
                <div className="col-md-12" style={{textAlign:"center"}}>
                    <h2>No matching details found</h2>
                </div>

            )}
            </div>
        </>
    )
}

export default Homescreen
