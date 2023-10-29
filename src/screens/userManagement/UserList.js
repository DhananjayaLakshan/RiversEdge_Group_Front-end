import React, { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import axios from "axios"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UilFileGraph } from '@iconscout/react-unicons'

export default function UserList() {
    // State variables to store users data, loading state, and errors
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchkey, setsearchkey]             = useState('')
    const [duplicateUser, setDuplicateUser] = useState([])

    //search function
    function filterBySearch() {        

        const tempUser = duplicateUser.filter((user) =>
            user.firstName.toLowerCase().includes(searchkey.toLowerCase())
        )

        setUsers(tempUser)
    }

    // useEffect to fetch users data when the component mounts
    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);

                // Fetch users data from the server
                const response = await axios.get("/api/users/getallusers");

                // Set the users data in the state
                setDuplicateUser(response.data)
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

    const generatePdfReport = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Define the columns and rows for the PDF table
        const columns = ["UserID", "First Name", "Last Name", "Phone Number", "Email"];
        const rows = users.map(user => [user._id, user.firstName, user.lastName, user.phoneNumber, user.email]);

        // Add the table to the PDF document
        doc.autoTable({
            head: [columns],
            body: rows,
        });

        // Save the PDF with a unique name (e.g., timestamp)
        const fileName = `user-report-${Date.now()}.pdf`;
        doc.save(fileName);
    };

    // Render the users data in a table
    return (
        <div className="row">
        <div className="col-md-12">
            <h1
                style={{
                    fontSize: "30px",
                    color: "#C18239",
                    fontWeight: "bold",
                }}
            >
                Users
            </h1>
            <br />
            {loading && <Loader />}

            <div className="row">

            <div className="col-md-6">
                    <button
                        onClick={generatePdfReport}
                        className="btn btnColour"
                    >
                        <UilFileGraph />
                        Generate PDF Report
                    </button>
                </div>

                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by First Name"
                            value={searchkey}
                            onChange={(e) => setsearchkey(e.target.value)}
                            onKeyUp={filterBySearch}
                        />                        
                    </div>
                </div>

                
            </div>

            <table
                className="table table-bordered"
                style={{ border: "solid 2px #C2BDB8" }}
            >
                <thead style={{ backgroundColor: "#FCF9EF" }}>
                    <tr>
                        <th scope="col">UserID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#E9E3D3" }}>
                    {users.length &&
                        users.map((user) => {
                            return (
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                    <td>{user.email}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    </div>
    )
}
