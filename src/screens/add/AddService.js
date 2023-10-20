import React, { useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";


export default function AddService() {

    const [title, setTitle] = useState("")
    const [description, setDescription]= useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(false);


    async function addService(){

        // const newService = {
        //     title,
        //     description,
        //     imageUrl
        // }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("imageUrl", imageUrl)
        
        try {
            setLoading(true)

            const result = await axios.post("/api/service/addService", formData);
            console.log(result.data);

            setLoading(false);

            Swal.fire("Added", "New Service Added Successfully", "success").then(
                (result) => (window.location.href = "/admin")
            );
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire("Oops!!", "Something went wrong", "error");
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
                Add Service
            </h4>

            
                {loading && <Loader />}

                <div class="form-group col-md-12">
                    <label className="formLabel2">Title</label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
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
                            setImageUrl(e.target.files[0]);
                        }}
                    />
                </div>

            <div className="d-flex justify-content-between mt-5">
                <button
                    type="submit"
                    class="btn btnColour"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}                    
                >
                    Back
                </button>
                {/* <button type="submit" class="btn btnColour" onClick={addRoom}> */}
                <button type="submit" class="btn btnColour" onClick={addService}>
                    Update Service
                </button>
            </div>
        </div>
    )
}
