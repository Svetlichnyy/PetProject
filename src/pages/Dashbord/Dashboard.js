import React, {useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import './Dashboard.css'
import TaskList from "../../components/TaskList/TaskList";
import TaskDetails from "../../components/TaskDelails/TaskDetails";
import Error from "../../components/modals/Error/Error";
import GroupList from "../../components/GroupList/GroupList";


const Dashboard = () => {

    const [openAside, setOpenAside] = useState(false);

    return (
        <div className='dashboard'>
            <Sidebar/>
            {openAside && <TaskDetails openAside={openAside} setOpenAside={setOpenAside} />}
            <GroupList openAside={openAside}/>
            <TaskList openAside={openAside} setOpenAside={setOpenAside} />
        </div>
    );
};

export default Dashboard;