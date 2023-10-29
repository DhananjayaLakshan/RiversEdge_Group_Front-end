import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function UpdateOrder() {
    const { id } = useParams()

    const [order, setorder] = useState({
        id: id,
        userId: '',
        userName: '',
        itemPrice:'',
        foodItem: '',
        quantity: '',
        totalPrice: '',
        status: ''

    })


    console.log(order.id);

    console.log(order);

    

    function calTotal(){
        let quantity = order.quantity;
        let totalPrice = quantity*order.itemPrice

        return totalPrice;
    }
    
    order.totalPrice = calTotal()

    


    const { userId, foodItem, price } = useParams();
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const [quantity, setQuantity] = useState(1);

    
    useEffect(() => {
        async function fetchData() {
            try {
                axios.post('/api/order/getorderbyid ', { orderid: id })
                    .then(res => setorder({
                        ...order,
                        userId: res.data.userId,
                        userName: res.data.userName,
                        foodItem: res.data.foodItem,
                        itemPrice: res.data.itemPrice,
                        quantity: res.data.quantity,
                        totalPrice: res.data.totalPrice,
                        status: res.data.status,
                    }))
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    console.log(order);
    

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     try {

    //         const formData = new FormData();
    //         formData.append('name', room.name);
    //         formData.append('rentperday', room.rentperday);
    //         formData.append('type', room.type);
    //         formData.append('maxcount', room.maxcount);
    //         formData.append('phonenumber', room.phonenumber);
    //         formData.append('description', room.description);

    //         axios.put(`/api/rooms/updateRoom/${roomid}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data', // Set the content type for file uploads
    //             },
    //         });

    //         Swal.fire('Updated', 'Room details has been successful', 'success').then(result => {
    //             navigate('/admin')
    //         })

    //     } catch (error) {

    //         console.error('Failed to update room:', error)
    //         Swal.fire('Oops!', 'Something went wrong', 'error')
    //     }


    // }

    const navigate = useNavigate()   

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            console.log(order)

            axios.put(`/api/order/updateOrder/${order.id}`,order)
            Swal.fire('Updated', 'Event details has been successful', 'success').then(result => {
                navigate('/order')})
        }catch(err){
            console.error('Failed to update Event:', err)
            Swal.fire('Oops!', 'Something went wrong', 'error')
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
                    <input type="text" class="form-control" value={order.foodItem}
                        disabled />
                </div>

                <div class="form-group col-md-6">
                    <label className="formLabel" for="inputPassword4">
                        Quantity
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="inputPassword4"
                        value={order.quantity}
                        onChange={e => setorder({ ...order, quantity: e.target.value },
                            calTotal)}
                        required
                    />
                </div>

                <input type="text"
                    style={{ display: 'none' }}
                />

            </div>
            <div style={{ marginLeft: '850px' }}>
                <button type="submit" class="btn btnColour mt-5 float-sm-end" onClick={handleSubmit}>
                    Set Order
                </button>
            </div>
        </div>
    )
}
