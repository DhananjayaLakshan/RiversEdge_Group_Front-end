import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditLeave from './leave-edit.component';
import AdminEditLeave from './admin-leave-edit.component';
// import  EditCustomer  from './customer-edit.component';

const Leave = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='px-6 py-4'>{props.leave.firstName+" "+props.leave.lastName}</td>
        <td className='px-6 py-4'>{props.leave.fromD.substring(0, 10)+"_ To _"+props.leave.toD.substring(0, 10)}</td>
        {/* <td className='px-6 py-4'>{props.leave.position}</td> */}
        <td className='px-6 py-4'>{props.leave.nod}</td>
        <td className='px-6 py-4'>{props.leave.reason}</td>
        <td className='px-6 py-4'>{props.leave.status}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-[#9B804E] rounded-md hover:bg-[#75613b]' onClick={() => { props.gotoUpdateLeave(props.leave._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                    </svg>
                        </div>
                        <div class="">
                            Edit
                        </div>
                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-[#3B362E] rounded-md hover:bg-[#746a5a]' onClick={() => { props.deleteLeave(props.leave._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div class="">
                            Delete
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class LeaveList extends Component {
    constructor(props) {
        super(props);

        this.deleteLeave = this.deleteLeave.bind(this);
        this.gotoUpdateLeave = this.gotoUpdateLeave.bind(this);

        this.state = {
            leave: [],
            searchLeave: "",
            show:false
        };
    }

    refreshList(){
        axios.get('http://localhost:5000/leave/')
        .then(response => {
            this.setState({ leave: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }


    componentDidMount() {
        this.refreshList();
    }

    gotoUpdateLeave = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" +id);
    }

    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

    deleteLeave(id) {
        axios.delete('http://localhost:5000/leave/' + id).then(response => {
            console.log(response.status)
            if(response.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Customer leave has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })
                this.refreshList();
            }
            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessful',
                    text: "Customer has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }
        })
    }

    customerList() {
        return this.state.leave.map(currentleave => {
            return <Leave leave={currentleave} deleteLeave={this.deleteLeave} gotoUpdateLeave={this.gotoUpdateLeave} key={currentleave._id} />;
        })
    }

    searchCustomerList() {
        return this.state.leave.map((currentleave) => {
            if (
                this.state.searchLeave === currentleave.firstName
            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4'>{currentleave.firstName+" "+currentleave.lastName}</td>
                        <td className='px-6 py-4'>{currentleave.fromD.substring(0, 10)+"_ To _"+currentleave.toD.substring(0, 10)}</td>
                        <td className='px-6 py-4'>{currentleave.position}</td>
                        <td className='px-6 py-4'>{currentleave.nod}</td>
                        <td className='px-6 py-4'>{currentleave.reason}</td>
                        <td className='px-6 py-4'>{currentleave.status}</td>
                        {/* <td className='px-6 py-4'>{currentleave.country}</td> */}
                        {/* <td className='px-6 py-4'>{currentleave.pass}</td>
                        <td className='px-6 py-4'>{currentleave.cPass}</td> */}
                        <td className='flex justify-center px-6 py-4 '>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-[#9B804E] rounded-md hover:bg-[#75613b]' onClick={() => { this.gotoUpdateLeave(currentleave._id) }}>
                                            <div class=" grid grid-cols-2 gap-1">
                                                <div class="">
                                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                    </svg>
                                                </div>
                                                <div class="">
                                                    Edit
                                                </div>
                                            </div>
                                    </button>
                                </div>
                            }
                            {"  "}
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3B362E] rounded-md hover:bg-[#746a5a]'
                                        onClick={() => {
                                                this.deleteLeave(currentleave._id)
                                        }}>
                                        <div class=" grid grid-cols-2 gap-1">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                Delete
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            }
                        </td>
                    </tr>
                );
            }
        });
    }


    exportLeave = () => {
        console.log( "Export PDF" )
        const unit = "pt";
        const size = "A3"; 
        const orientation = "portrait"; 
        const marginLeft = 40;
        const doc = new jsPDF( orientation, unit, size );

        const title = "Employee Leave Report ";
        const headers = [["First Name","Last Name","Employee ID","Position","from","To","Leave Days","Reason", "Status"]];
        const cus = this.state.leave.map(
            Customer=>[
                Customer.firstName,
                Customer.lastName,
                Customer.empId,
                // Customer.position,
                Customer.fromD.substring(0, 10),
                Customer.toD.substring(0, 10),
                Customer.nod,
                Customer.reason,
                Customer.status
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body:cus
        };
        doc.setFontSize( 20 );
        doc.text( title, marginLeft, 40 );
        require('jspdf-autotable');
        doc.autoTable( content );
        doc.save( "Employee-Leave-list.pdf" )
    }


    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table >
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <h3>Employee Leave Requests</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-[#867556] hover:bg-[#6f6148] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/createLeave"}>
                                                        Create Leave
                                                    </Link></button>
                                                <button class="text-white bg-[#867556] hover:bg-[#6f6148] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportLeave()}>
                                                        Generate Report
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Name"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchLeave: e.target.value
                                                        });
                                                    }} />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Customer Name</th>
                                            <th className="p-2 tbhead">From - To</th>
                                            {/* <th className="p-2 tbhead">Position</th> */}
                                            <th className="p-2 tbhead">Leave Days</th>
                                            <th className="p-2 tbhead">Reason</th>
                                            <th className="p-2 tbhead">Status</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.searchLeave == "" ? this.customerList() : this.searchCustomerList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    {/* <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                                <p className='font-semibold text-black uppercase '>
                                                    Edit Customer
                                                </p>
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header > */}
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <AdminEditLeave leaveId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

