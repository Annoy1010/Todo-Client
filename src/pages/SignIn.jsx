/* eslint-disable react-hooks/exhaustive-deps */
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
} from 'mdb-react-ui-kit';
import axios from 'axios';  
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMessage from '../components/ToastMessage'

// const API_URL = 'https://todo-server-gfv3.vercel.app'
const API_URL = 'http://localhost:8080'


const SignIn = () => {
    const [userInput, setUserInput] = useState({
        username: '',
        password: ''
    })
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            navigate('/')
        }
    }, [user])

    const handleLogin = async () => {
        await axios.post(`${API_URL}/api/user/login`, {
            username: userInput.username,
            password: userInput.password
        })
        .then((res) => {
            if (res.data.statusCode === 404) {
                toast.warn(res.data.responseData)
            } else {
                toast.success(res.data.responseData)
                setTimeout(() => {
                    dispatch(setUser(res.data.userData))
                }, 2000)
            }
        })
        .catch(err => toast.error(err))
    }

    return (
        <div style={{
            minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))'
        }}>
            <MDBContainer fluid s="true">
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                <MDBInput 
                                    wrapperClass='mb-4 mx-5 w-100' 
                                    labelClass='text-white' 
                                    label='Username' 
                                    type='email' 
                                    size="lg" 
                                    style={{
                                        background: '#332d2d',
                                        color: '#fff'
                                    }}
                                    name="username"
                                    onChange={(e) => setUserInput(prev => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }
                                    })}
                                    autoComplete='none'
                                />
                                <MDBInput 
                                    wrapperClass='mb-4 mx-5 w-100' 
                                    labelClass='text-white' 
                                    label='Password' 
                                    type='password' 
                                    size="lg" 
                                    style={{
                                        background: '#332d2d',
                                        color: '#fff'
                                    }}
                                    name="password"
                                    onChange={(e) => setUserInput(prev => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }
                                    })}
                                    autoComplete='none'
                                />
                                <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleLogin}>
                                Login
                                </MDBBtn>

                                <div className='d-flex flex-row mt-3 mb-5'>
                                </div>

                                <div>
                                <p className="mb-0">Don't have an account? <span className="text-white-50 fw-bold" style={{cursor: 'pointer'}} onClick={() => navigate('/signup')}>Sign Up</span></p>

                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ToastMessage/>
        </div>
        
    );
}

export default SignIn