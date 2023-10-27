import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import { CreateInventoryOrder } from '../inventoryOrder/inventoryOrders-add.component';

const Inventory = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>

        <td className='px-6 py-4'>{props.inventory.productID}</td>
        <td className='px-6 py-4'>{props.inventory.productName}</td>
        <td className='px-6 py-4'>{props.inventory.productCategory}</td>
        <td className='px-6 py-4'>{props.inventory.quantity}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoOrderInventory(props.inventory._id) }}>

                    <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                        <div class="">
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            

                        </div>
                        <div class="">
                            Order
                        </div>
                    </div>

                </button>
            </div>

        </td>
    </tr>
)

export class InventoryListForOrder extends Component {

    constructor(props) {
        super(props);

        this.gotoOrderInventory = this.gotoOrderInventory.bind(this);

        this.state = {
            inventory: [],
            searchInventory: "",
            show: false
        };
    }


    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        axios.get('http://localhost:5000/inventory/')
            .then(response => {
                this.setState({ inventory: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoOrderInventory(id) {

        this.setState({
            id: id,
            show: true
        })
    }

    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

    inventoryList() {
        return this.state.inventory.map(currentinventory => {
            return <Inventory inventory={currentinventory} orderInventory={this.orderInventory} gotoOrderInventory={this.gotoOrderInventory} key={currentinventory._id} />;
        })
    }

    searchInventoryList() {

        return this.state.inventory.map((currentinventory) => {
            if (
                this.state.searchInventory ==
                currentinventory.productName
            ) {
                return (
                    <tr>

                        <td className='px-6 py-4'>{currentinventory.productID}</td>
                        <td className='px-6 py-4'>{currentinventory.productName}</td>
                        <td className='px-6 py-4'>{currentinventory.productCategory}</td>
                        <td className='px-6 py-4'>{currentinventory.quantity}</td>


                        <td className='px-6 py-4'>
                            {
                                <div class="flex justify-center">
                                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoOrderInventory(currentinventory._id) }}>

                                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                            <div class="">
                                                Order
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


    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className=''>
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <h3>Inventory Details</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Product Name"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchInventory: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Product ID</th>
                                            <th className="p-2 tbhead">Product Name</th>
                                            <th className="p-2 tbhead">productCategory</th>
                                            <th className="p-2 tbhead">Quantity</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchInventory == "" ? this.inventoryList() : this.searchInventoryList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                                <p className='font-semibold text-black uppercase '>
                                                    Order Inventory
                                                </p>
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header >
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <CreateInventoryOrder ioId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

