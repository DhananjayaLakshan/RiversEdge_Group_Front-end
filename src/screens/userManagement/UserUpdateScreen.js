import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function UserUpdateScreen() {

    const { userid } = useParams()
    let back = useNavigate()

    const handleBackClick = () => {
        // Navigate to a specific route when the "Back" button is clicked
        back('/profile');
    };

    const [user, setUser] = useState({
        id:userid,
        fistName:'',
        lastName:'',
        phoneNumber:'',
        email:'',
        password:'',
    })


    useEffect(() => {

        async function fetchData() {
            try {

                await axios.post('/api/users/getUserById/', { userid: userid })
                    .then(res => setUser({
                        ...user,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        phoneNumber: res.data.phoneNumber,
                        email: res.data.email,
                        password: res.data.password
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
            formData.append('firstName', user.firstName);
            formData.append('lastName', user.lastName);
            formData.append('phoneNumber', user.phoneNumber);
            formData.append('email', user.email);
            formData.append('password', user.password);
            
            console.log(formData);

            await axios.put(`/api/users/updateUser/${userid}`, user);

            Swal.fire('Updated', 'User details has been successfully updated', 'success').then(result => {
                navigate('/login')
            })

        } catch (error) {
            console.error('Failed to update user:', error)
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }


    }


    return (
        <div>
            <div className="row justify-content-center mt-5">

                <div className="col-md-5 mt-5">
                    
                    <div className='bs'>

                        <h2>Register</h2>
                        <input type="text" className='form-control' placeholder='First Name'
                            value={user.firstName} 
                            onChange={e => setUser({ ...user, firstName: e.target.value })} />

                        <input type="text" className='form-control' placeholder='Last Name'
                            value={user.lastName} 
                            onChange={e => setUser({ ...user, lastName: e.target.value })} />

                        <input type="text" className='form-control' placeholder='Phone number'
                            value={user.phoneNumber} 
                            onChange={e => setUser({ ...user, phoneNumber: e.target.value })} />

                        <input type="text" className='form-control' placeholder='email'
                            value={user.email} 
                            onChange={e => setUser({ ...user, email: e.target.value })} />

                        <input type="text" className='form-control' placeholder='password'
                            value={user.password} 
                            onChange={e => setUser({ ...user, password: e.target.value })} />
                        
                        <button className='btn mt-3' onClick={handleSubmit}>Update</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
