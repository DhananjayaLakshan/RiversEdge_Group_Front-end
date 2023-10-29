import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function FoodOrder() {
    
    const { userId, foodItem, price } = useParams();
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price); // Initialize the total price with the initial price.

    const calculateTotalPrice = (quantity, price) => {
        return quantity * price;
    };

    const updateTotalPrice = (newQuantity) => {
        const newTotalPrice = calculateTotalPrice(newQuantity, price);
        setTotalPrice(newTotalPrice);
    };

    async function Order() {
        const orderDetails = {
            userId,
            userName:user.firstName,
            foodItem,
            itemPrice:price,
            quantity,
            totalPrice,
        };

        console.log(orderDetails);

        try {
            const result = await axios.post('/api/order/addorder', orderDetails);
            Swal.fire('Checked-In', 'Your Order is placed', 'success').then((result) => {
                window.location.href = '/menu';
            });
        } catch (error) {
            console.log(error);
            Swal.fire('Oops!', 'Something went wrong', 'error');
        }
    }

    return (
        <div className="col-md-8 bs center formColour mt-5 mb-5">
            <h4 style={{ fontSize: '50px', color: 'black', fontWeight: 'bold', marginBottom: '50px', textAlign: 'center' }}>
                Food Ordering
            </h4>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label className="formLabel">Food Item</label>
                    <input type="text" class="form-control" value={foodItem} disabled />
                </div>
                <div class="form-group col-md-6">
                    <label className="formLabel" for="inputPassword4">
                        Price
                    </label>
                    <input type="email" class="form-control" id="inputPassword4" value={`Rs.${price}.00`} disabled />
                </div>
                <div class="form-group col-md-6">
                    <label className="formLabel" for="inputPassword4">
                        Quantity
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="inputPassword4"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            updateTotalPrice(e.target.value); // Update total price when the quantity changes.
                        }}
                        required
                    />
                </div>
                <div class="form-group col-md-6">
                    <label className="formLabel">Bill Amount</label>
                    <input type="text" class="form-control" value={`Rs.${totalPrice}.00`} disabled />
                </div>
            </div>
            <div style={{ marginLeft: '850px' }}>
                <button type="submit" class="btn btnColour mt-5 float-sm-end" onClick={Order}>
                    Set Order
                </button>
            </div>
        </div>
    );
}
