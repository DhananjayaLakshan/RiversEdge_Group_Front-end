import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import AuthenticationService from "../user/AuthenticationService";

export class CreateFeedback extends Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id:props.fedId,
            firstName:'',
            description:'',
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    componentDidMount() {
        const loggedUserId = AuthenticationService.loggedUserId();
        this.setState({firstName: loggedUserId});
    }
    
    onSubmit(e) {
        e.preventDefault();
        const feedback = {
            firstName: this.state.firstName,
            description: this.state.description,
        }
        console.log(feedback);

        if(this.state.description.length < 10){
            this.setState({descriptionError : "Description should contain more than 10 letters."})
        }else{
            axios.post('http://localhost:5000/customerFeedback/', feedback)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Feedback has been created!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })
                        window.location = '/customerFeedback';
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in adding!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })
        }
    }

    clearData = () => {
        this.setState({
            firstName:'',
            description:''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>Create a FeedBack</p>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >We Value Your comments</label>
                                                    <textarea type="text"
                                                        required
                                                        rows="4" cols="50"
                                                        className="form-control"
                                                        value={this.state.description}
                                                        onChange={this.onChangeDescription}
                                                    /><p className="validateMsg">{this.state.descriptionError}</p>
                                                </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-[#867556] hover:bg-[#6f6148] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Create Feedback" />
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