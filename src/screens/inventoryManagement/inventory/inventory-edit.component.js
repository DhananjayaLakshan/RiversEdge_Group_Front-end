import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

export default class EditInventory extends Component {
    constructor(props) {
        super(props);
        this.onChangeItemID = this.onChangeItemID.bind(this);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemCategory = this.onChangeItemCategory.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeShortage = this.onChangeShortage.bind(this);
        this.handleBooleanChange = this.handleBooleanChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.invId,
            itemId: '',
            itemName: '',
            itemCategory: '',
            quantity: '',
            location: '',
            shortage: '',
            booleanValue: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/inventory/' + this.state.id)
            .then(response => {
                this.setState({
                    itemId: response.data.itemId,
                    itemName: response.data.itemName,
                    itemCategory: response.data.itemCategory,
                    quantity: response.data.quantity,
                    location: response.data.location,
                    booleanValue: response.data.shortage
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    onChangeItemID(e) {
        this.setState({
            itemId: e.target.value
        });
    }

    onChangeItemName(e) {
        this.setState({
            itemName: e.target.value
        });
    }

    onChangeItemCategory(e) {
        this.setState({
            itemCategory: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }
    onChangeShortage(e) {
        this.setState({
            shortage: e.target.value
        });
    }
    handleBooleanChange = (e) => {
    const value = e.target.value === 'true'; // Convert the string value to a boolean
    this.setState({ booleanValue: value });
    };  


    onSubmit(e) {
        e.preventDefault();

        const inventory = {
            itemId: this.state.itemId,
            itemName: this.state.itemName,
            itemCategory: this.state.itemCategory,
            quantity: this.state.quantity,
            location: this.state.location,
            shortage:  this.state.booleanValue,
        }

        console.log(inventory);

        if (this.state.itemId.length < 3) {
            this.setState({ itemIdError: "Product Id cannot be shorter than 3 digits." })
        }else if (this.state.itemName.length < 3) {
            this.setState({ itemNameError: "Product Name cannot be shorter than 3 digits." })
        }else if (this.state.itemCategory.length == null) {
            this.setState({ itemCategoryError: "Product Category cannot be shorter than 4 digits." })
        } else if (parseInt(this.state.quantity, 10) <= 0) {
            this.setState({ quantityError: "Quantity can not be minus" })
        } else if (this.state.quantity == null) {
            this.setState({ quantityNotNullError: "Quantity can not be zero." })
        }else if (this.state.location == null) {
            this.setState({ locationError: "please add location details." })
        } else {
            axios.put('http://localhost:5000/inventory/' + this.state.id, inventory)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.props.close();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Inventory has been updated!!',
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
        // window.location = '/inventory';
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
                                        <form className='' onSubmit={this.onSubmit}>
                                            <div class="">
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>Edit Inventory</p>
                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Item ID                                                        
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            className="form-control"
                                                            value={this.state.itemId}
                                                            onChange={this.onChangeItemID}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.itemIdError}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Item Name                                                        </label>
                                                        <input type="text"
                                                            required
                                                            className="form-control"
                                                            value={this.state.itemName}
                                                            onChange={this.onChangeItemName}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.itemNameError}</p>
                                                    </div>
                                                    {/* <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                            Item Category                                                         </label>
                                                        <input type="text"
                                                            required
                                                            className="form-control"
                                                            value={this.state.itemCategory}
                                                            onChange={this.onChangeItemCategory}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.categoryError}</p>
                                                    </div> */}

                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                            Item Category
                                                        </label>
                                                        <select type="text"
                                                            className="form-control"
                                                            value={this.state.itemCategory}
                                                            onChange={this.onChangeItemCategory}
                                                        >
                                                            <option value = "null" >Select Size</option>
                                                            <option value="Food">Food</option>
                                                            <option value="Cleaning">Cleaning</option>
                                                            <option value="Clothing">Clothing</option>
                                                            <option value="Electric">Electric</option>
                                                            <option value="Furniture">Furniture</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.itemCategoryError}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Quantity                                                    </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.quantity}
                                                            onChange={this.onChangeQuantity}
                                                            required
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.quantityError}</p>
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.quantityNotNullError}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Location                                                    </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.location}
                                                            onChange={this.onChangeLocation}
                                                            required
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.locationError}</p>
                                                    </div>
                                                    {/* <div className="form-group">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Item Shortage                                                    
                                                        </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.shortage}
                                                            onChange={this.onChangeShortage}
                                                            required
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.locationError}</p>
                                                    </div> */}
                                                    <div>
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Is this item in Shortage
                                                    </label>
                                                    <div>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                value="true"
                                                                checked={this.state.booleanValue === true}
                                                                onChange={this.handleBooleanChange}
                                                            />
                                                            YES
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                value="false"
                                                                checked={this.state.booleanValue === false}
                                                                onChange={this.handleBooleanChange}
                                                            />
                                                            NO
                                                        </label>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="text-center align-middle form-group">
                                                    <input  className="btn "
                                                    style={{ backgroundColor: "#9B804E" }}
                                                    type="submit" value="Add Inventory" />
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