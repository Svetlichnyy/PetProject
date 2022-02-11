import React, {useEffect, useState} from 'react';
import {fetchUserInfo} from "../../redux/actions/userActionCreator";
import {useDispatch} from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import './Dashboard.scss'
import TaskList from "../../components/TaskList/TaskList";
import TaskDetails from "../../components/TaskDelails/TaskDetails";
import Error from "../../components/modals/Error/Error";
import GroupList from "../../components/GroupList/GroupList";
import {ReactComponent as SmallLogo} from "../../assets/images/TabletLogo.svg";
import Success from "../../components/modals/Success/Success";


const Dashboard = () => {
    const [openSidebar,setOpenSidebar] = useState(false)
    const [openAside, setOpenAside] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);


    return (
        <div className='dashboard'>
            <Error/>
            <Success/>
            <div className="header-menu">
                <div/>
                <SmallLogo className="small-logo"/>
            </div>
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
            {openAside && <TaskDetails openAside={openAside} setOpenAside={setOpenAside} />}
            <GroupList openAside={openAside}/>
            <TaskList openAside={openAside} setOpenAside={setOpenAside} />
        </div>
    );
};

export default Dashboard;