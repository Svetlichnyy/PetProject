import React from 'react';
import './Task.scss';
import { Checkbox } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch } from "react-redux";
import { ReactComponent as HomeIcon } from "../../../assets/images/bx-color-house.svg";
import { ReactComponent as MeetingIcon } from "../../../assets/images/bx-color-meeting.svg";
import { ReactComponent as WorkIcon } from "../../../assets/images/bx-color-work.svg";
import { ReactComponent as SportIcon } from "../../../assets/images/bx-color-workout.svg";
import { saveId } from "../../../redux/actions/taskActionCreator";

const Task = ({ title, id, tagsTitleArray, categoryTitle, deadline, priorityColor, done, openAside, setOpenAside, hidden }) => {

    // ПЕРЕВОД ВРЕМЕНИ В ТРЕБУЕМОЕ
    const dateNTime = deadline.split("T")
    const yearMonthDay = dateNTime[0]?.split("-")
    const hoursMinutes = dateNTime[1]?.split(":")
    const superTime = new Date(new Date().setFullYear(yearMonthDay[2], yearMonthDay[1], yearMonthDay[0])).setHours(hoursMinutes[0], hoursMinutes[1])
    const result = new Date(superTime)
    const hours = result.getHours()
    const minutes = result.getMinutes()
    const mm = result.getMonth()
    const dd = new Date(result.setMonth(mm)).getDate().toString();
    const ddChars = dd.split('');
    const arr = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const superMegaTime = arr[mm] + " " + (ddChars[1] ? dd : ddChars[0]) + ', ' + (hours > 12 ? hours - 12 : hours) +
        ":" + (minutes < 10 ? minutes + '0' : minutes) + (hours > 12 ? " pm" : " am")

    // ПЕРЕВОД ВРЕМЕНИ В ТРЕБУЕМОЕ

    const dispatch = useDispatch()


    const handleClick = () => {
        dispatch(saveId({ id }))
        setOpenAside(!openAside)
    }

    return (
        <div className={hidden ? 'zone active' : 'zone'}>
            <div
                onClick={ handleClick}
                className={done ? 'task task-done' : 'task'}
            >
                <div className='task-group'>
                    <Checkbox
                        checked={done}
                        color='primary'
                        icon={<CircleIcon style={{ color: '#fff', border: '1px solid grey', borderRadius: '50%', width: '20px', height: '20px' }} />}
                        checkedIcon={<CircleIcon style={{ color: '#03A0E8', border: '1px solid grey', borderRadius: '50%', width: '20px', height: '20px' }} />}
                        onChange={handleClick}
                    >
                    </Checkbox>
                    <div className='task-name'>{title}</div>
                    <div className='task-date'><span>{superMegaTime}</span></div>
                    <div className='task-category'>
                        {categoryTitle}
                    </div>
                    <div className='task-tags'>{tagsTitleArray}</div>
                </div>
                <div className='task-priority'>
                    {
                        priorityColor === 'red' && <div style={{ backgroundColor: '#E44233' }} className='task-priority-item' />
                    }
                    {
                        priorityColor === 'blue' && <div style={{ backgroundColor: '#03A0E8' }} className='task-priority-item' />
                    }
                    {
                        priorityColor === 'gray' && <div style={{ backgroundColor: '#D7D7D7' }} className='task-priority-item' />
                    }
                    {
                        priorityColor === 'yellow' && <div style={{ backgroundColor: '#FDCB42' }} className='task-priority-item' />
                    }
                </div>
            </div>
        </div>
    );
};

export default Task;