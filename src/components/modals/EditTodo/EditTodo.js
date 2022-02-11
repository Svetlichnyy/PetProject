import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {editTask} from "../../../redux/actions/taskActionCreator";

const EditTodo = (props) => {
    const [value, setValue] = useState(new Date());
    const [tags, setTags] = useState(props.currentTask[0].tags.map(tag => tag.title));
    const Tags = useSelector((state) => state.userTag.tags.map(tag => tag.title))
    const Categories = useSelector((state) => state.userCategories.categories)

    const taskList = useSelector(store => store.tasks.tasks)
    const todoId = useSelector(store => store.tasks.toDoId.id)

    const dispatch = useDispatch()

    const [ToDoData, setToDoData] = useState({
        title: props.currentTask[0].title,
        description: props.currentTask[0].description,
        categoryTitle: props.currentTask[0].category.title,
        priorityColor: props.currentTask[0].priority.color,
        notificationTime: props.currentTask[0].notification.time,
        deadline: props.currentTask[0].deadline,
        tagsTitleArray: props.currentTask[0].tags.map(tag => tag.title),
    })
    const  editToDo = (todoId,taskList,ToDoData) => {
        dispatch(editTask(todoId,taskList,ToDoData));
        props.setOpen(false);
    }
    const [time, setTime] = useState(props.currentTask[0].notification.time);
    const handleChangeTime = (e) => {
        setTime(e.target.value);
        setToDoData({...ToDoData, notificationTime: e.target.value})
    };
    const handleChangeTags = (e) => {
        setTags(e.target.value)
        setToDoData({...ToDoData, tagsTitleArray: e.target.value})
    }
    const [category, setCategory] = useState(props.currentTask[0].category.title);
    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
        setToDoData({...ToDoData,categoryTitle:e.target.value})
    };
    const [priority, setPriority] = useState(props.currentTask[0].priority.color);
    const handleChangePriority = (e) => {
        setPriority(e.target.value);
        setToDoData({...ToDoData,priorityColor:e.target.value})
    };

    return (
        <div className="create-todo">
            <Box className="form-box">
                <div className="form">
                    <div className='header'>
                        <div className='form-title'>Edit Task</div>
                        <br/>
                    </div>
                    {props.children}
                    <div className="input-container">
                        <div className='login-email'>
                            <label className='form-email'>
                                <input
                                    defaultValue={props.currentTask[0].title}
                                    onChange={(e) => setToDoData({...ToDoData, title: e.target.value})}
                                    placeholder="Enter Task Name"
                                    className='form-email-input tag-input'
                                />
                                <span className='form-email-label'>Task Name</span>
                            </label>
                        </div>
                        <div>
                            <FormControl fullWidth>
                                <label className='tags-title'>Add tags</label>
                                <Select
                                    multiple={true}
                                    value={tags}
                                    onChange={handleChangeTags}
                                >
                                    {
                                        Tags.map((data) => {
                                            return (
                                                <MenuItem
                                                    key={data+(1338/2)}
                                                    className="menu-item"
                                                    value={data}
                                                >
                                                    {data}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className='login-email'>
                            <label className='form-email'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <FormControl fullWidth>
                                            <InputLabel className='label-notification all-labels' id="time-label">Notification</InputLabel>
                                            <Select
                                                onClick={(e)=> e.preventDefault()}
                                                labelId="time-label"
                                                id="category-label-select"
                                                value={time}
                                                label="Time"
                                                onChange={handleChangeTime}
                                            >
                                                <MenuItem value='300000' className="menu-item">
                                                    Remind in 5 minutes
                                                </MenuItem>
                                                <MenuItem value='900000' className="menu-item">
                                                    Remind in 15 minutes
                                                </MenuItem>
                                                <MenuItem value='1800000' className="menu-item">
                                                    Remind in 30 minutes
                                                </MenuItem>
                                                <MenuItem value='3600000' className="menu-item">
                                                    Remind in 1 hour
                                                </MenuItem>
                                                <MenuItem value='86400000' className="menu-item">
                                                    Remind in 1 day
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormControl>
                                </Box>
                            </label>
                        </div>
                        <div className='login-email' >
                            <label className='form-email' >
                                <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Set Deadline"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                            setToDoData({...ToDoData,deadline: newValue})
                                        }}
                                    />
                                </LocalizationProvider>
                            </label>
                        </div>
                        <div className='login-email'>
                            <label className='form-email'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-label">Category</InputLabel>
                                        <Select  style={{borderRadius:"10px"}}
                                                 labelId="category-label"
                                                 id="category-label-select"
                                                 value={category}
                                                 label="Category"
                                                 onChange={handleChangeCategory}>
                                            {
                                                Categories.map((data) => {
                                                    return (
                                                        <MenuItem
                                                            key={data.id}
                                                            className="menu-item"
                                                            value={data.title}
                                                        >
                                                            {data.title}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </label>
                        </div>
                        <div className='login-email'>
                            <label className='form-email'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel className="all-labels " id="category-label">Set Color Priority</InputLabel>
                                        <Select
                                            labelId="category-label"
                                            id="category-label-select"
                                            value={priority.toString()}
                                            label="Priority"
                                            onChange={handleChangePriority}
                                        >
                                            <MenuItem value='red' className="menu-item">
                                                <div className="circle" style={{backgroundColor:"#E44233"}}/>      Important
                                            </MenuItem>
                                            <MenuItem value='blue' className="menu-item">
                                                <div className="circle" style={{backgroundColor:"#03A0E8"}}/>      Middle
                                            </MenuItem>
                                            <MenuItem value='gray' className="menu-item">
                                                <div className="circle" style={{backgroundColor:"#D7D7D7"}}/>      Neutral
                                            </MenuItem>
                                            <MenuItem value='yellow' className="menu-item">
                                                <div className="circle" style={{backgroundColor:"#FDCB42"}}/>      Low
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </label>
                        </div>

                    </div>
                    <div className='description-container'>
                        <label className='form-description'>
                        <textarea
                            onChange={(e) => setToDoData({...ToDoData, description: e.target.value})}
                            placeholder="Enter your text"
                            className='form-description-input'
                            defaultValue={props.currentTask[0].description}
                        >

                            </textarea>
                            <span className='form-description-label'>Description</span>
                        </label>
                    </div>
                    <div className='footer'>
                        <button className='main-button form-prev-todo'>
                        </button>
                        <button
                            onClick={() => editToDo(todoId,taskList,ToDoData)}
                            className='main-button form-next-todo'>
                            Confirm changes
                        </button>
                    </div>

                </div>

            </Box>
        </div>
    );
};

export default EditTodo;