import React, { useState } from "react"
import axios from "axios"
import Loader from "../../components/Loader"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function AddPackage() {

    const [name, setName]                   = useState("")
    const [price, setPrice]                 = useState()
    const [description, setDescription]     = useState("")
    const [imageUrl, setImageUrl]           = useState("")
    const [loading, setLoading]             = useState(false)

    const [error, setError] =useState(null)
    
    const navigate = useNavigate()

    //Function to handle the "Back" button click
    const handleBackClick = () => {
        // Navigate to a specific when the "Back" button is clicked
        navigate('/')
    }

    async function addPackage(){

        const formData = new FormData()
        formData.append("imageUrl", imageUrl)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("description", description)

        console.log(formData)

        try {

            setLoading(true)

            // Send a POST request to the server to add a new package
            const result = await axios.post("/api/package/addPackage", formData)
            console.log(result.data)

            setLoading(false)

            // Show a success message to the user and redirect to the admin page
            Swal.fire("Added", "New Package Added Successfully", "success").then(
                (result) => (window.location.href = "/admin")                
            )

        } catch (error) {
            console.log(error)
            setLoading(false)
            // Show an error message to the user
            Swal.fire("Oops!!", "Something went wrong", "error");
        }
    }

    const handlePriceChange = (e) => {

        const inputValue = e.target.value;
        
        // Use a regular expression to allow only numbers (including decimals)
        const validInput = /^[0-9]*\.?[0-9]*$/.test(inputValue);

        if (validInput) {
            setPrice(inputValue);
        setError('');
        } else {
        setError('Please enter a valid number.');
        }
    }


    return (

        <div
            className="col-md-8 bs center mt-5 mb-5"
            style={{ backgroundColor: "#E9E3D3" }}
        >
            <h4
                style={{
                    fontSize: "30px",
                    color: "#C18239",
                    fontWeight: "bold",
                    marginBottom: "50px",
                }}
            >
                Add Package
            </h4>

            <div class="form-row">
                {loading && <Loader />}

                <div class="form-group col-md-6">
                    <label className="formLabel2">Package Name</label>
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
                    <label className="formLabel2">Price</label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        value={price}
                        // onChange={(e) => {
                        //     setPrice(e.target.value);
                        // }}
                        onChange={handlePriceChange}
                    />
                    {error && <div className="error-message" style={{color:'red'}}>{error}</div>}
                </div>
                
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

            <div className="d-flex justify-content-between mt-5">
                <button
            type="button"
            className="btn btnColour"
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
            onClick={handleBackClick}
        >
            Back
        </button>
                
                <button type="submit" class="btn btnColour" 
                onClick={addPackage}
                >
                    Add Package
                </button>
            </div>
        </div>
    )
}
