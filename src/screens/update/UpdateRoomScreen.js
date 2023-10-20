import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function UpdateRoomScreen() {

    const {roomid} = useParams()

    let back = useNavigate()
    
    const handleBackClick = () => {
        // Navigate to a specific route when the "Back" button is clicked
        back('/admin');
    };

    const [room, setroom] = useState({
        id: roomid,
        name:'',
        imageUrl: '',
        rentperday: '',
        type: '',
        maxamount: '',
        phonenumber: '',
        description: ''

    })


    useEffect(() => {

        async function fetchData() {
            try {                
                
                axios.post('/api/rooms/getroombyid', { roomid: roomid })
                .then(res => setroom({
                    ...room, 
                    name: res.data.name,
                    imageUrl: res.data.imageUrl,
                    rentperday: res.data.rentperday,
                    type: res.data.type,
                    maxcount: res.data.maxcount,
                    phonenumber: res.data.phonenumber,
                    description: res.data.description
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

            const formData = new FormData();
            formData.append('name',         room.name);
            formData.append('rentperday',   room.rentperday);
            formData.append('type',         room.type);
            formData.append('maxcount',     room.maxcount);
            formData.append('phonenumber',  room.phonenumber);
            formData.append('description',  room.description);

            // Append the image file to the FormData
            if (room.imageUrl[0]) {
                formData.append('imageUrl', room.imageUrl[0]);
            }
            
        axios.put(`/api/rooms/updateRoom/${ roomid }` , formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
                },
            });

        Swal.fire('Updated', 'Room details has been successful', 'success').then(result => {
                    navigate('/admin')})

        } catch (error) {

            console.error('Failed to update room:', error)
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }

        
    }


    return (

        <div className='col-md-8 bs center mt-5 mb-5' style={{ backgroundColor: '#E9E3D3' }}>

            

            <h4 style={{ fontSize: '30px', color: '#C18239', fontWeight: 'bold', marginBottom: '50px' }}>Update Room</h4>

            <div class="form-row">


                <div class="form-group col-md-6">
                    <label className='formLabel2' >Room Name</label>
                    <input type="text" class="form-control inputFeild" 
                    value={room.name} onChange={e => setroom({...room, name:e.target.value})}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel2' for="inputPassword4">Type</label>
                    <input type="email" class="form-control inputFeild" id="inputPassword4" v
                    value={room.type} onChange={e => setroom({...room, type:e.target.value})}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel2' >Rent Per Day</label>
                    <input type="text" class="form-control inputFeild" 
                    value={room.rentperday} onChange={e => setroom({...room, rentperday:e.target.value})}
                    />
                </div>

                <div class="form-group col-md-6">
                    <label className='formLabel2' for="inputPassword4">Max count</label>
                    <input type="email" class="form-control inputFeild" id="inputPassword4" 
                    value={room.maxcount} onChange={e => setroom({...room, maxcount:e.target.value})}
                    />
                </div>
            </div>

            <div class="form-group">
                <label className='formLabel2' for="inputAddress">description</label>
                <input type="text" class="form-control inputFeild" id="inputAddress"  
                value={room.description} onChange={e => setroom({...room, description:e.target.value})}
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
                    onChange={(e) => setroom({ ...room, imageUrl: e.target.files })}
                />


                {room.imageUrl && (
                    <div>
                        <img
                            src={`http://localhost:5000/uploads/${room.imageUrl}`}
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
                <button type="submit" class="btn btnColour" onClick={handleSubmit}>Update</button>
            </div>

        </div>
    )
}
