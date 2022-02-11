import React, { useEffect, useState } from 'react';
import './TaskList.scss';
import Task from "../../components/UI/Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import CreateTodo from "../modals/CreateTodo/CreateTodo";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import { useOutlineSelectStyles } from '@mui-treasury/styles/select/outline';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import SortIcon from '../../assets/images/Sort.svg';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import {fetchTasks, sortTasks} from '../../redux/actions/taskActionCreator';


const TaskList = (props) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const todoList = useSelector(store => store.tasks.tasks)

    const [hidden, setHidden] = useState(true)

    const [search, setSearch] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [sort, setSort] = useState('');

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const sortChange = (event) => {
        setSort(event.target.value);
    };
    const inputChange = (e) => {
        setSearch(e.target.value)
    }

    // console.log(search)
    // console.log(startDate)
    // console.log(sort)

    const outlineSelectClasses = useOutlineSelectStyles();

    const iconComponent = (props) => {
        return (
            <ExpandMoreRoundedIcon className={props.className + " " + outlineSelectClasses.icon} />
        )
    };

    // moves the menu below the select input
    const menuProps = {
        classes: {
            paper: outlineSelectClasses.paper,
            list: outlineSelectClasses.list
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null
    };

    useEffect(() => {
        dispatch(sortTasks(search));
    }, [search]);

    useEffect(() => {
        dispatch(sortTasks(undefined, startDate.getFullYear() + '-' +  (startDate.getMonth()+1) + '-' + startDate.getDate()));
    }, [startDate]);


    useEffect(() => {
        dispatch(sortTasks(undefined, undefined, sort));
    }, [sort]);


    return (
        <div className={props.openAside ? 'taskList active' : 'taskList'}>
            <div className='taskList-header'>
                <div className='taskList-header-items'>
                    <div onClick={() => { setHidden(!hidden) }} className={hidden ? 'taskList-title open' : 'taskList-title'}>My tasks</div>
                    <div className='search-box'>
                        <button className='btn-search' />
                        <input value={search} onChange={inputChange} type="text" className='input-search' />
                    </div>
                    <div>
                        <button className='btn-calendar' />
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={subDays(new Date(), 0)}
                            inline
                            calendarStartDay={1}
                        />
                    </div>
                    <div>
                        <FormControl style={{ marginLeft: 10 }}>
                            <Select
                                disableUnderline
                                classes={{ root: outlineSelectClasses.select }}
                                MenuProps={menuProps}
                                IconComponent={iconComponent}
                                value={sort}
                                onChange={sortChange}
                            >
                                <MenuItem value={"createdAt"}>
                                    <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
                                        <img src={SortIcon} alt="" />
                                    </ListItemIcon>
                                    <span style={{ marginTop: 3 }}>Sort by date</span>
                                </MenuItem>
                                <MenuItem value={'title'}>
                                    <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
                                        <img src={SortIcon} alt="" />
                                    </ListItemIcon>
                                    <span style={{ marginTop: 3 }}>Sort by name</span>
                                </MenuItem>
                                <MenuItem value={'priorityId'}>
                                    <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
                                        <img src={SortIcon} alt="" />
                                    </ListItemIcon>
                                    <span style={{ marginTop: 3 }}>Sort by priority</span>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <button onClick={handleOpen} className='larger-button button-task'>
                    Create task
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <>
                        <CreateTodo setOpen={setOpen}>
                            <CloseIcon style={{ color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer' }} onClick={handleClose} />
                        </CreateTodo>
                    </>
                </Modal>
            </div>
            {
                todoList.map(item => (
                    <div key={item.id}>
                        {hidden && <Task
                openAside={props.openAside}
                setOpenAside={props.setOpenAside}
                key={item.id}
                title={item.title}
                description={item.description}
                id={item.id}
                tagsTitleArray={item.tags.map(item => item.title)}
                notificationTime={item.notificationTime}
                deadline={item.deadline.toLocaleString()}
                categoryTitle={item.category.title}
                priorityColor={item.priority.color}
                done={item.done}
                notification={item.remind_in}
                groupId={item.groupId}
                />}
                    </div>
                ))
            }
        </div>
    );
};

export default TaskList;