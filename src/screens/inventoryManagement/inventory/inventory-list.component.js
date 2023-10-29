import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditInventory from './inventory-edit.component'
import { UilTrashAlt, UilEdit, UilFileGraph } from '@iconscout/react-unicons'

const Inventory = props => (
    <tr className="trCSS">
        <td className='tdCSS'>{props.inventory.itemId}</td>
        <td className='tdCSS'>{props.inventory.itemName}</td>
        <td className='tdCSS'>{props.inventory.itemCategory}</td>
        <td className='tdCSS'>{props.inventory.quantity}</td>
        <td className='tdCSS'>{props.inventory.location}</td>
        <td className='tdCSS'>
        <div class="gap-2">
        <input
            class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchChecked"
            checked={props.inventory.shortage === true} />
        </div>
            
        </td>
        <td className='px-6 py-4'>
            <div class="ml-5 row">
                <div class="">
                    <button 
                    className="btn "
                    style={{ backgroundColor: "#9B804E" }}
                    onClick={() => { props.gotoUpdateInventory(props.inventory._id) }}>                        
                        <UilEdit />
                    </button>
                </div>

                <div class="">
                    <button 
                    className="btn ml-2"
                    style={{ backgroundColor: "#3B362E" }}
                    onClick={() => { props.deleteInventory(props.inventory._id) }}>
                    <UilTrashAlt />
                    </button>
                </div>

            </div>
        </td>
    </tr>
)

export class InventoryList extends Component {

    constructor(props) {
        super(props);

        this.deleteInventory = this.deleteInventory.bind(this);
        this.gotoUpdateInventory = this.gotoUpdateInventory.bind(this);
        this.handleBooleanChange = this.handleBooleanChange.bind(this);

        this.state = {
            inventory: [],
            searchInventory: "",
            show:false
        };
    }

    handleBooleanChange = (e) => {
    const value = e.target.value === 'true'; // Convert the string value to a boolean
    this.setState({ booleanValue: value });
    }; 

    componentDidMount() {
        this.refreshList();
    };
    
    // Get item list from database--------------------
    refreshList(){
        axios.get('http://localhost:5000/inventory')
        .then(response => {
            this.setState({ inventory: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    gotoUpdateInventory = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" +id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

    //Delete Item---------------------------
    deleteInventory(id) {
        axios.delete('http://localhost:5000/inventory/' + id).then(response => {
            console.log(response.status)
            // this.refreshTable();

            if(response.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Inventory has been deleted!!",
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
                    text: "Inventory has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }
        })
}

    inventoryList() {
        return this.state.inventory.map(currentInventory => {
            return <Inventory inventory={currentInventory} deleteInventory={this.deleteInventory} gotoUpdateInventory={this.gotoUpdateInventory} key={currentInventory._id} />;
        })
    }

//Search item---------------------------------
    searchInventoryList() {
        return this.state.inventory.map((currentInventory) => {
            if (
                this.state.searchInventory === currentInventory.itemId
            ) {
                return (
                    <tr className="trCSS">

                        <td className='tdCSS'>{currentInventory.itemId}</td>
                        <td className='tdCSS'>{currentInventory.itemName}</td>
                        <td className='tdCSS'>{currentInventory.itemCategory}</td>
                        <td className='tdCSS'>{currentInventory.quantity}</td>
                        <td className='tdCSS'>{currentInventory.location}</td>
                        <td className='tdCSS'>
                            <div class="gap-2">
                                NO<input
                                    class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchChecked"
                                    checked={currentInventory.shortage === true} />YES
                            </div>    
                        </td>
                        <td className='row '>
                        
                            {
                                <div class="">
                                    <button
                                    className="btn ml-4"
                                        style={{ backgroundColor: "#9B804E" }}
                                        onClick={() => { this.gotoUpdateInventory(currentInventory._id) }}>
                                    <UilEdit />                                                                  
                                    </button>
                                </div>
                            }
                            {"  "}
                            {
                                <div class="">
                                    <button className="btn ml-2"
                                        style={{ backgroundColor: "#3B362E" }}
                                        onClick={() => {
                                            //Delete the selected record
                                            this.deleteInventory(currentInventory._id)
                                        }}
                                    >
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

//Export to pdf-----------------------------------------
    exportInventory = () => {
        console.log( "Export PDF" )


        const unit = "pt";
        const size = "A3"; 
        const orientation = "landscape"; 
        const marginLeft = 40;
        const doc = new jsPDF( orientation, unit, size );

        const title = "Inventory List Report ";
        const headers = [["Product ID","Product Name","Product Category","Quantity", "Location", "Shortage"]];

        const inv = this.state.inventory.map(
            Inventory=>[
                Inventory.itemId,
                Inventory.itemName,
                Inventory.itemCategory,
                Inventory.quantity,
                Inventory.location,
                Inventory.shortage
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body:inv
        };
        doc.setFontSize( 20 );
        doc.text( title, marginLeft, 40 );
        require('jspdf-autotable');
        doc.autoTable( content );
        doc.save( "Inventory-list.pdf" )
    }


    render() {
        return (
            <div >
                <div>
                    <div>
                        <div>
                            <div>
                                        <th className='drop-shadow-md'>
                                        <h1
                                        style={{
                                            fontSize: "30px",
                                            color: "#C18239",
                                            fontWeight: "bold",

                                        }}
                                        >Inventory Details</h1>
                                        </th>
                                <table>
                                    <tr>
                                        <td className='row'>
                                            <div className='' style={{marginTop:'50px', marginLeft:'0'}}>
                                                
                                            <button class="btn btnColour mb-3 ml-3" onClick={() => this.exportInventory()}>
                                                    Download Report Here
                                                </button>
                                            </div>
                                            <div >
                                                <input
                                                    className="form-control rounded-lg text-sm mr-2 mb-2"
                                                    style={{ marginLeft: '355px', marginTop:'50px' }}
                                                    type="text"
                                                    placeholder="Search by Item ID"
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
                            <div className="row col-md-12">
                                <table 
                                class="table table-bordered"
                                style={{ border: "solid 2px #C2BDB8" }} >
                                    <thead  style={{ backgroundColor: "#FCF9EF" }}>
                                        <tr>
                                            <th scope="col" className="thCSS" >Item ID</th>
                                            <th scope="col" className="thCSS" >Item Name</th>
                                            <th scope="col" className="thCSS" >Item Category</th>
                                            <th scope="col" className="thCSS" >Quantity</th>
                                            <th scope="col" className="thCSS" >Item Location</th>
                                            <th scope="col" className="thCSS" >Item Shortage</th>
                                            <th scope="col" className="thCSS" >Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchInventory == "" ? this.inventoryList() : this.searchInventoryList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    {/* <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                        </div>
                                    </Modal.Header > */}
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <EditInventory invId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

