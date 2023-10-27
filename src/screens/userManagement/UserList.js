import React, { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import axios from "axios"


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
    )
}
