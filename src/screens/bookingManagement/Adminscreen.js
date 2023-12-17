import React, { useEffect, useState } from "react"
import { Tabs } from "antd"
import axios from "axios"
import Loader from "../../components/Loader"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import AddPackage from "../add/AddPackage"
import AddService from "../add/AddService"
import { UilTrashAlt, UilEdit, UilFileGraph } from '@iconscout/react-unicons'
import ExcelJS from 'exceljs'
import saveAs from 'file-saver'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebarr from "../../Admin/Sidebarr"
import Aos from 'aos'
const { TabPane } = Tabs

export default function Adminscreen() {

    // Check if the user is an admin, if not, redirect to the home page
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
        window.location.href = "/home"
    }

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className="mt-3 ml-3 mr-3 bs" style={{ backgroundColor: "#FCF9EF", height: '150vh' }}>

            <Sidebarr />
            <Tabs defaultActiveKey="1" style={{ display: 'flex', marginLeft: '300px' }}>

                <TabPane tab="Summary" key="1">
                    <Summery />
                </TabPane>

                <TabPane tab=" Bookings" key="2">
                    <Bookings />
                </TabPane>

                <TabPane tab="Rooms" key="3">
                    <Rooms />
                </TabPane>

                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>

                <TabPane tab="Package" key="5">
                    <Packages />
                </TabPane>

                <TabPane tab="Service" key="6">
                    <Services />
                </TabPane>

                <TabPane tab="Add Room" key="7">
                    <AddRoom />
                </TabPane>

                <TabPane tab="Add Package" key="8">
                    <AddPackage />
                </TabPane>

                <TabPane tab="Add Services" key="9">
                    <AddService />
                </TabPane>
            </Tabs>
        </div>
    );
}


/******************************************************(START)   GET ALL BOOKINGS***************************************************************** */
export function Bookings() {

    // State variables to store bookings data, loading state, and errors
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [dublicateBookings, setdublicateBookings] = useState([]);
    const [status, setstatus] = useState('all')

    // useEffect to fetch bookings data when the component mounts
    useEffect(() => {
        async function fetchBookings() {
            try {
                setLoading(true);

                // Fetch bookings data from the server
                const response = await axios.get("/api/bookings/getallbookings");

                // Set the bookings data in the state
                setdublicateBookings(response.data)
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchBookings(); // Call the async function here
    }, []);

    // Function to generate and download a PDF report
    const generatePdfReport = () => {
        if (bookings.length === 0) {
            alert('No booking data to export.');
            return;
        }

        const doc = new jsPDF();

        doc.text('Booking Report', 10, 10);

        const tableHeaders = ['BookingID', 'UserID', 'Room', 'CheckIn', 'CheckOut', 'Bill amount', 'Status'];

        const tableData = bookings.map(booking => [
            booking._id,
            booking.userName,
            booking.room,
            booking.fromdate,
            booking.todate,
            `Rs.${booking.totalamount}.00`,
            booking.status,
        ]);

        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
        });

        doc.save('booking_report.pdf');
    };

    // Function to generate and download the Excel report
    const generateExcelReport = () => {

        if (bookings.length === 0) {
            alert('No booking data to export.');
            return;
        }

        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Bookings');

        // Define the header row
        worksheet.addRow(['BookingID', 'UserID', 'Room', 'CheckIn', 'CheckOut', 'Bill amount', 'Status']);

        // Add data rows
        bookings.forEach((booking) => {
            worksheet.addRow([
                booking._id,
                booking.userName,
                booking.room,
                booking.fromdate,
                booking.todate,
                booking.totalamount,
                booking.status,
            ]);
        });

        // Generate the Excel file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'bookings.xlsx');
        });
    };

    function filterByType(e) {
        if (e !== 'all') {
            const tempBooking = dublicateBookings.filter(
                (booking) => booking.status.toLowerCase() === e.toLowerCase()
            );

            setBookings(tempBooking);
        } else {
            setBookings(dublicateBookings);
        }
    }

    // Render the bookings data in a table
    return (
        <div className="row" data-aos="fade-down">
            <div className="col-md-12">
                <h1
                style={{
                    fontSize: "30px",
                    color: "#C18239",
                    fontWeight: "bold",
                    
                }}
                >Bookings</h1>
                <br />
                {loading && <Loader />}

                <button onClick={generateExcelReport}
                    class="btn btnColour mb-3"
                >
                    <UilFileGraph />
                    Export to Excel
                </button>

                <button
                    onClick={generatePdfReport}
                    className="btn btnColour mb-3 ml-3"
                >
                    <UilFileGraph />
                    Generate PDF Report
                </button>

                <div className="row col-md-10" >

                    <div className="" value={status} onChange={(e) => filterByType(e.target.value)}>
                        <select className="form-control" style={{ backgroundColor: '#FCF9EF' }}>
                            <option value="all">All</option>
                            <option value="booked">Booked</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                </div>

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr className="trCSS">
                            <th scope="col" className="thCSS">BookingID</th>
                            <th scope="col" className="thCSS">UserID</th>
                            <th scope="col" className="thCSS">Room</th>
                            <th scope="col" className="thCSS">CheckIn</th>
                            <th scope="col" className="thCSS">CheckOut</th>
                            <th scope="col" className="thCSS">Bill amount</th>
                            <th scope="col" className="thCSS">Status</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {bookings.length &&
                            bookings.map((booking) => {
                                return (
                                    <tr className="trCSS" key={booking._id}>
                                        <td className="tdCSS">{booking._id}</td>
                                        <td className="tdCSS">{booking.userName}</td>
                                        <td className="tdCSS">{booking.room}</td>
                                        <td className="tdCSS">{booking.fromdate}</td>
                                        <td className="tdCSS">{booking.todate}</td>
                                        <td className="tdCSS">Rs.{booking.totalamount}.00</td>
                                        <td className="tdCSS">
                                            <b>{booking.status}</b>
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
/***************************************************************************(END)   GET ALL BOOKINGS ************************************************************************** */




/****************************************************************************(START)   GET ALL ROOMS ********************************************************************************** */
export function Rooms() {
    // State variables to store rooms data, loading state, and errors
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect to fetch rooms data when the component mounts
    useEffect(() => {
        async function fetchRooms() {
            try {
                setLoading(true);

                // Fetch rooms data from the server
                const response = await axios.get("/api/rooms/getallrooms");

                // Set the rooms data in the state
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchRooms(); // Call the async function here
    }, []);

    // Function to handle room deletion
    async function deleteRoom(roomID) {
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
                const response = await axios.delete(`/api/rooms/deleteRoom/${roomID}`);

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

    // Variables to store room details
    let roomid;
    let name;
    let type;
    let rentperday;
    let maxcount;
    let phonenumber;
    let description;
    let imageurls;

    // Render the rooms data in a table
    return (
        <div className="row" data-aos="fade-down">
            <div className="col-md-12">
                <h1
                style={{
                    fontSize: "30px",
                    color: "#C18239",
                    fontWeight: "bold",
                    
                }}
                >Rooms</h1>
                <br />

                {loading && <Loader />}

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr className="trCSS">
                            <th scope="col"  className="thCSS">RoomID</th>
                            <th scope="col"  className="thCSS">Name</th>
                            <th scope="col"  className="thCSS">Type</th>
                            <th scope="col"  className="thCSS">Rent per day</th>
                            <th scope="col"  className="thCSS">Max count</th>
                            <th scope="col"  className="thCSS">Phone number</th>
                            <th scope="col"  className="thCSS">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {rooms.length &&
                            rooms.map((room) => {
                                return (
                                    <tr className="trCSS">
                                        <td className="tdCSS">{(roomid = room._id)}</td>
                                        <td className="tdCSS">{(name = room.name)}</td>
                                        <td className="tdCSS">{(type = room.type)}</td>
                                        <td className="tdCSS">Rs.{(rentperday = room.rentperday)}.00</td>
                                        <td className="tdCSS">{(maxcount = room.maxcount)}</td>
                                        <td className="tdCSS">{(phonenumber = room.phonenumber)}</td>
                                        <td style={{ display: "none" }} className="tdCSS">
                                            {(description = room.description)}
                                        </td>
                                        <td style={{ display: "none" }} className="tdCSS">
                                            {(imageurls = room.imageurls.join(","))}
                                        </td>
                                        <td className="tdCSS">
                                            <Link to={`/updateRoom/${roomid}`}>
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
                                                onClick={() => deleteRoom(room._id)}
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

/***************************************************************************(END)   GET ALL ROOMS ************************************************************************** */



/***************************************************************************(START)   GET ALL USERS ************************************************************************** */

export function Users() {

    // State variables to store users data, loading state, and errors
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect to fetch users data when the component mounts
    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);

                // Fetch users data from the server
                const response = await axios.get("/api/users/getallusers");

                // Set the users data in the state
                setUsers(response.data);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchUsers(); // Call the async function here
    }, []);

    // Render the users data in a table
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Users</h1>
                <br />
                {loading && <Loader />}

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>
                            <th scope="col">UserID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Is Admin</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {users.length &&
                            users.map((user) => {
                                return (
                                    <tr>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
/***************************************************************************(END)   GET ALL USERS ************************************************************************** */


/***************************************************************************(START)   GET ALL PACKAGES ************************************************************************** */

export function Packages() {

    // State variables to store packages data, loading state, and errors
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect to fetch packages data when the component mounts
    useEffect(() => {
        async function fetchPackages() {
            try {
                setLoading(true);

                // Fetch packages data from the server
                const response = await axios.get("/api/package/getAllPackages");
                // Set the packages data in the state
                setPackages(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchPackages();
    }, []);

    // Function to handle package deletion
    async function deletePackage(packageId) {
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
                const response = await axios.delete(`/api/package/deletePackages/${packageId}`);

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


    let packageID

    // Render the packages data in a table
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Packages</h1>
                <br />
                {loading && <Loader />}

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>
                            <th scope="col">Package Name </th>
                            <th scope="col">Price</th>
                            <th scope="col" style={{ width: '65%' }}>Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {packages.length &&
                            packages.map((packagee) => {
                                return (
                                    <tr>
                                        <td>{packagee.name}</td>
                                        <td>{packagee.price}</td>
                                        <td>{packagee.description}</td>
                                        <td style={{ display: "none" }}>
                                            {(packageID = packagee._id)}
                                        </td>

                                        <td>
                                            <Link to={`/updatePackages/${packageID}`}>
                                                <button
                                                    className="btn "
                                                    style={{ backgroundColor: "#9B804E" }}
                                                >
                                                    <UilEdit />
                                                </button>
                                            </Link>

                                            <button
                                                className="btn ml-2"
                                                style={{ backgroundColor: "#3B362E", alignItems: 'center' }}
                                                onClick={() => deletePackage(packageID)}
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
/************************************************************************** (END)   GET ALL PACKAGES  **************************************************************************/


/***************************************************************************(START)   GET ALL PACKAGES ************************************************************************** */

export function Services() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchServices() {
            try {

                setLoading(true)
                const services = await axios.get("/api/service/getAllServices")
                setServices(services.data)
                setLoading(false)

            } catch (error) {

                console.error(error)
                setLoading(false)
                setError(error)

            }
        }

        fetchServices();
    }, []);

    async function deleteService(servicesID) {

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
                setLoading(true)

                // Send the delete request with the proper URL and data
                const response = await axios.delete(`/api/service/deleteService/${servicesID}`)

                if (response.status === 200) {
                    // Show success message
                    Swal.fire("Deleted", "Deleted Successfully", "success").then(
                        // Reload the page
                        (result) => window.location.reload()
                    )
                } else {
                    // Handle unexpected response status here
                    Swal.fire("Oops!!", "Something went wrong", "error")
                }
            }

        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(error);
            Swal.fire("Oops!!", "Something went wrong", "error");
        }
    }


    let servicesID

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Services</h1>
                <br />
                {loading && <Loader />}

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>
                            <th scope="col">Title </th>
                            <th scope="col" style={{ width: '65%' }}>Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {services.length &&
                            services.map((service) => {
                                return (
                                    <tr>
                                        <td>{service.title}</td>
                                        <td>{service.description}</td>
                                        <td style={{ display: "none" }}>
                                            {(servicesID = service._id)}
                                        </td>

                                        <td>
                                            <Link to={`/updateServices/${servicesID}`}>
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
                                                onClick={() => deleteService(servicesID)}
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
/************************************************************************** (END)   GET ALL PACKAGES  **************************************************************************/




/***************************************************************************(START)   ADD ROOM ************************************************************************** */

export function AddRoom() {

    // State variables to store room information
    const [name, setName] = useState("");
    const [rentperday, setrentperday] = useState();
    const [maxcount, setmaxcount] = useState();
    const [description, setDescription] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [type, setType] = useState("");
    const [imageUrl, setImageUrl] = useState("")
    

    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [maxCountError, setMaxCountError] = useState(null)


    // Function to add a new room
    async function addRoom() {
        
        const formData = new FormData();

        // Append the room data to the formData object
        formData.append("name", name)
        formData.append("rentperday", rentperday)
        formData.append("maxcount", maxcount)
        formData.append("description", description)
        formData.append("type", type)
        formData.append("imageUrl", imageUrl)

        console.log(formData);

        try {

            setLoading(true);

            const result = await axios.post("/api/rooms/addroom", formData);
            console.log(result.data);

            setLoading(false);
            Swal.fire("Added", "New Room Added Successfully", "success").then(
                (result) => (window.location.href = "/admin")
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
            setrentperday(inputValue);
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
            setmaxcount(inputValue);
            setError('');
        } else {
            setMaxCountError('Please enter a valid number.');
        }
    }


    // Render the form to add a new room
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
                Add Room
            </h4>
            <div class="form-row" >
                {loading && <Loader />}

                <div class="form-group col-md-6">
                    <label className="formLabel2">Room Name</label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className="formLabel2" for="inputPassword4">
                        Type
                    </label>
                    <input
                        type="email"
                        class="form-control inputFeild"
                        id="inputPassword4"
                        v
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className="formLabel2">Rent Per Day</label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        value={rentperday}
                        onChange={handleRentPerDayChange}
                    />
                    {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                </div>

                <div class="form-group col-md-6">
                    <label className="formLabel2" for="inputPassword4">
                        Max count
                    </label>
                    <input
                        type="email"
                        class="form-control inputFeild"
                        value={maxcount}
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
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}

                    />
                </div>
                
                <div class="form-group col-md-12">
                    <label className="formLabel2" for="inputAddress">
                        Image
                    </label>
                    <input
                        type="file"
                        name="file_picker"
                        class="form-control inputFeild"
                        id="inputAddress file_picker"
                        onChange={(e) => {
                            setImageUrl(e.target.files[0])
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
                <button type="submit" class="btn btnColour" onClick={addRoom}>
                    Add Room
                </button>
            </div>
        </div>
    );
}
/***************************************************************************(END)   ADD ROOM ************************************************************************** */


export function Summery() {
    const [bookedCount, setBookedCount] = useState(0);
    const [canceledCount, setCanceledCount] = useState(0);
    const [totalBillAmount, setTotalBillAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch bookings data when the component mounts
        axios.get("/api/bookings/getallbookings") // Replace with the actual API endpoint
            .then((response) => {
                const bookings = response.data;

                // Calculate the count of booked and canceled bookings
                const bookedBookings    = bookings.filter((booking)     => booking.status === "booked");
                const canceledBookings  = bookings.filter((booking)     => booking.status === "cancelled");

                // Calculate the total bill amount for all booked bookings
                const totalAmount = bookedBookings.reduce((acc, booking) => acc + booking.totalamount, 0);

                setBookedCount(bookedBookings.length);
                setCanceledCount(canceledBookings.length);
                setTotalBillAmount(totalAmount);

                // Set loading to false when data is fetched
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching bookings: ", error);
                // Set loading to false in case of an error
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1
            style={{
                fontSize: "30px",
                color: "#C18239",
                fontWeight: "bold",
                marginBottom: "50px",
            }}
            >Summary</h1>

            <div className="row">

                <div className="card col-md-3 bs" style={{ background: '#f3fef9' }} data-aos="flip-right">
                    <div className="card-body">
                        {loading ? (
                            <div className="spinner-grow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <h5 className="card-title text-center" style={{ fontSize: '45px', fontWeight: '700' }}>{bookedCount}</h5>
                        )}
                        <br />
                        <h6 className="card-subtitle mb-2 text-muted text-center">TOTAL BOOKED</h6>
                    </div>
                </div>

                <div className="card col-md-3 bs" style={{ background: '#fff0f1' }} data-aos="flip-right">
                    <div className="card-body">
                        {loading ? (
                            <div className="spinner-grow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <h5 className="card-title text-center" style={{ fontSize: '45px', fontWeight: '700' }}>{canceledCount}</h5>
                        )}
                        <br />
                        <h6 className="card-subtitle mb-2 text-muted text-center">TOTAL CANCELED</h6>
                    </div>
                </div>

                <div className="card col-md-3 bs" style={{ background: '#fffeff' }} data-aos="flip-right">
                    <div className="card-body">
                        {loading ? (
                            <div className="spinner-grow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <h5 className="card-title text-center" style={{ fontSize: '35px', fontWeight: '700' }}>Rs.{totalBillAmount}.00</h5>
                        )}
                        <br />
                        <h6 className="card-subtitle mb-2 text-muted text-center">TOTAL BILLED AMOUNT</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}