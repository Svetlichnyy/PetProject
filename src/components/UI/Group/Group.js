import React, {useState} from 'react';
import './Group.scss'
import {useDispatch, useSelector} from "react-redux";
import {saveId} from "../../../redux/actions/groupActionCreator";
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import {Modal} from "@mui/material";
import EditGroup from "../../modals/EditGroup/EditGroup";
import {useDrop} from "react-dnd";

const Group = (props) => {
    const dispatch = useDispatch()
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [groupOpen, setGroupOpen] = useState(true)
    const todoList = useSelector(store => store.tasks.tasks)
    const [items,setItems] = useState([])
    const currentGroupId = useSelector(store => store.groups.groupId)
    const [{isOver},drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addTaskToGroup(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))
    const addTaskToGroup = (item) =>{
        dispatch(saveId(props.id))
        item.groupId = currentGroupId
        console.log('Drag and Drop actually doesnt work')

        const groupTodoList = todoList.filter((todo) => todo.groupId === item.groupId );
        setItems( [...items,groupTodoList[0]])
    }

    const handleClick = () => {
        dispatch(saveId(props.id))
    }
    return (
            <div
                ref={drop}
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

                        <div>
                            <EditGroup name={props.name} setOpenEdit={setOpenEdit}/>
                        </div>
                    </Modal>
                    <div onClick={() => setGroupOpen(!groupOpen)} className={groupOpen ? 'group-items-arrow open' : 'group-items-arrow'}/>
                </div>

            </div>
    );
};

export default Group;