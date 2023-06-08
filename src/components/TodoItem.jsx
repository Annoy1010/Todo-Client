/* eslint-disable react-hooks/exhaustive-deps */
import {
    MDBCheckbox,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTooltip,
    MDBBtn
} from "mdb-react-ui-kit";
import axios from 'axios';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import ToastMessage from '../components/ToastMessage'

const API_URL = 'https://todo-server-gfv3.vercel.app'
// const API_URL = 'http://localhost:8080'


const TodoItem = ({ todo, getAllTodo, todos, setTodos }) => {
    const completedState = todo.is_completed.data[0] === 1 ? true : false;
    const [completed, setCompleted] = useState(completedState)
    const [clickedCheck, setClickCheck] = useState(false);
    const [todoName, setTodoName] = useState(todo.todo_name);
    const [deadline, setDeadline] = useState(todo.deadline);
    const [editName, setEditName] = useState(false);

    const currentStatus = () => {
        const now = new Date();
        const deadline = new Date(Date.parse(todo.deadline));
        if (todo.is_completed.data[0] === 1) {
            return 'Completed'
        }
        if (now > deadline) {
            return 'Expired'
        }
        return 'Active'
    }

    const formmatedDate = (date) => {
        const dateOnly = date.substr(0, 10);
        const inputDate = new Date(dateOnly);
        return inputDate.toISOString().slice(0, 10);
    };

    useEffect(() => {
        setCompleted(completedState)
    }, [todos])

    const updateTodoStatus = async () => {
        await axios.put(`${API_URL}/api/todo/update`, {
            is_completed: completed,
            id: todo.id
        })
        .then(res => {
            if (res.data.statusCode !== 200) {
                toast.warn(res.data.responseData)
            } else {
                setTodos([]);
                getAllTodo();
            }
        })
        .catch(err => toast.error(err))
    }

    useEffect(() => {
        if (clickedCheck) {
            updateTodoStatus();
        }
    },[completed])

    const updateTodoDetail = async () => {
        await axios.put(`${API_URL}/api/todo/detail/update`, {
            id: todo.id,
            todo_name: todoName,
            deadline,
        })
        .then(res => {
            if (res.data.statusCode === 200) {
                setEditName(false);
                setTodos([]);
                getAllTodo();
            } else {
                toast.warn(res.data.responseData)
            }
        })
        .catch(err => toast.error(err))
    }

    const deleteTodo = async () => {
        await axios.delete(`${API_URL}/api/todo/delete`, {
            params: {
                id: todo.id
            }
        })
        .then(res => {
            if (res.data.statusCode === 200) {
                setTodos([]);
                getAllTodo();
            } else {
                toast.warn(res.data.responseData)
            }
        })
        .catch(err => toast.error(err))
    }

    const formatDateToDisplay = date => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}/${convertedDate.getMonth()+1}/${convertedDate.getUTCFullYear()}`
    }

    return (
        <MDBListGroup horizontal className="rounded-0 bg-transparent">
            <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckChecked"
                    disabled={completed}
                    onChange={e => {
                        if (!e.target.disabled) {
                            setCompleted(e.target.checked)
                            setClickCheck(true)
                        }
                    }}
                    checked={completed}
                />
            </MDBListGroupItem>
            <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                {
                    editName ? <input
                    type="text"
                    value={todoName}
                    className="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Search Todo"
                    onChange={(e) => setTodoName(e.target.value)}
                    /> : <p className="lead fw-normal mb-0" style={{textDecoration: completed ? 'line-through' : 'none'}}>
                        {todoName}
                    </p>
                }
                
            </MDBListGroupItem>
            <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div className="d-flex flex-row align-items-center justify-content-end mb-1">
                    <div className="text-end text-muted">
                        {
                            editName ? <input 
                                            type='date' 
                                            value={formmatedDate(deadline)}
                                            className="form-control form-control-lg"
                                            style={{  margin: '0 20px' }} 
                                            onChange={(e) => setDeadline(e.target.value)}
                                        /> : <MDBTooltip
                                                tag="a"
                                                wrapperProps={{ href: "#!" }}
                                                title="Created date"
                                            >
                                                <p className="small text-muted mb-0">
                                                    <MDBIcon fas icon="info-circle" className="me-2" />
                                                    {formatDateToDisplay(todo.deadline)}
                                                </p>
                                            </MDBTooltip>
                        }
                    </div>
                    <div 
                        className="small mb-0" 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '40px',
                            padding: '4px 20px',
                            backgroundColor: '#fff',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: currentStatus() === 'Active' ? '#3B71CA' : (currentStatus() === 'Completed' ? '#14A44D' : '#DC4C64'),
                            borderRadius: '6px',
                        }}
                    >
                        <span style={{
                            fontSize: '16px',
                            color: currentStatus() === 'Active' ? '#3B71CA' : (currentStatus() === 'Completed' ? '#14A44D' : '#DC4C64'),
                        }}>
                            {currentStatus()}
                        </span>
                    </div>
                    { editName && <MDBBtn style={{
                                    marginLeft: '40px',
                                }} onClick={updateTodoDetail}>Save</MDBBtn> 
                    }
                    <div style={{
                        marginLeft: '40px'
                    }}>
                        {
                            !completed && (
                                <MDBTooltip
                                    tag="a"
                                    wrapperProps={{ href: "#!" }}
                                    title="Edit todo"
                                >
                                    <MDBIcon
                                        fas
                                        icon="pencil-alt"
                                        className="me-3"
                                        color="info"
                                        onClick={() => setEditName(prev => !prev)}
                                    />
                                </MDBTooltip>
                            )
                        }
                        
                        <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Delete todo"
                        >
                            <MDBIcon 
                                fas 
                                icon="trash-alt" 
                                color="danger" 
                                onClick={deleteTodo}
                            />
                        </MDBTooltip>
                    </div>
                </div>
            </MDBListGroupItem>
            <ToastMessage/>
        </MDBListGroup>
    )
}

export default TodoItem;