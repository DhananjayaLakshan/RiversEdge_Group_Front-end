import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";

export class CreateEmployee extends Component {
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
        } else if (this.state.firstName.length <= 1) {
            this.setState({ firstNameError: "First Name characters should be more than 1." })
        } else if (this.state.lastName.length <= 1) {
            this.setState({ lastNameError: "Last Name characters should be more than 1." })
        } else if (this.state.phoneNumber.length !== 10) {
            this.setState({ phoneNoError: "Contact Number is invalid." })
        } else if (isNaN(this.state.salary) || this.state.salary <= 0) {
            this.setState({ salaryError: "Please add a valid salary detail." })
        } else if (this.state.position < 1) {
            this.setState({ positionError: "Your position is too short." })
        } else if (this.state.age < 18) {
            this.setState({ ageError: "please add valid age count." })
        } else {
            axios.post('http://localhost:5000/employee/', employee)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Employee has been added!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })
                        window.location = '/employee';
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
    }

    clearData = () => {
        this.setState({
            empId: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            salary: '',
            gender: '',
            position: '',
            age: ''
        })
    }


    render() {
        return (
            <div
                className="col-md-8 bs center mt-2 mb-5"
                style={{ backgroundColor: "#E9E3D3" }}

            >
                <h4
                    style={{
                        fontSize: "30px",
                        color: "#C18239",
                        fontWeight: "bold",
                        marginBottom: "50px",
                    }}
                >
                    Add Employee
                </h4>
                <div class="form-row" >


                    <div class="form-group col-md-6">
                        <label className="formLabel2">Employee ID</label>
                        <input
                            type="text"
                            class="form-control inputFeild"
                            value={this.state.empId}
                            onChange={this.onChangeEmpID}

                        />
                        <p style={{ color: 'red' }}>{this.state.empIDError}</p>
                    </div>

                    <div class="form-group col-md-6">
                        <label className="formLabel2" for="inputPassword4">
                            First Name
                        </label>
                        <input
                            type="email"
                            class="form-control inputFeild"
                            id="inputPassword4"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}

                        />
                        <p style={{ color: 'red' }}>{this.state.firstNameError}</p>
                    </div>

                    <div class="form-group col-md-6">
                        <label className="formLabel2">Last Name</label>
                        <input
                            type="text"
                            class="form-control inputFeild"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                        />
                        <p style={{ color: 'red' }}>{this.state.lastNameError}</p>
                    </div>

                    <div class="form-group col-md-6">
                        <label className="formLabel2" for="inputPassword4">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            class="form-control inputFeild"
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                        />
                        <p style={{ color: 'red' }}>{this.state.phoneNoError}</p>
                    </div>

                    <div class="form-group col-md-12">
                        <label className="formLabel2" for="inputAddress">
                            Position
                        </label>
                        <input
                            type="text"
                            class="form-control inputFeild"
                            id="inputAddress"
                            value={this.state.position}
                            onChange={this.onChangePosition}
                        />
                        <p style={{ color: 'red' }}>{this.state.positionError}</p>
                    </div>

                    <div class="form-group col-md-12">
                        <label className="formLabel2" for="inputAddress">
                            Salary
                        </label>
                        <input
                            type="text"
                            class="form-control inputFeild"
                            id="inputAddress"
                            value={this.state.salary}
                            onChange={this.onChangeSalary}
                        />
                        <p style={{ color: 'red' }}>{this.state.salaryError}</p>
                    </div>

                    <div class="form-group col-md-12">
                        <label className="formLabel2" for="inputAddress">Gender</label>
                        <input type="text"
                            required
                            className="form-control inputFeild"
                            value={this.state.gender}
                            onChange={this.onChangeGender}
                        />
                    </div>
                    <div class="form-group col-md-12">
                        <label className="formLabel2" for="inputAddress">Age</label>
                        <input type="number"
                            required
                            className="form-control inputFeild"
                            value={this.state.age}
                            onChange={this.onChangeAge}
                        />
                        <p style={{ color: 'red' }} className="block text-lg font-medium text-red-900 dark:text-white">{this.state.ageError}</p>
                    </div>


                </div>
                <div className="d-flex justify-content-between mt-5">
                    <button
                        type="submit"
                        class="btn btnColour"
                        style={{ paddingLeft: "20px", paddingRight: "20px" }}
                    >
                        Back
                    </button>
                    <button type="submit" class="btn btnColour" onClick={this.onSubmit}>
                        Create Employee
                    </button>
                </div>
            </div>
        )
    }
}
