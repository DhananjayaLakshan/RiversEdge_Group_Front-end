import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";

export class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangeuserRole = this.onChangeuserRole.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangecpassword = this.onChangecpassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            NIC: '',
            userRole: '',
            password: '',
            cpassword: ''
        }
    }

    onChangeNIC(e) {
        this.setState({
            NIC: e.target.value
        });
    }

    onChangeuserRole(e) {
        this.setState({
            userRole: e.target.value
        });
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangecpassword(e) {
        this.setState({
            cpassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.NIC) {

            this.setState({ nicError: "Please enter a valid NIC" })
        }

        else if (this.state.password !== this.state.cpassword) {

            this.setState({ passwordError: "Passwords does not macth." })
        }

        else {

            const user = {
                NIC: this.state.NIC,
                userRole: this.state.userRole,
                password: this.state.password
            }

            console.log(user);

            axios.post('http://localhost:5000/user/', user)
                
                .then(res => {

                    console.log(res);

                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'User has been registered!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in adding!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })

        }



        // }
    }

    clearData = () => {
        this.setState({
            NIC: '',
            userRole: '',
            password: '',
            cpassword: '',
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">

                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>

                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>
                                            Sign Up
                                        </p>

                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>NIC </label>
                                            <input type="text"
                                                required
                                                className="form-control "
                                                value={this.state.NIC}
                                                onChange={this.onChangeNIC}
                                            /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.nicError}</p>
                                        </div>
                                       
                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>User Role </label>
                                            <select type="text"
                                                required
                                                className="form-control"
                                                value={this.state.userRole}
                                                onChange={this.onChangeuserRole}
                                            >
                                                <option>Select From Here</option>
                                                <option>Employee Manager</option>
                                                <option>Customer Manager</option>
                                                <option>Waiter Staff</option>
                                                <option>Head Chef</option>
                                                <option>Inventory Manager</option>
                                                <option>Delivery Manager</option>
                                                <option>Product Manager</option>
                                                <option>Finance Manager</option>
                                                <option>Super Admin</option>

                                            </select>


                                            <p />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Password </label>
                                                <input type="password"
                                                    required
                                                    className="form-control"
                                                    value={this.state.password}
                                                    onChange={this.onChangepassword}
                                                /><p />
                                            </div>
                                         

                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Confirm Password </label>
                                                <input type="password"
                                                    required
                                                    className="form-control"
                                                    value={this.state.cpassword}
                                                    onChange={this.onChangecpassword}
                                                /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.passwordError}</p>
                                            </div>
                                        </div>

                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Sign Up" />
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}