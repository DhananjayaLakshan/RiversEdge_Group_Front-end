import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditLeave from './leave-edit.component';

const EmpLeave = props => (
    <div class=""></div>
)

export class EmpLeaveList extends Component {

    constructor(props) {
        super(props);

        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.gotoUpdateCustomer = this.gotoUpdateCustomer.bind(this);

        this.state = {
            customer: [],
            searchCustomer: "",
            show:false,
            loggedUserId:""
        };
    }

    refreshList(){
        axios.get('http://localhost:5000/leave/')
        .then(response => {
            this.setState({ customer: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }


    

    gotoUpdateCustomer = (id) => {
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

    deleteCustomer(id) {
        axios.delete('http://localhost:5000/leave/' + id).then(response => {
            console.log(response.status)
            // this.refreshTable();

            if(response.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Customer has been deleted!!",
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
        return this.state.customer.map(currentCustomerFeedback => {
            return <EmpLeave customer={currentCustomerFeedback} deleteCustomer={this.deleteCustomer} gotoUpdateCustomer={this.gotoUpdateCustomer} key={currentCustomerFeedback._id} />;
        })
    }

    searchEmployeeLeave() {
        return this.state.customer.map((currentCustomerFeedback) => {
            if (
                this.state.searchCustomer === currentCustomerFeedback.firstName
            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <div class="block rounded-lg bg-[#f6f6f6] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mb-3">
                            <h5
                                class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                {"Leave On , "+currentCustomerFeedback.fromD.substring(0, 10)+ " To "+ currentCustomerFeedback.toD.substring(0, 10)}
                            </h5>
                            <p class="text-lg text-neutral-950 dark:text-neutral-200">
                                {"Reason "+ currentCustomerFeedback.reason}
                            </p>
                            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                {"Total Days : "+ currentCustomerFeedback.nod}
                            </p>
                            <p class=" text-xl font-extrabold text-center text-neutral-600 dark:text-neutral-200">
                                {"Leave Request Status : "+ currentCustomerFeedback.status}
                            </p>
                            <div class="flex justify-center px-6 py-4 ">
                                <div class="">
                                    
                                <div class="">
                                    {<button className='inline-flex items-center px-2 py-1 mr-1 text-sm font-medium text-white bg-[#9B804E] rounded-md hover:bg-[#75613b]' onClick={() => { this.gotoUpdateCustomer(currentCustomerFeedback._id) }}>
                                            <div class=" grid grid-cols-1 gap-1">
                                                <div class="">
                                                    Edit
                                                </div>
                                            </div>
                                    </button>}
                                </div>
                                
                                </div>
                                <div class="">
                                    
                                <div class="">
                                    {<button className='inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-[#3B362E] rounded-md hover:bg-[#746a5a]'
                                        onClick={() => {
                                                this.deleteCustomer(currentCustomerFeedback._id)
                                        }}>
                                        <div class=" grid grid-cols-1 gap-1">
                                            <div class="">
                                                Delete
                                            </div>
                                        </div>
                                    </button>}
                                </div>
                                </div>
                            </div>
                        </div>
                    </tr>
                );
            }
        });
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-center">
                                <table >
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <h3>My Leave Requests</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-[#867556] hover:bg-[#6f6148] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/createLeave"}>
                                                        Request a Leave
                                                    </Link>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <tbody>
                                        {this.state.searchCustomer == "" ? this.customerList() : this.searchEmployeeLeave()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"lg"}>
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
                                        <EditLeave leaveId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

