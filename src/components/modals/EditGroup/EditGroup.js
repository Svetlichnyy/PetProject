import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editGroup, deleteGroup} from "../../../redux/actions/groupActionCreator";
import {Box} from "@mui/material";
import "./EditGroup.scss"
import CloseIcon from "@mui/icons-material/Close";

const EditGroup = (props) => {

    const groupList = useSelector(store => store.groups.groups)
    const groupId = useSelector(store => store.groups.groupId)

    const dispatch = useDispatch()

    const  changeGroup = (groupId,groupList,groupName) => {
        dispatch(editGroup(groupId,groupList,groupName));
        props.setOpenEdit(false);
    }

    const  deleteGroups = (groupId,groupList) => {
        dispatch(deleteGroup(groupId,groupList));
        props.setOpenEdit(false);
    }

    const [groupName, setGroupName] = useState('')

    return (
        <div className="edit-group">
            <Box className="form-box">
                <CloseIcon  onClick={() => props.setOpenEdit(false)} style={{color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer'}}  />
                <div className='edit-group-content'>
                    <div className='edit-group-title'>
                        Group Creation
                    </div>
                    <div className='login-email' style={{marginRight: '3vh'}}>
                        <label className='form-email'>
                            <input
                                defaultValue={props.name}
                                placeholder="Enter Group Name"
                                className='form-email-input'
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <span className='form-email-label'>Group Name</span>
                        </label>
                    </div>
                    <div className='edit-group-buttons'>
                        <button
                            onClick={() => deleteGroups(groupId,groupList)}
                            className='btn-delete'>
                            <span>Delete group</span>
                        </button>
                        <button
                            onClick={() => changeGroup(groupId,groupList,groupName)}
                            className='btn-edit'>
                            <span>Edit group</span>
                        </button>
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default EditGroup;