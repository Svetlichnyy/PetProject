import React, {useEffect, useState} from 'react';
import {fetchGroups} from "../../redux/actions/groupActionCreator";
import {useDispatch, useSelector} from "react-redux";
import './GroupList.scss';
import {Modal} from "@mui/material";
import CreateGroup from '../modals/CreateGroup/CreateGroup'
import Group from "../UI/Group/Group";


const GroupList = (props) => {

    const [hidden, setHidden] = useState(true)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()

    const groupList = useSelector(store => store.groups.groups)


    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);



    return (
        <div className={props.openAside ? 'groupList active' : 'groupList'}>
            <div className='groupList-header'>
                <div   onClick={() => {setHidden(!hidden)}} className={hidden ? 'groupList-title open' : 'groupList-title'}>My groups</div>
                <button onClick={handleOpen} className='larger-button button-group'>
                    Create group
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <>
                        <CreateGroup setOpen={setOpen}/>
                    </>
                </Modal>
            </div>
            {hidden &&
                groupList.map(item => (
                    <Group
                        name = {item.title}
                        key = {item.id}
                        id = {item.id}
                        hidden = {hidden}
                    />
                ))
            }
        </div>

    );
};

export default GroupList;