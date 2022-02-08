import React, {useState} from 'react';
import './Group.css'
import {useDispatch} from "react-redux";
import {saveId} from "../../../redux/actions/groupActionCreator";
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import {Modal} from "@mui/material";
import EditGroup from "../../modals/EditGroup/EditGroup";

const Group = (props) => {

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [groupOpen, setGroupOpen] = useState(true)

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(saveId(props.id))
    }

    return (
            <div
                onClick={handleClick}
                className = 'group'>
                <div className='group-title'>
                    <FolderIcon className='group-title-folder' style={{color: '#03A0E8'}}/>
                    <div className='group-title-name'>
                        {props.name}
                    </div>
                </div>
                <div className='group-items'>
                    <EditIcon onClick={handleOpenEdit} style={{color: 'grey'}}/>
                    <Modal
                        open={openEdit}
                        onClose={handleCloseEdit}
                    >
                        <>
                            <EditGroup name={props.name} setOpenEdit={setOpenEdit}/>
                        </>
                    </Modal>
                    <div onClick={() => setGroupOpen(!groupOpen)} className={groupOpen ? 'group-items-arrow open' : 'group-items-arrow'}/>
                </div>

            </div>
    );
};

export default Group;