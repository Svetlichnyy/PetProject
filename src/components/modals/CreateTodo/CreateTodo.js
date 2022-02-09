import React, {useState} from 'react';
import {fetchTasks} from "../../../redux/actions/taskActionCreator";
import "../../UI/Form/Form.css"
import {Box} from "@mui/material";
import "./CreateTodo.scss"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import axiosApi from "../../../axios/api";

const CreateTodo = (props) => {
    const userTags = useSelector((state) => state.userTag.tags)
    const userCategories = useSelector((state) => state.userCategories.categories)
    const dispatch = useDispatch()
    const [value, setValue] = useState(new Date());
    const [tags, setTags] = useState([]);
    const addTodo = async () =>{
        try{
            const response = await axiosApi.post('/task', {
                title: ToDoData.title,
                description: ToDoData.description,
                tagsTitleArray: tags,
                notificationTime: time,
                deadline: value.toLocaleString(),
                categoryTitle: category,
                priorityColor: priority})
            console.log(response)
        } catch(err){
            console.log(err)
            console.log('Error in posting Task')
        }
        console.log(`Adding ${value.toLocaleString()}`)
        dispatch(fetchTasks())

    }
    const [time, setTime] = useState('');
    const handleChangeTime = (e) => {
        setTime(e.target.value);
    };
    const [category, setCategory] = useState('');
    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };
    const [priority, setPriority] = useState('');
    const handleChangePriority = (e) => {
        setPriority(e.target.value);


    };

    const handleChangeTags = (e) => {
        setTags(e.target.value)
    };

    const [ToDoData, setToDoData] = useState({
        title: '',
        description: ''
    })

    return (
        <div className="create-todo">
            <Box className="form-box">
                <div className="form">
                    <div className='header'>
                        <div className='form-title'>Task Creation</div>
                        <br/>
                    </div>
                    {props.children}
                    <div className="input-container">
                        <div className='login-email'>
                            <label className='form-email'>
                                <input
                                    defaultValue={'New Task'}
                                    onChange={(e) =>  setToDoData({...ToDoData, title: e.target.value})}
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
                                        userTags.map((data) => {
                                            return (
                                                <MenuItem
                                                    key={data.id+1}
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
                        </div>
                        <div className='login-email'>
                            <label className='form-email'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel className='label-notification all-labels' id="time-label">Notification</InputLabel>
                                        <Select
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
                                </Box>
                                {/*<span className='form-email-label'>E-Mail</span>*/}
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

                                        }}
                                    />
                                </LocalizationProvider>
                                {/*<span className='form-email-label'>Set Deadline</span>*/}
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
                                                userCategories.map((data) => {
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
                                            value={priority}
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
                        >

                            </textarea>
                            <span className='form-description-label'>Description</span>
                        </label>
                    </div>
                    <div className='footer'>
                        <button className='main-button form-prev-todo'
                                onClick={() => {
                                    props.setOpen(false)
                                }}>
                        </button>
                        <button className='main-button form-next-todo'
                                onClick={() => {
                                    addTodo()

                                    console.log("Adding todo...")
                                    props.setOpen(false)
                                }}
                        >
                            Create task
                        </button>
                    </div>

                </div>

            </Box>
        </div>
    );
};

export default CreateTodo;