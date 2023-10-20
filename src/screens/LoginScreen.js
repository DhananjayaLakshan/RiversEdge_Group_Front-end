import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";

function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading]   = useState(false)
    const [error, setError]       = useState()

    async function login() {
        const user = {
            email,
            password
        }
        try {

            setLoading(true)
            const result = (await axios.post('/api/users/login', user)).data
            setLoading(false)

            //convert result to String
            localStorage.setItem('currentUser', JSON.stringify(result))
            //redirect to home page
            window.location.href='/'            

        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(true)
        }
    }

    return (
        <div>

            {loading && (<Loader/>)}

            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">

                {error && (<Error message='Invalid Email or Password'/>)}

                    <div className='bs'>

                        <h2>Login</h2>

                        <input type="text" className='form-control' placeholder='email'
                            value={email} onChange={(e) => { setEmail(e.target.value) }} />

                        <input type="text" className='form-control' placeholder='password'
                            value={password} onChange={(e) => { setPassword(e.target.value) }} />

                        <button className='btn mt-3' onClick={login}>Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginScreen