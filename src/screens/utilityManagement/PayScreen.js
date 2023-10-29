import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { URL } from "../../App";
import Swal from "sweetalert2";
import Filter from "../../components/Filter";
import * as XLSX from 'xlsx';
import Sidebarr from "../../Admin/Sidebarr"
import { UilTrashAlt, UilEdit, UilFileImport, UilPlus, UilFileGraph, UilFileSearchAlt } from '@iconscout/react-unicons'



function PayScreen() {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.get(`${URL}/api/addPayment`);
                if (response.data.length > 0) {
                    setPayments(response.data);
                    setFilteredPayments(response.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const deletePayment = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(
                        `${URL}/api/addPayment/${id}`
                    );
                    Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );

                    setPayments(payments.filter((payment) => payment._id !== id));
                    setFilteredPayments(
                        filteredPayments.filter((payment) => payment._id !== id)
                    );
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilter = () => {

        const filtered = payments.filter((payment) => {
            if (
                (filterType === "" || payment.department === filterType) &&
                (filterStatus === "" || payment.status === filterStatus)
            ) {
                return true;
            }
            return false;
        });
        setFilteredPayments(filtered);
    };

    const clearFilter = () => {
        setFilterType("");
        setFilterStatus("");
        setFilteredPayments(payments);
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);


        if (query !== "") {
            const filtered = payments.filter((payment) => {
                const amountString = payment.amount ? payment.amount.toString() : "";
                return (
                    (filterType === "" || payment.department === filterType) &&
                    (filterStatus === "" || payment.status === filterStatus) &&
                    (
                        (payment.payid && payment.payid.toLowerCase().includes(query)) ||
                        (payment.type && payment.type.toLowerCase().includes(query)) ||
                        (payment.department && payment.department.toLowerCase().includes(query)) ||
                        (payment.date && payment.date.toLowerCase().includes(query)) ||
                        (amountString && amountString.toLowerCase().includes(query)) ||
                        (payment.status && payment.status.toLowerCase().includes(query))
                    )
                );
            });
            setFilteredPayments(filtered);
        } else {

            setFilteredPayments(payments);
        }
    };


    const generateExcelReport = () => {
        Swal.fire({
            icon: 'Success',
            title: 'Download Started...',
            text: 'Your file is being downloaded',
        })
        const ws = XLSX.utils.json_to_sheet(filteredPayments);

        const totalAmount = filteredPayments.reduce((total, payment) => {
            return total + parseFloat(payment.amount);
        }, 0);

        XLSX.utils.sheet_add_json(
            ws,
            [{ "Payment-ID": "Total Amount", Amount: totalAmount }],
            {
                skipHeader: true,
                origin: -1,
            }
        )
            ;


        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Payments");

        XLSX.writeFile(wb, "payment_report.xlsx");
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Sidebarr />
                    <div className="col-md-10 " style={{ marginLeft: '250px', height: '150vh' }}>


                        <div className="title ">

                            <h1 id="utl">Utility Payment</h1>
                            <Link className="btnColour btn btn-primary mr-1" to="/addpay">
                                <UilPlus />Add Payment
                            </Link>
                            <button
                                className="btn btn-primary ml-2"
                                onClick={generateExcelReport}
                            >
                                <UilFileGraph />Generate Report
                            </button>
                            <input
                                id="search"
                                className=""
                                type="text"
                                placeholder="🔍 Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                                style={{ width: "150px" }}
                            />

                            <button
                                className="btn btnColour btn-primary float-right"
                                onClick={toggleFilter}
                            >
                                <UilFileSearchAlt /> Filter
                            </button>
                        </div>
                        <div className=" float-right mr-3 mt-3" style={{ marginRight: '200px' }}>
                            {showFilter && (
                                <Filter
                                    filterType={filterType}
                                    filterStatus={filterStatus}
                                    setFilterType={setFilterType}
                                    setFilterStatus={setFilterStatus}
                                    handleFilter={handleFilter}
                                    clearFilter={clearFilter}
                                />
                            )}
                        </div>
                        <hr />
                        <br />

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <table border={0} className="table mt-5 tableCSS">
                                    <thead style={{ backgroundColor: "#FCF9EF" }}>
                                        <tr className="trCSS">
                                            <th scope="col" className="thCSS">Payment-ID</th>
                                            <th scope="col" className="thCSS">Type</th>
                                            <th scope="col" className="thCSS">Department</th>
                                            <th scope="col" className="thCSS">Date</th>
                                            <th scope="col" className="thCSS">Amount</th>
                                            <th scope="col" className="thCSS">Status</th>
                                            <th colSpan={3}>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbg">
                                        {filteredPayments.map((payment, index) => (
                                            <tr key={index} className="trCSS">
                                                <td className="tdCSS">{index + 1}</td>
                                                <td className="tdCSS">{payment.type}</td>
                                                <td className="tdCSS">{payment.department}</td>
                                                <td className="tdCSS">
                                                    {new Date(payment.date).toLocaleDateString()}
                                                </td>
                                                <td className="tdCSS">Rs.{payment.amount}</td>
                                                <td className="tdCSS">
                                                    <b>{payment.status}</b>

                                                </td>
                                                <td className="tdCSS">
                                                    <Link
                                                        className="btnColour btn btn-primary"
                                                        to={`/view/${payment._id}`}
                                                    >
                                                        <UilFileImport />
                                                    </Link>
                                                </td>
                                                <td className="tdCSS">
                                                    <button
                                                        className="btn"
                                                        onClick={() => deletePayment(payment._id)}
                                                    >
                                                        <UilTrashAlt />
                                                    </button>
                                                </td>
                                                <td className="tdCSS">
                                                    <Link
                                                        className="btnColour btn btn-primary"
                                                        to={`/update/${payment._id}`}
                                                    >
                                                        <UilEdit />

                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

    );
}

export default PayScreen;
