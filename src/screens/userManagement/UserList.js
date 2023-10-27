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

    const generatePdfReport = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Define the columns and rows for the PDF table
        const columns = ["UserID", "First Name", "Last Name", "Phone Number", "Email", "Is Admin"];
        const rows = users.map(user => [user._id, user.firstName, user.lastName, user.phoneNumber, user.email, user.isAdmin ? "YES" : "NO"]);

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
            >Users</h1>
                <br />
                {loading && <Loader />}

                <button
                    onClick={generatePdfReport}
                    className="btn btnColour mb-3 ml-3"
                >
                    <UilFileGraph />
                    Generate PDF Report
                </button>

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>
                            <th scope="col">UserID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Phone Number</th>
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
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
