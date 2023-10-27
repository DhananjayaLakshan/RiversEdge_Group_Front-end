import React, { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import axios from "axios"

export default function FeedbackList() {
    // State variables to store users data, loading state, and errors
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect to fetch users data when the component mounts
    useEffect(() => {
        async function fetchFeedback() {
            try {
                setLoading(true);

                // Fetch users data from the server
                const response = await axios.get("/api/feedback/display");

                // Set the users data in the state
                setFeedback(response.data);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchFeedback(); // Call the async function here
    }, []);

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
            >Feedback</h1>
                <br />
                {loading && <Loader />}

                <table
                    class="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>
                            
                            <th scope="col">First Name</th>
                            <th scope="col">FeedBack</th>
                            
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {feedback.length &&
                            feedback.map((feed) => {
                                return (
                                    <tr>
                                        
                                        <td>{feed.firstName}</td>
                                        <td>{feed.description}</td>
                                        
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
