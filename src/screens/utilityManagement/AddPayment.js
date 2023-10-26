import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Success from '../../components/Success';
import { URL } from '../../App';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddPayment() {
    const [payid, setpayid] = useState('');
    const [type, settype] = useState('');
    const [department, setdepartment] = useState('');
    const [date, setdate] = useState('');
    const [amount, setamount] = useState('');
    const [status, setstatus] = useState('');
    const [empid, setempid] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);

    const navigate = useNavigate();

    async function addpayment(event) {
        event.preventDefault();

        const detail = {
            payid: payid,
            type: type,
            department: department,
            date: date,
            amount: amount,
            status: status
        };
        try {
            setloading(true);
            const result = await axios.post(`${URL}/api/addPayment`, detail);
            setloading(false);
            setsuccess(true);

            setpayid('');
            settype('');
            setdepartment('');
            setdate('');
            setamount('');
            setstatus('');
            setempid('');

            Swal.fire('Added', 'Payment Added Successfully', 'success').then((result) => {
                navigate('/payment');
            });
        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(true);
        }
    }

    return (
        <div>
            {loading && <Loader />}
            {error && <Error />}

            <div className="row justify-content-center">
                <div className="col-md-5 mt-5">
                    <div className="bs">
                        <h2>Add Payment</h2>
                        <form onSubmit={addpayment}>
                            Payment-Type:
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={type}
                                onChange={(e) => {
                                    settype(e.target.value);
                                }}
                            />
                            Department:
                            <select
                                className="form-control"
                                required
                                onChange={(e) => setdepartment(e.target.value)}
                                value={department}
                            >
                                <option value="" style={{ width: '250px' }}>
                                    Department
                                </option>
                                <option value="Finance">Finance</option>
                                <option value="Inventory">Inventory</option>
                                <option value="Employee">Employee</option>
                                <option value="Transport">Transport</option>
                            </select>
                            Date:
                            <input
                                type="date"
                                required
                                className="form-control"
                                value={date}
                                onChange={(e) => {
                                    setdate(e.target.value);
                                }}
                            />
                            Amount:
                            <input
                                type="number"
                                className="form-control"
                                required
                                value={amount}
                                onChange={(e) => {
                                    setamount(e.target.value);
                                }}
                            />
                            Status:
                            <select
                                className="form-control"
                                required
                                onChange={(e) => setstatus(e.target.value)}
                                value={status}
                            >
                                <option value="" style={{ width: '250px' }}>
                                    Status
                                </option>
                                <option value="Successful">Successful</option>
                                <option value="Failed">Failed</option>
                            </select>
                            <input
                                id="sub"
                                type="submit"
                                className="btn mt-3 btnColour text-center paybtn"
                                value="Submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPayment;
