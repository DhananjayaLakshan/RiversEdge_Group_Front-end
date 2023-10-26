import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { URL } from '../../App'

function ViewPayment() {
    const { id } = useParams()

    const [payments, setpay] = useState({
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
    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-5 mt-5">

                    <div className='bs'>

                        <h2>View Payment</h2>
                        Payment-ID : <input type="text" className='form-control'
                            value={id} />

                        Payment-Type:<input type="text" className='form-control'
                            value={payments.type} />

                        Department:<input type="text" className='form-control'
                            value={payments.department} />

                        Date:<input type="text" className='form-control'
                            value={new Date(payments.date).toLocaleDateString()} />

                        Amount:<input type="text" className='form-control'
                            value={payments.amount} />

                        Status:<input type="text" className='form-control'
                            value={payments.status} />
                        <div>
                            <Link className='btn mt-3 btnColour dnbtn' to="/payment">Done</Link>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ViewPayment