import React, {useState} from 'react';
import axiosApi from "../../../axios/api";
import {useDispatch} from "react-redux";
import {fetchGroups} from "../../../redux/actions/groupActionCreator";
import "./CreateGroup.css"
import {Box} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateGroup = (props) => {

    const [groupName, setGroupName] = useState('')

    const dispatch = useDispatch()

    const addGroup = async () =>{
        try{
            const response = await axiosApi.post('/group', {
                title: groupName,
            })
            console.log(response)
        } catch(err){
            console.log(err)
            console.log('Error in posting Task')
        }
        console.log(`Adding ${groupName}`)
        dispatch(fetchGroups())
    }

    return (
        <div className="create-group">
            <Box className="form-box">
                <CloseIcon  onClick={() => props.setOpen(false)} style={{color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer'}}  />
                <div className='create-group-content'>
                    <div className='create-group-title'>
                        Group Creation
                    </div>
                    <div className='login-email' style={{marginRight: '3vh'}}>
                        <label className='form-email'>
                            <input
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Enter Group Name"
                                className='form-email-input'
                            />
                            <span className='form-email-label'>Group Name</span>
                        </label>
                    </div>
                    <div className='create-group-buttons'>
                        <button className='btn-delete' onClick={() => props.setOpen(false)}><span>Delete</span></button>
                        <button
                            onClick={() => {
                                addGroup()

                                console.log("Adding todo...")
                                props.setOpen(false)
                            }}
                            className='btn-create'><span>Create group</span></button>
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default CreateGroup;