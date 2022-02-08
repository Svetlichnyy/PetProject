import React, { useEffect, useState } from 'react';
import "./TaskDetails.scss"
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, selectTodoList } from "../TodoSlice";
import { ReactComponent as ClockIcon } from "../../assets/images/bx-time-five.svg"
import { ReactComponent as HourglassIcon } from "../../assets/images/bx-hourglass-rounded.svg"
import { ReactComponent as HomeIcon } from "../../assets/images/bx-color-house.svg";
import { ReactComponent as MeetingIcon } from "../../assets/images/bx-color-meeting.svg";
import { ReactComponent as WorkIcon } from "../../assets/images/bx-color-work.svg";
import { ReactComponent as SportIcon } from "../../assets/images/bx-color-workout.svg";
import { ReactComponent as BellIcon } from "../../assets/images/bxs-bell-ring.svg";
import { ReactComponent as BellOffIcon } from "../../assets/images/bxs-bell-ring-off.svg";
import EditTodo from "../modals/EditTodo/EditTodo";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {deleteTask, setUserTasks} from "../../redux/actions/taskActionCreator";
import NormalTime from "../../NormalTime";

const TaskDetails = (props) => {



    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const todoList = useSelector(store => store.tasks.tasks)
    const todoId = useSelector(store => store.tasks.toDoId.id)
    const [currentTask, setCurrentTask] = useState({
        title: '',
        description: '',
        tagsTitleArray: [''],
        notificationTime: '',
        deadline: '',
        categoryTitle: '',
        priority: '',
        is_done: '',
        created_at:''
    })
    useEffect(() => {
        const task = todoList.filter(todo => todo.id === todoId);
        setCurrentTask(task[0]);
    }, [todoId, todoList])

    const task = todoList.filter(todo => todo.id === todoId)
    const dispatch = useDispatch()
    const  deleteToDo = (todoId,todoList) => {
        dispatch(deleteTask(todoId,todoList));
        props.setOpenAside(false);
    }
    return (
        <div className={props.openAside ? 'aside active' : 'aside'}>
            <div className="header">
                <div className="header-title">
                    {
                        currentTask.priority.color === 'red' && <div style={{ backgroundColor: '#E44233' }} className='priority' />
                    }
                    {
                        currentTask.priority.color === 'blue' && <div style={{ backgroundColor: '#03A0E8' }} className='priority' />
                    }
                    {
                        currentTask.priority.color === 'grey' && <div style={{ backgroundColor: '#D7D7D7' }} className='priority' />
                    }
                    {
                        currentTask.priority.color === 'yellow' && <div style={{ backgroundColor: '#FDCB42' }} className='priority' />
                    }
                    {currentTask.title}</div>
            </div>
            <div className="body">
                <div className="additional">
                    Additional info:
                    <ul className="additional-container">
                        <li>
                            Creation date:<br /><ClockIcon className="icon" />
                            <span>{NormalTime(task[0].created_at)} </span>
                        </li>
                        <li>
                            Deadline:<br /><HourglassIcon className="icon" />
                            <span>{NormalTime(task[0].deadline)}</span>
                        </li>
                        <li >
                            Notification:<br/>
                            {
                                task[0].notification.time !== '' &&  <div className="notification"> <BellIcon className='icon'/> <span > {NormalTime(task[0].remind_in)}</span></div>
                            }
                            {
                                task[0].notification.time === '' && <div className="notification"><BellOffIcon className='icon'/> <span > {NormalTime(task[0].deadline)}</span></div>
                            }
                        </li>
                        <li>
                            Category:<br />

                            {task[0].category.title !== '' && <>  <span>   {task[0].category.title}</span></>}

                        </li>
                        <li className="tags">
                            Tags:<br />
                            <span>
                                {task[0].tags.map((tag) => {
                                    return(
                                    <span key={tag.id}>{'#' + tag.title + ' '}</span>
                                     )})}</span>
                        </li>
                    </ul>
                </div>
                <div className="description">
                    Description:
                    <div className="description-container">
                        {currentTask.description}
                    </div>
                </div>
            </div>
            <div className="footer">
                <button className='footer-remove'
                        onClick={() => deleteToDo(todoId,todoList)}
                >
                    <span>Delete</span>
                </button>
                <div>
                    <button className='footer-edit'
                            onClick={handleOpen}
                    >
                        <span>Edit</span>
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            <EditTodo currentTask={[currentTask]} setOpen={setOpen}>
                                <CloseIcon style={{ color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer' }} onClick={handleClose} />
                            </EditTodo>
                        </>
                    </Modal>

                </div>
            </div>
        </div>
    );
};

export default TaskDetails;