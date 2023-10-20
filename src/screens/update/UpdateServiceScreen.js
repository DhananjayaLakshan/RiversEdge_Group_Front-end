import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function UpdateServiceScreen() {

    const { servicesID } = useParams()

    let back = useNavigate()

    const handleBackClick = () => {
        // Navigate to a specific route when the "Back" button is clicked
        back('/admin');
    };


    const [service, setService] = useState({
        id: servicesID,
        title: '',
        description: '',
        imageUrl: ''
    })


    useEffect(() => {

        async function fetchData() {
            try {

                axios.post('/api/service/getServiceById', { servicesID: servicesID })
                    .then(res => setService({
                        ...service,
                        title: res.data.title,
                        description: res.data.description,
                        imageUrl: res.data.imageUrl,
                    }))

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        try {

            const formData = new FormData()
            formData.append('title', service.title)
            formData.append('description', service.description)

            if (service.imageUrl[0]) {
                formData.append('imageUrl', service.imageUrl[0]);
            }


            axios.put(`/api/service/updateServices/${servicesID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
                },
            });

            Swal.fire('Updated', 'Service details has been successful', 'success').then(result => {
                navigate('/admin')
            })

        } catch (error) {
            console.error('Failed to update service:', error)
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }


    }


    return (

        <div className='col-md-8 bs center mt-5 mb-5' style={{ backgroundColor: '#E9E3D3' }}>

            <h4 style={{ fontSize: '30px', color: '#C18239', fontWeight: 'bold', marginBottom: '50px' }}>Update Service</h4>




            <div class="form-group">
                <label className='formLabel2' >Title</label>
                <input type="text" class="form-control inputFeild"
                    value={service.title} onChange={e => setService({ ...service, title: e.target.value })}
                />
            </div>

            <div class="form-group">
                <label className='formLabel2' >Description</label>
                <input type="text" class="form-control inputFeild"
                    value={service.description} onChange={e => setService({ ...service, description: e.target.value })}
                />
            </div>

            <div class="form-group">
                <label className='formLabel2' for="inputAddress">url</label>
                <input 
                    type="file"
                    name="file_picker"
                    class="form-control inputFeild"
                    id="inputAddress file_picker"
                    onChange={e => setService({ ...service, imageUrl: e.target.files })}
                />

                {service.imageUrl && (
                    <div>
                        <img
                            src={`http://localhost:5000/uploads/${service.imageUrl}`}
                            width={'100px'}
                            height={'100px'}
                        />
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-between mt-5 btnhover">
                <button
                    type="button"
                    className="btn btnColour"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                    onClick={handleBackClick}
                >
                    Back
                </button>
                <button type="submit" class="btn btnColour" onClick={handleSubmit}>Update</button>
            </div>

        </div>
    )

}
