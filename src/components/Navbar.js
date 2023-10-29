import React from "react";
import logo from '../img/logo.png'
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom"

export default function Navigation() {
    // get user name from currentUser
    const userString = localStorage.getItem('currentUser');
    const user = userString ? JSON.parse(userString) : {}; // Check if userString is not null

    // Ensure user.isAdmin is a boolean
    const isAdmin = user.isAdmin || false

    function logout() {
        // Remove user from local storage 
        localStorage.removeItem('currentUser');
        // Redirect to login page
        window.location.href = '/login';
    }

    let content = null;

    if (isAdmin) {
        content = <li className="nav-item"><a className="nav-link" href="/admin">Admin access</a></li>
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid ">

                    <a className="navbar-brand " href="/" >
                        <img className="logo" src={logo} alt="" />
                        RIVER'S EDGE
                        
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav" >
                        <ul className="navbar-nav ml-auto"> {/* Use ml-auto to push items to the right */}
                            <li className="nav-item navUpList">
                                <a className="nav-link" href="#">
                                    <span className="navUp">About US</span>
                                </a>
                            </li>

                            <li className="nav-item navUpList">
                                <a className="nav-link" href="#">
                                    <span className="navUp">Contact US</span>
                                </a>
                            </li>

                            <li className="nav-item navUpList">
                                <a className="nav-link" href="#">
                                    <span className="navUp">Toll Free No: 0112 211 215</span>
                                </a>
                            </li>

                            {/*if user is logged in display user name and logout, else display register and login buttons*/}
                            {user.firstName ? (
                                <>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <BsPersonFill/> {user.firstName}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            
                                                <a className="dropdown-item" href="/profile">Profile</a>
                                            
                                            {content}
                                            <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">
                                            Register
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">
                                            Login
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav" style={{ marginRight: '150px' }}>
                    <ul className="navbar-nav">
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="/"><span className="navBarDown">Home</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="/roomBooking"><span className="navBarDown">Rooms</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="/packages"><span className="navBarDown">Packages</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="/eventHome"><span className="navBarDown">Events</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="/service"><span className="navBarDown">Services</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="/menu"><span className="navBarDown">Food & bevarage</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
