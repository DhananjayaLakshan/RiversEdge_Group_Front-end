import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import * as Swal from "sweetalert2";
const shortid = require('shortid');

// import "react-datepicker/dist/react-datepicker.css"

export class CreateInventoryOrder extends Component {
    constructor(props) {
        super(props);
        this.onChangeOrderId = this.onChangeOrderId.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeSupplier = this.onChangeSupplier.bind(this);
        this.onChangeItemType = this.onChangeItemType.bind(this);
        this.onChangeRequestedQuantity = this.onChangeRequestedQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.ioId,
            orderId: '',
            date: '',
            supplier: '',
            itemType: '',
            requestedQuantity: ''
        }
    }

    onChangeOrderId(e) {
        this.setState({
            orderId: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    onChangeSupplier(e) {
        this.setState({
            supplier: e.target.value
        });
    }

    onChangeItemType(e) {
        this.setState({
            itemType: e.target.value
        });
    }

    onChangeRequestedQuantity(e) {
        this.setState({
            requestedQuantity: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const inventoryOrder = {
            orderId: this.state.orderId,
            date: this.state.date,
            supplier: this.state.supplier,
            itemType: this.state.itemType,
            requestedQuantity: this.state.requestedQuantity,
        }

        console.log(inventoryOrder);

        if (!this.state.orderId) {
            this.setState({ orderIdError: "order Id cannot be null" })
        }else if (this.state.date.length < 4) {
            this.setState({ dateError: "Please select the date" })
        }else if (this.state.supplier.length < 5) {
            this.setState({ supplierError: "Supplier Name cannot be shorter than 5 letters." })
        }else if (this.state.itemType.length < 4) {
            this.setState({ itemTypeError: "Product Category cannot be shorter than 4 digits." })
        }else if(this.state.requestedQuantity <= 0){
            this.setState({requestedQuantityError : "Quantity can not be zero 0 minus."})
        } else {
            axios.post('http://localhost:5000/inventoryOrders/', inventoryOrder)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Inventory Order has been created!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })
                        window.location = '/inventoryorder';
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
            <div >
                <div className="flex flex-col px-5 ">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className='items-center overflow-hidden'>
                                <div className=''>
                                    <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                        <form className='px-12 py-6 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                            <div class="">
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>Create an Order</p>
                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Order ID</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            className="form-control"
                                                            value={this.state.orderId}
                                                            onChange={this.onChangeOrderId}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.orderIdError}</p>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Placed Date
                                                    </label>
                                                    <DatePicker
                                                            viewBox="0 0 20 40"
                                                            required
                                                            dateFormat="MMMM d, yyyy"
                                                            selected={this.state.date}
                                                            onChange={this.onChangeDate}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.dateError}</p>
                                                </div>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                        Product Supplier
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        
                                                        className="form-control"
                                                        value={this.state.supplier}
                                                        onChange={this.onChangeSupplier}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.supplierError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Item Type                                                 </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        
                                                        value={this.state.itemType}
                                                        onChange={this.onChangeItemType}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.itemTypeError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Requested Quantity                                                    </label>
                                                    <input 
                                                        type="number"
                                                        className="form-control"
                                                        value={this.state.requestedQuantity}
                                                        onChange={this.onChangeRequestedQuantity}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.requestedQuantityError}</p>
                                                </div>
                                                <div className="text-center align-middle form-group">
                                                    <input className='text-white bg-[#9B804E] hover:bg-[#867556] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Order Inventory" />
                                                </div>
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