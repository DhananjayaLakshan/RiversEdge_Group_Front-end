import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function UpdatePackageScreen() {

    const { packagesID } = useParams()

    let back = useNavigate()

    const handleBackClick = () => {
        // Navigate to a specific route when the "Back" button is clicked
        back('/admin');
    };

    const [packages, setPackages] = useState({
        id: packagesID,
        name: '',
        description: '',
        imageUrl: '',
        price: 0
    })


    useEffect(() => {

        async function fetchData() {
            try {

                await axios.post('/api/package/getPackageById/', { packagesID: packagesID })
                    .then(res => setPackages({
                        ...packages,
                        name: res.data.name,
                        description: res.data.description,
                        imageUrl: res.data.imageUrl,
                        price: res.data.price
                    }))

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            // Append other package data to the FormData
            formData.append('name', packages.name);
            formData.append('description', packages.description);
            formData.append('price', packages.price);

            // Append the image file to the FormData
            if (packages.imageUrl[0]) {
                formData.append('imageUrl', packages.imageUrl[0]);
            }

            await axios.put(`/api/package/updatePackage/${packagesID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
                },
            });

            Swal.fire('Updated', 'Room details has been successful', 'success').then(result => {
                navigate('/admin')
            })

        } catch (error) {
            console.error('Failed to update room:', error)
            Swal.fire('Oops!', 'Something went wrong', 'error')
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

                Update Package
            </h4>

            <div class="form-row">
                {/* {loading && <Loader />} */}

                <div class="form-group col-md-6">
                    <label className="formLabel2">Package Name</label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        value={packages.name}
                        onChange={e => setPackages({ ...packages, name: e.target.value })}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className="formLabel2">Price</label>
                    <input
                        type="text"
                        class="form-control inputFeild"
                        value={packages.price}
                        onChange={e => setPackages({ ...packages, price: e.target.value })}
                    />
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
                    value={packages.description}
                    onChange={e => setPackages({ ...packages, description: e.target.value })}
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
                    onChange={(e) => setPackages({ ...packages, imageUrl: e.target.files })}
                />


                {packages.imageUrl && (
                    <div>
                        <img
                            src={`http://localhost:5000/uploads/${packages.imageUrl}`}
                            width={'100px'}
                            height={'100px'}
                        />
                    </div>
                )}

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
                <button type="submit" class="btn btnColour" onClick={handleSubmit}>
                    Update Package
                </button>
            </div>
        </div>
    )
}
