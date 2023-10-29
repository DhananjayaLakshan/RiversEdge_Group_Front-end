import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'aos/dist/aos.css';
import axios from 'axios';
import './menu.css'
import { Link } from "react-router-dom";



export default function MenuScreen() {

    const [food, setFood] = useState([])
    const [loading, setLoading] = useState()
    const [searchkey, setsearchkey] = useState('')
    const [type, settype]           = useState('all')
    const [dublicateFood, setDublicateFood] = useState([])

    const userID    = JSON.parse(localStorage.getItem('currentUser'))._id


    useEffect(() => {

        async function fetchData() {
            try {
                setLoading(true)
                const response = await axios.get('/api/foods/display')

                setFood(response.data)
                setDublicateFood(response.data)
                setLoading(false)

            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }

        // Fetch data when the component mounts
        fetchData()
    }, [])

    

// Function to filter rooms by search keyword
function filterBySearch() {        

    const tempFood = dublicateFood.filter((fd) =>
        fd.foodItem.toLowerCase().includes(searchkey.toLowerCase())
    )

    setFood(tempFood)
}



// Function to filter rooms by room type
function filterByType(e) {

    if (e !== 'all') {
        
        const tempFood = dublicateFood.filter(
            (fd) => fd.category.toLowerCase() === e.toLowerCase()
        )        
        setFood(tempFood)
    } else {
        setFood(dublicateFood)
    }
}


    return (
        <>
        <br />
        <div
                className="row col-md-10 bs filterBar"
                style={{ margin: '0 auto', float: 'none' }}
            >

                <h4 style={{textAlign:'center'}}>Filter Here</h4>            

                <div className="col-md-3 center"> 
                    <input                        
                        type="text"
                        className="form-control"
                        placeholder="search food item"
                        value={searchkey}
                        onChange={(e) => {
                            setsearchkey(e.target.value)
                        }}
                        onKeyUp={filterBySearch}
                    />
                </div>

                <div className="con-md-3 center" value={type} onChange={(e) => filterByType(e.target.value)}>
                    <select className="form-control">
                        <option value="all">All</option>
                        <option value="ice cream">Ice Cream</option>
                        <option value="pizza">Pizza</option>
                        <option value="rice">Rice</option>
                    </select>
                </div>
            </div>

        <div id='foodContainer'>
            {
                    food.map((fd) => {
                        return (
                            <div class="card bs foodCard" style={{width:'18rem'}} key={fd._id}>
                                
                                <img 
                                src={`/food/${fd.img}`} 
                                class="card-img-top" alt="..."
                                />

                                <div class="card-body">
                                    <h5 class="card-title"><b>{fd.foodItem}</b></h5>
                                    <p class="card-text">Rs.{fd.price}.00</p>
                                    <p class="card-text">{fd.description}</p>

                                <Link to={`/foodOrder/${userID}/${fd.foodItem}/${fd.price}`}>                                    
                                    <button className="btn">Order Now</button>
                                </Link>  

                                </div>
                            </div>                            
                        )
                    })
                }
        </div>
        </>
    )
}
