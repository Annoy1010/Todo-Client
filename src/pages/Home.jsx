/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userSlice'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../components/Loading'
import TodoItem from '../components/TodoItem'
import ToastMessage from '../components/ToastMessage'

// const API_URL = 'https://todo-server-gfv3.vercel.app'
const API_URL = 'http://localhost:8080'

const options = [
    'All',
    'Acitve',
    'Completed',
    'Expired'
]

const ALL = 0;
const ACTIVE = 1;
const COMPLETED = 2;
const EXPIRE = 3;

const Home = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [todo, setTodo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [todos, setTodos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [sentSearch, setSentSearch] = useState('');
    const [chosedOption, setChosedOption] = useState(0)
    const [clickedMenu, setClickedMenu] = useState(false);

    const formatDateToSaveIntoDB = date => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getUTCFullYear()}/${convertedDate.getMonth()+1}/${convertedDate.getDate()}`
    }

    const handleLoginedUser = async () => {
        await axios.get(`${API_URL}/api/user`)
        .then((res) => {
            if (res.data.length === 0) {
                navigate('/signin')
            } else {
                dispatch(setUser(res.data[0]))
            }
        })
        .catch(err => alert(err))
    }

    const getAllTodo = async () => {
        await axios.get(`${API_URL}/api/todo/all`, {
            params: {
                profile_id: user.id,
                search_input: sentSearch,
                all: chosedOption === ALL ? true : false,
                active: chosedOption === ACTIVE ? true : false,
                completed: chosedOption === COMPLETED ? true : false,
                expired: chosedOption === EXPIRE ? true : false
            }
        })
        .then(res => {
            if (res.data.statusCode === 200) {
                setTodos(res.data.responseData)
            }
        })
        .catch(err => alert(err))
    }

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            handleLoginedUser();
        } else {
            getAllTodo()
            setLoaded(true);
        }
    }, [user, chosedOption, sentSearch])

    const handleAddTodo = async () => {
        if (formatDateToSaveIntoDB(deadline) === 'NaN/NaN/NaN') {
            toast.warn('Please set deadline for this work')
        } else {
            await axios.post(`${API_URL}/api/todo/new`, {
                profile_id: user.id,
                deadline: formatDateToSaveIntoDB(deadline),
                todo
            })
            .then(res => {
                if (res.data.statusCode === 200) {
                    setDeadline('');
                    setTodo('');
                    setTodos([])
                    getAllTodo();
                } else {
                    toast.warn(res.data.responseData);
                }
            })
            .catch(err => toast.error(err))
        }
    }

    useEffect(() => { 
        setTimeout(() => {
            setSentSearch(searchInput)
        }, 2000)
    }, [searchInput])

    const handleSearch = () => {
        setSentSearch(searchInput)
    }

    const handleClear = () => {
        setSearchInput('')
        setSentSearch('')
    }


    const handleSignOut = async () => {
        await axios.put(`${API_URL}/api/user/signout`)
        .then(res => {
            const notify = res.data.responseData;
            if (res.data.statusCode === 200) {
                toast.success(notify);
                setTimeout(() => {
                    dispatch(setUser({}));
                }, 2000)
            } else {
                toast.warn(notify);
            }
        })
        .catch(err => toast.error(err))
    }

    return (
        <div 
                className='home_container' 
                style={{
                    minHeight: '100vh',
                    minWidth: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {loaded ? (
                        <MDBContainer className="py-5">
                            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                                <MDBCol>
                                    <MDBCard
                                        id="list1"
                                        style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
                                    >
                                        <MDBCardBody className="py-4 px-4 px-md-5">
                                        <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                                            <MDBIcon fas icon="check-square" className="me-1" />
                                            <u>My Todo-s</u>
                                        </p>
                                        <div className="pb-2">
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <div className="d-flex flex-row align-items-center">
                                                        <input
                                                            type="text"
                                                            value={todo}
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlInput1"
                                                            placeholder="Add new..."
                                                            onChange={(e) => setTodo(e.target.value)}
                                                        />
                                                        <input 
                                                            type='date' 
                                                            value={deadline}
                                                            className="form-control form-control-lg"
                                                            style={{ width: '20%', margin: '0 20px' }} 
                                                            onChange={(e) => setDeadline(e.target.value)}
                                                        />
                                                        <div>
                                                            <MDBBtn onClick={handleAddTodo}>Add</MDBBtn>
                                                        </div>
                                                    </div>
                                                </MDBCardBody>  
                                                <MDBCardBody>
                                                    <div className="d-flex flex-row align-items-center">
                                                        <input
                                                            type="text"
                                                            value={searchInput}
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlInput1"
                                                            placeholder="Search Todo"
                                                            onChange={(e) => setSearchInput(e.target.value)}
                                                        />
                                                        <div>
                                                            <MDBBtn onClick={handleSearch} style={{
                                                                marginLeft: '30px',
                                                            }}>Search</MDBBtn>
                                                        </div>
                                                        <div>
                                                            <MDBBtn onClick={handleClear} style={{
                                                                marginLeft: '30px',
                                                                backgroundColor: '#FA5F55'
                                                            }}>Clear</MDBBtn>
                                                        </div>
                                                    </div>
                                                </MDBCardBody>                                                              
                                            </MDBCard>
                                            {/* <MDBCard>
                                                
                                            </MDBCard> */}
                                        </div>
                                        <hr className="my-4" />

                                        <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                                            {
                                                options.map((option, index) => (
                                                    <MDBBtn key={index} 
                                                            outline 
                                                            className='mx-2' 
                                                            color={chosedOption === index ? 'info' : 'secondary' } 
                                                            style={{backgroundColor: '#ffff'}}
                                                            onClick={() => setChosedOption(index)}>
                                                        {option}
                                                    </MDBBtn>
                                                ))
                                            }
                                            
                                        </div>
                                        <div 
                                            className="todo-list"
                                            style={{ 
                                                maxHeight: '260px',
                                                overflowY: 'scroll',
                                                paddingRight: '10px',
                                                scrollBehavior: 'smooth'
                                            }}
                                        >
                                            {
                                                todos.length > 0 && todos.map((todo, index) => (
                                                    <TodoItem 
                                                        todo={todo} 
                                                        key={index} 
                                                        getAllTodo={getAllTodo}
                                                        setTodos={setTodos}
                                                        todos={todos}
                                                    />)
                                                )
                                            }
                                        </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    ) : <Loading />
                }
                <div className='menu' style={{
                    width: clickedMenu ? '300px' : '40px'
                }}>
                    <FontAwesomeIcon icon={faBars} size='xl' className="menu-icon" onClick={() => setClickedMenu(prev => !prev)}/>
                    {
                        clickedMenu && <React.Fragment>
                             <div className='menu-item' style={{
                                marginTop: '50px',
                                borderTop: '1px solid #efefef',
                                
                            }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    marginRight: '20px',
                                }}>
                                    <img src="https://img.freepik.com/free-icon/user_318-180888.jpg" alt="" style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}/>
                                </div>
                                <span>{user.full_name}</span>
                            </div>
                            <div className='menu-item' onClick={handleSignOut}> 
                                Đăng xuất
                            </div>
                        </React.Fragment>
                    }
                   
                </div>
            <ToastMessage/>
        </div>
    )
}

export default Home;