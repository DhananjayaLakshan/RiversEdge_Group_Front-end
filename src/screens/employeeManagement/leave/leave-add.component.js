import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import * as Swal from "sweetalert2";
import AuthenticationService from "../../userManagement/AuthenticationService";



export class CreateLeave extends Component {
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
            status: 'pending',
            searchCustomer:'',
            customer: [],
        }
    }

    componentDidMount() {
        // this.refreshList();
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();
        const loggedUserId = AuthenticationService.loggedUserId();
        console.log(isUserLoggedIn)
        console.log(loggedUserRole)
        console.log(loggedUserId)
        this.setState({searchCustomer: loggedUserId});
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

    refreshList(){
        axios.get('http://localhost:5000/customer/')
        .then(response => {
            this.setState({ customer: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const leave = {
            firstName: this.state.searchCustomer,
            lastName: this.state.lastName,
            empId: this.state.empId,
            position: this.state.position,
            fromD: this.state.fromD,
            toD: this.state.toD,
            nod: this.state.nod,
            reason: this.state.reason,
            status: 'pending',
        }

        console.log(leave);

        if (!this.state.lastName) {
            this.setState({ lastNameError: "Last Name cannot be null" })
        }else if (!this.state.empId) {
            this.setState({ empIdError: "Emp ID cannot be null" })
        }else if (!this.state.fromD || !this.state.toD) {
            this.setState({ DateError: "Date ID cannot be null" })
        }else if (!this.state.nod) {
            this.setState({ nodError: "please enter number of days" })
        }else if(!this.state.reason){
            this.setState({reasonError : "please enter reason."})
        } else {
            axios.post('http://localhost:5000/leave/', leave)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Leave has been created!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })
                        window.location = '/employee';
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in creating!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })
        }
    }

    clearData = () => {
        this.setState({
            orderId: '',
            date: '',
            supplier: '',
            itemType: '',
            requestedQuantity: ''
        })
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
                                        <form className='px-12 py-6 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>Create Leave</p>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>First Name </label>
                                                    <input type="text"
                                                        // required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.searchCustomer}
                                                        onChange={this.onChangeFirstName}

                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.firstNameError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>last Name </label>
                                                    <input type="text"
                                                        // required
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
                                                        className="form-control"
                                                        value={this.state.empId}
                                                        onChange={this.onChangeEmpId}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.empIdError}</p>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Position</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.position}
                                                        onChange={this.onChangePosition}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.emailError}</p>
                                                </div> */}
                                                </div>
                                                <div class="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>From Date</label>
                                                        <DatePicker
                                                            viewBox="0 0 20 40"
                                                            required
                                                            dateFormat="MMMM dd yyyy"
                                                            selected={this.state.fromD}
                                                            onChange={this.onChangeFromD}
                                                    />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.DateError}</p>
                                                    </div>
                                                    <div className="form-group">
                                                                                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>To Date</label>
                                                        <DatePicker
                                                            viewBox="0 0 20 40"
                                                            required
                                                            dateFormat="MMMM dd yyyy"
                                                            selected={this.state.toD}
                                                            onChange={this.onChangeToD}
                                                    />
                                                            <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.DateError}</p>
                                                    </div>
                                                </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Number Of Days</label>
                                                        <input type="number"
                                                            required
                                                            className="form-control"
                                                            value={this.state.nod}
                                                            onChange={this.onChangeNod}
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.nodError}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Reason</label>
                                                        <input type="text"
                                                            required
                                                            className="form-control"
                                                            value={this.state.reason}
                                                            onChange={this.onChangeReason}
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.reasonError}</p>
                                                    </div>
                                                </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-[#9B804E] hover:bg-[#867556] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Create Leave" />
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