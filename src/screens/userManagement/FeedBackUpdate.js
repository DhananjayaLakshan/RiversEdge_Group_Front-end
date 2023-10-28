import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function
    () {

        const {id} = useParams()

    const [feedback,setFeedback] = useState({
        id: id,
        description:''
    })
    
    useEffect(() => {

        async function fetchData() {
            try {                
                
                axios.post('/api/feedback/getfeedbackbyid', { id: id })
                .then(res => setFeedback({
                    ...feedback, 
                    description: res.data.description
                    }))

            } catch (error) {                
                console.log(error);
            }
        }
        fetchData();    
    }, [])
            
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const updatedFeedback = { description: feedback.description };
    
            const response = await axios.put(`/api/feedback/updateFeedBack/${id}`, updatedFeedback);
    
                Swal.fire('Updated', 'Feedback has been successfully updated', 'success').then(result => {
                    navigate('/profile')})

        } catch (error) {
            console.error('Failed to update feedback:', error);
            Swal.fire('Oops!', 'Something went wrong', 'error');
        }
    };

    return (
        <div class="mb-3 center"  style={{width:'50%'}}>
            
            <h1 class="display-6">FeedBack</h1>
            <textarea
                class="form-control"
                id="validationTextarea"
                required

                value={feedback.description} 
                onChange={e => setFeedback({...feedback, description:e.target.value})}


            ></textarea>
            <button class="btn btnColour mt-3" onClick={handleSubmit}>Update FeedBack</button>
        </div>
    )
}
