import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ToastMessage from '../components/ToastMessage'

const API_URL = 'https://todo-server-gfv3.vercel.app'

function SignUp() {
    const initUserInput = {
        username: '',
        full_name: '',
        email: '',
        pass: ''
    }
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState(initUserInput);

    const handleSignUp = async () => {
        await axios.post(`${API_URL}/api/user/create`, userInput)
        .then(res => {
            if (res.data.statusCode === 200) {
                toast.success(res.data.responseData)
                setTimeout(() => {
                    navigate('/signin');
                }, 2000)
            } else {
                toast.warn(res.data.responseData)
            }
        })
        .catch(err => toast.error(err))
    }

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'hidden',
            }}
        >
            <MDBContainer fluid className='my-5'>
                <MDBRow className='g-0 align-items-center'>
                    <MDBCol col='6'>

                        <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>

                            <h2 className="fw-bold mb-5">Sign up now</h2>

                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput 
                                        wrapperClass='mb-4' 
                                        label='User name' 
                                        id='form1' 
                                        type='text'
                                        name="username"
                                        value={userInput.username}
                                        onChange={(e) => setUserInput(prev => {
                                            return {
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }
                                        })}
                                    />
                                </MDBCol>

                                <MDBCol col='6'>
                                    <MDBInput 
                                        wrapperClass='mb-4' 
                                        label='Full name' 
                                        id='form2' 
                                        type='text'
                                        name="full_name"
                                        value={userInput.full_name}
                                        onChange={(e) => setUserInput(prev => {
                                            return {
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }
                                        })}
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBInput 
                                wrapperClass='mb-4' 
                                label='Email' 
                                id='form3' 
                                type='email'
                                name="email"
                                value={userInput.email}
                                onChange={(e) => setUserInput(prev => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }
                                })}
                            />
                            <MDBInput 
                                wrapperClass='mb-4' 
                                label='Password' 
                                id='form4' 
                                type='password'
                                name="pass"
                                value={userInput.pass}
                                onChange={(e) => setUserInput(prev => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }
                                })}
                            />

                            <div className='d-flex justify-content-center mb-4'>
                            </div>

                            <MDBBtn className='w-100 mb-4' size='md' onClick={handleSignUp}>sign up</MDBBtn>
                            <MDBBtn className='w-100 mb-4' color='secondary' size='md' onClick={() => navigate('/signin')}>Back to sign in</MDBBtn>

                            <div className="text-center"></div>

                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol col='6'>
                        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4"
                        alt="" fluid="true"/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ToastMessage/>
        </div>
    );
}

export default SignUp;