import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditEmployee from './employee-edit.component';
import { UilTrashAlt, UilEdit, UilFileGraph } from '@iconscout/react-unicons'

const Employee = props => (
    <tr className="trCSS">
        <td className="tdCSS">{props.employee.empId}</td>
        <td className="tdCSS">{props.employee.firstName} {props.employee.lastName}</td>
        <td className="tdCSS">{props.employee.position}</td>
        <td className="tdCSS">{props.employee.phoneNumber}</td>
        <td className="tdCSS">
            <div class="row">
                <div class="">
                    <button
                        className="btn "
                        style={{ backgroundColor: "#9B804E" }}
                        onClick={() => { props.gotoUpdateEmployee(props.employee._id) }}> 
                        <UilEdit /> </button>
                </div>
                <div class="">
                    <button
                        className="btn ml-2"
                        style={{ backgroundColor: "#3B362E" }}
                        onClick={() => { props.deleteEmployee(props.employee._id) }}>
                        <UilTrashAlt />
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class EmployeeList extends Component {

    constructor(props) {
        super(props);

        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.gotoUpdateEmployee = this.gotoUpdateEmployee.bind(this);

        this.state = {
            employee: [],
            searchEmployee: "",
            show: false
        };
    }

    refreshList() {
        axios.get('http://localhost:5000/employee/')
            .then(response => {
                this.setState({ employee: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    componentDidMount() {
        this.refreshList();
    }

    gotoUpdateEmployee = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("List id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

    deleteEmployee(id) {

        axios.delete('http://localhost:5000/employee/' + id).then(response => {
            console.log(response.status)
            // this.refreshTable();

            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Employee has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                this.refreshList();
            }

            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessfull',
                    text: "Employee has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }
        })
    }

    employeeList() {
        return this.state.employee.map(currentemployee => {
            return <Employee employee={currentemployee} deleteEmployee={this.deleteEmployee} gotoUpdateEmployee={this.gotoUpdateEmployee} key={currentemployee._id} />;
        })
    }

    searchEmployeeList() {
        return this.state.employee.map((currentemployee) => {
            if (this.state.searchEmployee === currentemployee.empId) {
                return (
                    <tr className="trCSS">
                        <td className="tdCSS">{currentemployee.empId}</td>
                        <td className="tdCSS">{currentemployee.firstName}{currentemployee.lastName}</td>
                        <td className="tdCSS">{currentemployee.position}</td>
                        <td className="tdCSS">{currentemployee.phoneNumber}</td>

                        <td className='row'>
                            {
                                <div>
                                    <button
                                        className="btn ml-4"
                                        style={{ backgroundColor: "#9B804E" }}
                                        onClick={() => { this.gotoUpdateEmployee(currentemployee._id) }}>
                                        <UilEdit />
                                    </button>
                                </div>
                            }
                            {"  "}
                            {
                                <div class="">
                                    <button
                                        className="btn ml-2"
                                        style={{ backgroundColor: "#3B362E" }}
                                        onClick={() => {
                                            //Delete the selected record
                                            this.deleteEmployee(currentemployee._id)
                                        }}>
                                        <UilTrashAlt />
                                    </button>
                                </div>
                            }
                        </td>
                    </tr>
                );
            }
        });
    }


    exportEmployee = () => {
        console.log("Export PDF")
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Employee List Report";
        const headers = [["Employee ID", "First Name", "last Name", "Position", "Salary", "Gender", "Age", "Contact Number"]];

        const emp = this.state.employee.map(
            Employee => [
                Employee.empId,
                Employee.firstName,
                Employee.lastName,
                Employee.position,
                Employee.salary,
                Employee.gender,
                Employee.age,
                Employee.phoneNumber
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: emp
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Employee-list.pdf")
    }

    render() {
        return (
            <div >
                <div >
                    <div >
                        <div >
                            <div >
                                <th className='drop-shadow-md'>
                                    <h1
                                        style={{
                                            fontSize: "30px",
                                            color: "#C18239",
                                            fontWeight: "bold",

                                        }}
                                    >Employee List</h1>
                                </th><br />
                                <table className=''>
                                    <tr>
                                        <td className='row'>
                                            <div class="">
                                                <button class="btn btnColour mb-3 ml-3" onClick={() => this.exportEmployee()}>
                                                    Generate Report
                                                </button>
                                            </div>
                                            <div class="">
                                                <input
                                                    className="form-control rounded-lg text-sm mr-2 mb-2"
                                                    style={{ marginLeft: '375px' }}
                                                    type="text"
                                                    placeholder="Search by Employee ID"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchEmployee: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="row col-md-12">
                                <table class="table table-bordered"
                                    style={{ border: "solid 2px #C2BDB8" }} >

                                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                                        <tr>
                                            <th scope="col" className="thCSS" >Employee ID</th>
                                            <th scope="col" className="thCSS" >Name</th>
                                            <th scope="col" className="thCSS" >position</th>
                                            <th scope="col" className="thCSS" >phoneNumber</th>
                                            <th scope="col" className="thCSS" >Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchEmployee == "" ? this.employeeList() : this.searchEmployeeList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    {/* <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                                <p className='font-semibold text-black uppercase '>
                                                    Update Employee
                                                </p>
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header > */}
                                    <Modal.Body className='border-2 rounded-lg shadow-md bg-gray-50'>
                                        <EditEmployee empId={this.state.id} key={this.state.id} close={this.closeModalBox} />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

