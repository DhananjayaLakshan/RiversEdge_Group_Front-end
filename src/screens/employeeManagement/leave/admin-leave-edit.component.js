import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import * as Swal from "sweetalert2";


export default class AdminEditLeave extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmpId = this.onChangeEmpId.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeFromD = this.onChangeFromD.bind(this);
        this.onChangeToD = this.onChangeToD.bind(this);
        this.onChangeNod = this.onChangeNod.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.leaveId,
            firstName: '',
            lastName: '',
            empId: '',
            position: '',
            fromD: '',
            toD: '',
            nod: '',
            reason: '',
            status: ''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/leave/` + this.state.id)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    empId: response.data.empId,
                    position: response.data.position,
                    fromD: response.data.fromD,
                    toD: response.data.toD,
                    nod: response.data.nod,
                    reason: response.data.reason,
                    status: response.data.status,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeEmpId(e) {
        this.setState({
            empId: e.target.value
        });
    }

    onChangePosition(e) {
        this.setState({
            position: e.target.value
        });
    }

    onChangeFromD(date) {
        this.setState({
            fromD: date
        });
    }
    onChangeToD(date) {
        this.setState({
            toD: date
        });
    }
    onChangeNod(e) {
        this.setState({
            nod: e.target.value
        });
    }
    onChangeReason(e) {
        this.setState({
            reason: e.target.value
        });
    }
    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();
        const leave = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            empId: this.state.empId,
            position: this.state.position,
            fromD: this.state.fromD,
            toD: this.state.toD,
            nod: this.state.nod,
            reason: this.state.reason,
            status: this.state.status,
        }
        console.log(leave);

        // if (!this.state.firstName) {
        //     this.setState({ firstNameError: "Your First Name cannot be null." })
        // }else if (!this.state.lastName) {
        //     this.setState({ lastNameError: "Your Last Name cannot be null." })
        // }else if (this.state.phone1.length !== 10) {
        //     this.setState({ phone1Error: "Please Enter a valid Phone Number." })
        // }else if (this.state.phone2.length !== 10) {
        //     this.setState({ phone2Error: "Please Enter a valid Phone Number." })
        // }else if (!this.state.email || regex.test(this.state.email) === false) {
        //     this.setState({ emailError: "Please Enter a valid email." })
        // } else if (!this.state.country) {
        //     this.setState({ countryError: "Country cannot be null." })
        // }else if (this.state.address.length < 10) {
        //     this.setState({ addressError: "Address should contain more than 10 characters." })
        // } else if (!this.state.pass || !this.state.cPass) {
        //     this.setState({ passNullError: "Password and confirm password cannot be null." })
        // }else if (this.state.pass !== this.state.cPass) {
        //     this.setState({ passUnequalError: "Passwords are not matching" })
        // }else if (this.state.pass.length < 5 && this.state.cPass.length) {
        //     this.setState({ passLengthError: "Passwords should contain at least 5 characters" })
        // } else {
            axios.put('http://localhost:5000/leave/' + this.state.id, leave)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.props.close();

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Leave has been updated!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an error updating!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })
        // }
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className='' onSubmit={this.onSubmit}>
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>Edit Customer Details (admin)</p>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>First Name </label>
                                                    <input type="text"
                                                        // required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}

                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.firstNameError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>last Name </label>
                                                    <input type="text"
                                                        // required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}

                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.lastNameError}</p>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-1 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >employee ID</label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.empId}
                                                        onChange={this.onChangeEmpId}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.emailError}</p>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Position</label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.position}
                                                        onChange={this.onChangePosition}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.emailError}</p>
                                                </div> */}
                                                </div>
                                                <div class="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>From Date</label>
                                                        <input type="text"
                                                            required
                                                            disabled
                                                            className="form-control"
                                                            value={this.state.fromD.substring(0, 10)}
                                                            onChange={this.onChangeFromD}
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.phone1Error}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>To Date</label>
                                                            <input type="text"
                                                            required
                                                            disabled
                                                            className="form-control"
                                                            value={this.state.toD.substring(0, 10)}
                                                            onChange={this.onChangeReason}
                                                        />
                                                            <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.phone2Error}</p>
                                                    </div>
                                                </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Reason</label>
                                                        <input type="text"
                                                            required
                                                            disabled
                                                            className="form-control"
                                                            value={this.state.reason}
                                                            onChange={this.onChangeReason}
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.addressError}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Status</label>
                                                        <select type="text"
                                                            className="form-control"
                                                            value={this.state.status}
                                                            onChange={this.onChangeStatus}
                                                        >
                                                            <option value = "null" >{this.state.status}</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Approved">Approved</option>
                                                            <option value="Declined">Declined</option>
                                                        </select>
                                                            <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.countryError}</p>
                                                    </div>
                                                </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-[#9B804E] hover:bg-[#867556] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Edit Leave" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}