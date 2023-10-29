import React, { useEffect, useState } from "react"
import axios from "axios"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UilEdit, UilFileGraph } from '@iconscout/react-unicons'
import { Link } from "react-router-dom"


export default function OrderList() {

    const [orders, setOrders] = useState([])
    const [searchkey, setsearchkey] = useState('')
    const [duplicateOrder, setDuplicateOrder] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            try {

                const response = await axios.get('api/order/display');
                setOrders(response.data);
                setDuplicateOrder(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchBookings();
    }, []);

    //search function
    function filterBySearch() {
        const tempOrder = duplicateOrder.filter((order) =>
            order.userName.toLowerCase().includes(searchkey.toLowerCase())
        );

        setOrders(tempOrder);
    }

    const generatePdfReport = () => {
        const doc = new jsPDF();
        doc.text('Order Report', 15, 15);

        const tableData = orders.map((order) => [
            order._id,
            order.userId,
            order.userName, // Updated to "userName"
            order.foodItem,
            order.quantity,
            `Rs.${order.totalPrice}.00`,
        ]);

        doc.autoTable({
            head: [['OrderID', 'UserID', 'User Name', 'Food Item', 'Quantity', 'TotalBill']], // Updated column headers
            body: tableData,
        });

        doc.save('order_report.pdf');
    };

    let orderid

    return (
        <div className="row">
            <div className="col-md-12">
                <h1
                    style={{
                        fontSize: "30px",
                        color: "#C18239",
                        fontWeight: "bold",
                    }}
                >
                    Orders List
                </h1>
                <br />

                <div className="row">

                    <div className="col-md-6">
                        <button
                            onClick={generatePdfReport}
                            className="btn btnColour"
                        >
                            <UilFileGraph />
                            Generate PDF Report
                        </button>
                    </div>

                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by First Name"
                                value={searchkey}
                                onChange={(e) => setsearchkey(e.target.value)}
                                onKeyUp={filterBySearch}
                            />
                        </div>
                    </div>


                </div>

                <table
                    className="table table-bordered"
                    style={{ border: "solid 2px #C2BDB8" }}
                >
                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                        <tr>
                            <th scope="col">OrderID</th>
                            <th scope="col">UserID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Food Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">TotalBill</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E9E3D3" }}>
                        {orders.length &&
                            orders.map((order) => {
                                return (
                                    <tr>
                                        <td>{orderid = order._id}</td>
                                        <td>{order.userId}</td>
                                        <td>{order.userName}</td>
                                        <td>{order.foodItem}</td>
                                        <td>{order.quantity}</td>
                                        <td>Rs.{order.totalPrice}.00</td>
                                        <td>
                                            <Link to={`/orderUpdate/${orderid}`}>
                                                <button
                                                    className="btn ml-4"
                                                    style={{ backgroundColor: "#9B804E" }}
                                                >
                                                    <UilEdit />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
