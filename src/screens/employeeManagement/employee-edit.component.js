import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

export default class  EditEmployee extends Component {

    constructor(props) {
        super(props);
        this.onChangeEmpID = this.onChangeEmpID.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);    
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.empId,
            empId: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            salary: '',
            gender: '',
            position: '',
            age: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/employee/' + this.state.id)
            .then(response => {
                this.setState({
                    empId: response.data.empId,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phoneNumber: response.data.phoneNumber,
                    salary: response.data.salary,
                    gender: response.data.gender,
                    position: response.data.position,
                    age: response.data.age,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeEmpID(e) {
        this.setState({
            empId: e.target.value
        });
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
    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }

    onChangeSalary(e) {
        this.setState({
            salary: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangePosition(e) {
        this.setState({
            position: e.target.value
        });
    }
    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const employee = {
            empId: this.state.empId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            position: this.state.position,
            salary: this.state.salary,
            gender: this.state.gender,
            age: this.state.age,
            phoneNumber: this.state.phoneNumber,
        }
        console.log(employee);
        if (this.state.empId.length != 6) {
            this.setState({ empIDError: "Employee ID should be 6 characters." })
        }else if (this.state.firstName.length <= 1) {
            this.setState({ firstNameError: "First Name characters should be more then 1." })
        }else if (this.state.lastName.length <= 1) {
            this.setState({ lastNameError: "Last Name characters should be more then 1." })
        }else if (this.state.phoneNumber.length !== 10) {
            this.setState({ phoneNoError: "Contact Number is invalid." })
        } else if (isNaN(this.state.salary) || this.state.salary <= 0) {
            this.setState({ salaryError: "Please add a valid salary detail." })
        } else if (this.state.position < 1) {
            this.setState({ positionError: "Your position is too short." })
        } else if (this.state.age < 18) {
            this.setState({ ageError: "please add valid age count." })
        }else {

            axios.put('http://localhost:5000/employee/' + this.state.id, employee)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {

                        this.props.close();

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Employee has been updated!',
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
        }
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
                                        <h3 className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                    Update Employee</h3>
                                            <div class="form-row" >
                                            
                                            <div class="form-group col-md-6">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Employee ID </label>
                                                    <input type="text"
                                                        // required
                                                        className="form-control"
                                                        value={this.state.empId}
                                                        onChange={this.onChangeEmpID}

                                                    /> <p className="block text-lg font-medium text-red-900 dark:text-white" style={{color:'red'}}>{this.state.empIDError}</p>
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >First Name</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white" style={{color:'red'}}>{this.state.firstNameError}</p>
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Last Name</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white" style={{color:'red'}}>{this.state.lastNameError}</p>
                                                </div>
                                            
                                            
                                                <div class="form-group col-md-6">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Contact Number</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.phoneNumber}
                                                        onChange={this.onChangePhoneNumber}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white" style={{color:'red'}}>{this.state.phoneNoError}</p>
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Position</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.position}
                                                        onChange={this.onChangePosition}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white" style={{color:'red'}}>{this.state.positionError}</p>
                                                </div>
                                            
                                           
                                                <div class="form-group col-md-6">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">Salary</label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    value={this.state.salary}
                                                    onChange={this.onChangeSalary}
                                                />
                                                <p className="block text-lg font-medium text-red-900 dark:text-white" style={{color:'red'}}>{this.state.salaryError}</p>

                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Gender</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.gender}
                                                        onChange={this.onChangeGender}
                                                    />
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Age</label>
                                                    <input type="number"
                                                        required
                                                        className="form-control"
                                                        value={this.state.age}
                                                        onChange={this.onChangeAge}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white" style={{color:'red'}}>{this.state.ageError}</p>
                                                </div>
                                                <p />

                                            
                                            </div>

                                            <div className="text-center align-middle form-group">
                                                <input 
                                                    className="btn "
                                                    style={{ backgroundColor: "#9B804E" }}
                                                    type="submit" value="Edit Employee" />
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