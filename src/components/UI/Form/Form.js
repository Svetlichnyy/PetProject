import React, {useState} from 'react';
import Registration from "../../modals/Registration/Registration";
import AlmostDone from "../../modals/AlmostDone/AlmostDone";
import OneLastStep from "../../modals/OneLastStep/OneLastStep";
import {Box} from "@mui/material";
import man from "../../../assets/images/modal-laptop-man.svg";
import './Form.scss'
import axios from "axios";


const Form = ({children, ...props}) => {

    const [page, setPage] = useState(0);

    const FormTitles = ['Registration', 'Almost Done', 'One Last Step'];



    const PageDisplay = () => {
        if (page === 0) {
            return <Registration formData={formData} setFormData={setFormData} page={setPage}/>
        }
        if (page === 1) {
            return <AlmostDone formData={formData} setFormData={setFormData} page={setPage}/>
        }
        if (page === 2) {
            return <OneLastStep registerProfile={registerProfile} setOpenForm={props.setOpenForm} setOpenLogin={props.setOpenLogin} formData={formData} setFormData={setFormData} page={setPage}/>
        }
    }

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        photo: '',
        confirmPassword: ''
    })
    const registerProfile = async ()=> {
        try {
            const response = await axios.post('https://young-brushlands-01487.herokuapp.com/api/user/registration', formData)
            console.log(response)
        } catch (err) {
            console.log('ERROR in REGISTRATION')
        }
    }

    return (
        <Box className='form-box'>
            <div className='form'>
                <div className='form-image'>
                    <img src={man} alt="man"/>
                </div>
                <div className='form-container' style={{marginTop: page === 2 ? '110px' : '200px'}}>
                    <div className='progressbar'>
                        <div style={{backgroundColor: page === 0 ? '#03A0E8' : page === 1 ? '#03A0E8': page === 2 ? '#03A0E8' : 'grey'}} className='circle'/>
                        <div style={{backgroundColor: page === 1 ? '#03A0E8': page === 2 ? '#03A0E8' : 'grey'}} className='circle'/>
                        <div style={{backgroundColor: page === 2 ? '#03A0E8': 'grey'}} className='circle'/>
                    </div>
                    <div className='header'>
                        <div className='form-title'>{FormTitles[page]}</div>
                    </div>
                    <div className='body'>{PageDisplay()}</div>
                    <div hidden = {page === 1 || page === 2}
                         className='form-agreement'>
                        Continuing with Email, you agree to the <span>Teams of Use  in</span> and <span>Privacy Policy.</span>
                    </div>
                </div>
                {children}
            </div>
        </Box>
    );
};

export default Form;