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

const API_URL = 'http://localhost:8080'


const TodoItem = ({ todo, getAllTodo, todos }) => {
    const completedState = todo.is_completed.data[0] === 1 ? true : false;
    const [completed, setCompleted] = useState(completedState)
    const [clickedCheck, setClickCheck] = useState(false);
    const [editName, setEditName] = useState(false);

    const currentStatus = () => {
        const now = new Date();
        const deadline = new Date(Date.parse(todo.deadline));
        if (todo.is_completed.data[0] === 1) {
            return 'Completed'
        }
        if (now > deadline) {
            return 'Expire'
        }
        return 'Active'
    }

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
                alert(res.data.responseData)
            } else {
                getAllTodo();
            }
        })
        .catch(err => alert(err))
    }

    useEffect(() => {
        if (clickedCheck) {
            updateTodoStatus();
        }
    },[completed])

    const deleteTodo = async () => {
        await axios.delete(`${API_URL}/api/todo/delete`, {
            params: {
                id: todo.id
            }
        })
        .then(res => {
            if (res.data.statusCode === 200) {
                getAllTodo();
            } else {
                alert(res.data.responseData)
            }
        })
        .catch(err => alert(err))
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
                <p className="lead fw-normal mb-0" style={{textDecoration: completed ? 'line-through' : 'none'}}>
                    {todo.todo_name}
                </p>
            </MDBListGroupItem>
            <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div className="d-flex flex-row align-items-center justify-content-end mb-1">
                    <div className="text-end text-muted">
                        <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Created date"
                        >
                        <p className="small text-muted mb-0">
                            <MDBIcon fas icon="info-circle" className="me-2" />
                            {formatDateToDisplay(todo.deadline)}
                        </p>
                        </MDBTooltip>
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
                    }}>Save</MDBBtn> }
                    {
                        !completed && (
                            <div style={{
                                marginLeft: '40px'
                            }}>
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
                            
                        )
                    }
                   
                </div>
            </MDBListGroupItem>
        </MDBListGroup>
    )
}

export default TodoItem;