import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { BsCalendar2Week, BsPersonFill, BsBookmarkStarFill, BsGraphDown, BsStack, BsPeopleFill } from "react-icons/bs";
import { IoRestaurant } from "react-icons/io5";

export default function Sidebarr() {
    return (

        <div id="nav-bar" style={{ marginTop:'163px' }}>
            <input id="nav-toggle" type="checkbox" />
            <div id="nav-header">
                
                <a id="nav-title" href="#" target="_blank">
                    <i className="fab fa-codepen" />
                    RIVER'S EDGE
                </a>
                
                <hr />
            </div>
            <div id="nav-content">

                <div className="nav-button" style={{marginLeft:'55px'}}>
                    <Link to='/admin'>                        
                        <span> <BsCalendar2Week/> BOOKINGS</span>                    
                    </Link>
                </div>

                <div className="nav-button" style={{marginLeft:'55px'}}>
                    <Link to='/event'> 
                        <span><BsBookmarkStarFill/>EVENTS</span>
                    </Link>
                </div>

                <div className="nav-button" style={{marginLeft:'55px'}}>    
                <Link to='/user'> 
                    <span><BsPersonFill/>USERS</span>
                    </Link>
                </div>

                <hr />

                <div className="nav-button" style={{marginLeft:'55px'}}>   
                    <Link to='/payment'>                   
                        <span><BsGraphDown/>UTILITY</span>
                    </Link>
                </div>

                <div className="nav-button" style={{marginLeft:'55px'}}>
                <Link to='/inventory'> 
                    <span><BsStack/>INVENTORY</span>
                </Link>
                </div>

                <div className="nav-button" style={{marginLeft:'55px'}}>
                    <Link to='/employee'>
                        <span><BsPeopleFill/>EMPLOYEE</span>
                    </Link>
                </div>

                <div className="nav-button" style={{marginLeft:'55px'}}>
                    <Link to='/order'>
                        <span><IoRestaurant/>FOOD & BEVERAGE</span>
                    </Link>    
                </div>

                <hr />

                
                
                <div id="nav-content-highlight" />
            </div>
            
            
        </div>


    )
}
