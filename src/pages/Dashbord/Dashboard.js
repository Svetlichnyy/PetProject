import React, {useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import './Dashboard.css'
import TaskList from "../../components/TaskList/TaskList";
import TaskDetails from "../../components/TaskDelails/TaskDetails";
import Error from "../../components/modals/Error/Error";


const Dashboard = () => {

    const [openAside, setOpenAside] = useState(false);

    return (
        <div className='dashboard'>
            <Sidebar/>
            {openAside && <TaskDetails openAside={openAside} setOpenAside={setOpenAside} />}
            <TaskList openAside={openAside} setOpenAside={setOpenAside} />
        </div>
    );
};

export default Dashboard;