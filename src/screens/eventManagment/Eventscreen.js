import React, { useEffect, useState } from "react"
import { Tabs } from "antd"
import axios from "axios"
import Loader from "../../components/Loader"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { UilTrashAlt, UilEdit, UilFileGraph } from '@iconscout/react-unicons'
import Sidebarr from "../../Admin/Sidebarr"
import Aos from 'aos'
const { TabPane } = Tabs

export default function Eventscreen() {

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])


    return (
        <div className="mt-3 ml-3 mr-3 bs" style={{ backgroundColor: "#FCF9EF", height: '150vh' }}>

            <Sidebarr />
            <Tabs defaultActiveKey="1" style={{ display: 'flex', marginLeft: '300px' }}>

                <TabPane tab="Summary" key="1">

                </TabPane>

                <TabPane tab="Events Reservations" key="2">
                    <EventsResevations />
                </TabPane>

                <TabPane tab="Events" key="3">
                    <Events />
                </TabPane>

                <TabPane tab="Add Event" key="4">
                    <AddEvents />
                </TabPane>

            </Tabs>
        </div>
    )
}


//for get all reservations
export function EventsResevations() {


    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);
                const response = await axios.get("/api/eventres/display");

                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchEvents();
    }, []);



    return (
        <div className="row" data-aos="fade-down">
            <div className="col-md-12">
                <h1
                    style={{
                        fontSize: "30px",
                        color: "#C18239",
                        fontWeight: "bold",

                    }}
                >Event Reservations</h1>
                <br />
                {loading && <Loader />}



                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Num of Tickets</th>
                            <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {events.length &&
                            events.map((event) => {
                                return (
                                    <tr>
                                        <td>{event.userName}</td>
                                        <td>{event.userPhone}</td>
                                        <td>{event.numOfTickets}</td>
                                        <td>Rs.{event.totalAmount}.00</td>

                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

//for get all events
export function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvent() {
            try {
                setLoading(true);

                const response = await axios.get("/api/event/display");

                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchEvent();
    }, []);


    async function deleteEvent(id) {

        console.log(id);

        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                setLoading(true);

                // Send the delete request with the proper URL and data
                const response = await axios.delete(`/api/event/delete/${id}`);

                if (response.status === 200) {

                    // Show success message
                    Swal.fire("Deleted", "Deleted Successfully", "success").then(
                        // Reload the page
                        (result) => window.location.reload()
                    );

                } else {
                    // Handle unexpected response status here
                    Swal.fire("Oops!!", "Something went wrong", "error");
                }
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(error);
            Swal.fire("Oops!!", "Something went wrong", "error");
        }
    }

    // Variables to store event details
    let eventId
    let eventName
    let eventDate
    let numOfTickets
    let ticketPrice
    let moreDetails


    // Render the event data in a table
    return (
        <div className="row" data-aos="fade-down">
            <div className="col-md-12">
                <h1
                    style={{
                        fontSize: "30px",
                        color: "#C18239",
                        fontWeight: "bold",

                    }}
                >Events</h1>
                <br />

                {loading && <Loader />}

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>
                            
                            <th scope="col">Event Name</th>
                            <th scope="col">Event Date</th>
                            <th scope="col">Num of Tickets</th>
                            <th scope="col">Ticket Price</th>
                            <th scope="col">Details</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {events.length &&
                            events.map((event) => {
                                return (
                                    <tr>
                                        <td style={{display:'none'}}>{(eventId = event._id)}</td>
                                        <td scope="col">{(eventName = event.eventName)}</td>
                                        <td scope="col">{(eventDate = event.eventDate)}</td>
                                        <td scope="col">{(numOfTickets = event.numOfTickets)}</td>
                                        <td scope="col">Rs.{(ticketPrice = event.ticketPrice)}.00</td>
                                        <td scope="col" style={{ width: '20%' }}>{(moreDetails = event.moreDetails)}</td>


                                        <td>
                                            <Link to={`/updateEvents/${eventId}`}>
                                                <button
                                                    className="btn "
                                                    style={{ backgroundColor: "#9B804E" }}
                                                >
                                                    <UilEdit />
                                                </button>
                                            </Link>

                                            <button
                                                className="btn ml-2"
                                                style={{ backgroundColor: "#3B362E" }}
                                                onClick={() => deleteEvent(event._id)}
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
    );

}

//for add event
export function AddEvents() {

    // State variables to store room information
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [numOfTickets, setNumOfEvents] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [moreDetails, setMoreDetails] = useState("");



    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [maxCountError, setMaxCountError] = useState(null)


    // Function to add a new room
    async function addEvent(e) {

        e.preventDefault()

        const newEvent ={
            eventName,
            eventDate,
            numOfTickets,
            ticketPrice,
            moreDetails
        }

        try {

            setLoading(true);
            

            const result = axios.post("/api/event/addevent", newEvent);

            setLoading(false);
            Swal.fire("Added", "New Event Added Successfully", "success").then(
                (result) => (window.location.href = "/event")
            );

        } catch (error) {

            console.log(error);
            setLoading(false);
            Swal.fire("Oops!!", "Something went wrong", "error");
        }
    }

    //rent per day front end validation
    const handleRentPerDayChange = (e) => {
        const inputValue = e.target.value;

        // Use a regular expression to allow only numbers (including decimals)
        const validInput = /^[0-9]*\.?[0-9]*$/.test(inputValue);

        if (validInput) {
            setNumOfEvents(inputValue);
            setError('');
        } else {
            setError('Please enter a valid number.');
        }
    };

    const handleMaxCountChange = (e) => {

        const inputValue = e.target.value;

        // Use a regular expression to allow only numbers (including decimals)
        const validInput = /^[0-9]*\.?[0-9]*$/.test(inputValue);

        if (validInput) {
            setTicketPrice(inputValue);
            setError('');
        } else {
            setMaxCountError('Please enter a valid number.');
        }
    }

    return (
        <div
            className="col-md-8 bs center mt-2 mb-5"
            style={{ backgroundColor: "#E9E3D3" }}
            data-aos="fade-down"
        >
            <h4
                style={{
                    fontSize: "30px",
                    color: "#C18239",
                    fontWeight: "bold",
                    marginBottom: "50px",
                }}
            >
                Add Event
            </h4>
            <div class="form-row" >
                {loading && <Loader />}

                <div class="form-group col-md-6">
                    <label className="formLabel2">Event Name</label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        value={eventName}
                        onChange={(e) => {
                            setEventName(e.target.value);
                        }}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className="formLabel2" for="inputPassword4">
                        Date
                    </label>
                    <input
                        type="email"
                        class="form-control inputFeild"
                        id="inputPassword4"
                        v
                        value={eventDate}
                        onChange={(e) => {
                            setEventDate(e.target.value);
                        }}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className="formLabel2"> Num of Tickets</label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        value={numOfTickets}
                        onChange={handleRentPerDayChange}
                    />
                    {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                </div>

                <div class="form-group col-md-6">
                    <label className="formLabel2" for="inputPassword4">
                        Ticket Price
                    </label>
                    <input
                        type="email"
                        class="form-control inputFeild"
                        value={ticketPrice}
                        onChange={handleMaxCountChange}
                    />
                    {maxCountError && <div className="error-message" style={{ color: 'red' }}>{maxCountError}</div>}
                </div>

                <div class="form-group col-md-12">
                    <label className="formLabel2" for="inputAddress">
                        description
                    </label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        id="inputAddress"
                        value={moreDetails}
                        onChange={(e) => {
                            setMoreDetails(e.target.value);
                        }}

                    />
                </div>


            </div>
            <div className="d-flex justify-content-between mt-5">
                <button
                    type="submit"
                    class="btn btnColour"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                >
                    Back
                </button>
                <button type="submit" class="btn btnColour" onClick={addEvent}>
                    Add Event
                </button>
            </div>
        </div>
    )

}