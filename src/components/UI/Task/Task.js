import React from 'react';
import './Task.scss';
import { Checkbox } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch } from "react-redux";
import {fetchTasks, saveId } from "../../../redux/actions/taskActionCreator";
import NormalTime from "../../../NormalTime";
import {useDrag} from "react-dnd";
import axiosApi from "../../../axios/api";

const Task = ({ title, id, tagsTitleArray, categoryTitle, priorityColor, done, openAside, setOpenAside, notification,groupId,description,deadline }) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'task',
        item: {groupId:groupId,
            title: title,
            description: description,
            tagsTitleArray: tagsTitleArray,
            notificationTime: notification,
            deadline: deadline,
            categoryTitle: categoryTitle,
            priorityColor: priorityColor,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(saveId({ id }))
        setOpenAside(!openAside)
    }
    const makeDone = (e) => {
        setOpenAside(openAside)
    }
    const editCheck = async () =>{
        try{
            const response = await axiosApi.put(`/task/${id}/done`, {
                done: !done})
        } catch(err){
            console.log(err)
        }
        dispatch(fetchTasks())
    }
    return (
        <div style={{opacity: isDragging ? "0": "1"}}
             ref={drag}>
            <div className='zone active' >
            <div
                onClick={handleClick}
                className={done ? 'task task-done' : 'task'}
            >
            <div className='task-group'>

                <div className='task-name'><Checkbox
                    onClick={editCheck}
                    checked={done}
                    color='primary'
                    icon={<CircleIcon style={{
                        color: '#fff',
                        border: '1px solid grey',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px'
                    }}/>}
                    checkedIcon={<CircleIcon style={{
                        color: '#03A0E8',
                        border: '1px solid grey',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px'
                    }}/>}
                    onChange={ makeDone}
                >
                </Checkbox>{title}</div>
                <div className="more-info">
                    <div className='task-date'><span>{NormalTime(notification)}</span></div>
                    <div className='task-category'>
                        {categoryTitle}
                    </div>
                    <div className='task-tags'>{tagsTitleArray}</div>
                </div>
            </div>
            <div className='task-priority'>
                {
                    priorityColor === 'red' &&
                    <div style={{backgroundColor: '#E44233'}} className='task-priority-item'/>
                }
                {
                    priorityColor === 'blue' &&
                    <div style={{backgroundColor: '#03A0E8'}} className='task-priority-item'/>
                }
                {
                    priorityColor === 'gray' &&
                    <div style={{backgroundColor: '#D7D7D7'}} className='task-priority-item'/>
                }
                {
                    priorityColor === 'yellow' &&
                    <div style={{backgroundColor: '#FDCB42'}} className='task-priority-item'/>
                }
            </div>
        </div>
    </div>
</div>
        );
};

export default Task;