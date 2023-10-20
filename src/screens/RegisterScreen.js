import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

function RegisterScreen() {
  const[name, setName]                = useState('')
  const[email, setEmail]              = useState('')
  const[password, setPassword]        = useState('')
  const[confirmPass, setconfirmPass]  = useState('')

  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState()
  const [success,setSuccess]    = useState()

  async function register(){
    if (password === confirmPass) {
        const user= {
        name,
        email,
        password,
        confirmPass
      }
      
      try {
        setLoading(true)//set loading
        const result = await axios.post('/api/users/register', user).data
        setLoading(false)//loading is set to false 
        setSuccess(true)//and display success
        
        //set input feilds empty after registration
        setName('')
        setEmail('')
        setPassword('')
        setconfirmPass('')

      } catch (error) {
        console.log(error);
        setLoading(false)
        setError(true)
      }

    }else{
      alert('Password is not matched')
    }
  }

  return (
    <div>
      {loading && (<Loader/>)}
      {error && (<Error/>)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
        {success && (<Success message='Registration success..'/>)}
          <div className='bs'>

            <h2>Register</h2>
            <input type="text" className='form-control' placeholder='name'
              value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type="text" className='form-control' placeholder='email'
              value={email} onChange={(e) => { setEmail(e.target.value) }} />

            <input type="text" className='form-control' placeholder='password'
              value={password} onChange={(e) => { setPassword(e.target.value) }} />

            <input type="text" className='form-control' placeholder='confirm password'
              value={confirmPass} onChange={(e) => { setconfirmPass(e.target.value) }} />

            <button className='btn mt-3' onClick={register}>Register</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegisterScreen