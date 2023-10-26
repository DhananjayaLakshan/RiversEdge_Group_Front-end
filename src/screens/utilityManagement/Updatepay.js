import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { URL } from '../../App';


function Updatepay() {
    const { id } = useParams()

    const [payments, setpay] = useState({
        _id: id,
        payid: '',
        type: '',
        department: '',
        date: '',
        amount: '',
        status: ''
    })

    useEffect(() => {
        axios.get(`${URL}/api/addPayment/${id}`)
            .then(res => setpay({
                ...payments,
                payid: res.data._id,
                type: res.data.type,
                department: res.data.department,
                date: res.data.date,
                amount: res.data.amount,
                status: res.data.status

            }))
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //console.log(payments);
            const response = await axios.put(`${URL}/api/addPayment/${id}`, payments);

            console.log('Response:', response.data);
            Swal.fire('Updated', 'Payment details has been successful', 'success').then(result => {
                navigate('/payment')
            })

        } catch (error) {
            console.error('Failed to update Payment:', error)
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }

    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-5 mt-5">

                    <div className='bs'>

                        <h2>Update Payment</h2>
                        Payment-ID : <input type="text" className='form-control'
                            value={id} />

                        Payment-Type:<input type="text" className='form-control'
                            value={payments.type} onChange={e => setpay({ ...payments, type: e.target.value })} />

                        Department:<input type="text" className='form-control'
                            value={payments.department} onChange={e => setpay({ ...payments, department: e.target.value })} />

                        Date:<input type="text" className='form-control'
                            value={payments.date} onChange={e => setpay({ ...payments, date: e.target.value })} />

                        Amount:<input type="text" className='form-control'
                            value={payments.amount} onChange={e => setpay({ ...payments, amount: e.target.value })} />

                        Status:<input type="text" className='form-control'
                            value={payments.status} onChange={e => setpay({ ...payments, status: e.target.value })} />
                        <div>
                            <Link className='btn mt-3 btnColour  upbtn' onClick={handleSubmit}>Update</Link>
                            <Link className='btn mt-3 btn-primary calbtn' to='/payment' >Cancel</Link >
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Updatepay