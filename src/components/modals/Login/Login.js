import React, {useState} from 'react';
import '../../UI/Form/Form.css'
import {Box} from "@mui/material";
import man from "../../../assets/images/modal-laptop-man.svg";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router";

const Form = ({children, setOpenLogin}) => {

    const { formState:{errors}, handleSubmit} = useForm({mode: 'onBlur'});
    const onSubmit = () =>{
        loginProfile()
        setOpenLogin(false)
    }
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const loginProfile = async ()=> {
        try {
            const response = await axios.post('https://young-brushlands-01487.herokuapp.com/api/user/login', formData)
            console.log(response)
            localStorage.setItem('token', (response.data.token))
            localStorage.setItem('userId', (response.data.user.id))
            navigate('/')
        } catch (err) {
            console.log('ERROR in LOGIN')
        }
    }

    const navigate = useNavigate()

    function handleClick(e) {
        e.preventDefault()
        loginProfile()

    }

    return (
        <Box className='form-box'>
            <div className='form'>
                <div className='form-image'>
                    <img src={man} alt="man"/>
                </div>
                <div className='login-container'>
                    <div className='header'>
                        <div className='form-title'>Log in</div>
                    </div>
                    <div className='body'>
                        <form onSubmit={handleSubmit(onSubmit)} action="#">
                            <div className='form-message'>
                                Don't have an account <span>Check in</span>
                            </div>
                            <div>
                                <div className='login-email'>
                                    <label className='form-email'>
                                        <input
                                            placeholder="Enter your E-Mail"
                                            className='form-email-input'
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                        <span className='form-email-label'>E-Mail</span>
                                    </label>
                                </div>
                                <div className='login-password'>
                                    <label className='form-email'>
                                        <input
                                            type='password'
                                            placeholder="Enter your password"
                                            className='form-email-input'
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        />
                                        <span className='form-email-label'>Password</span>
                                    </label>
                                </div>
                            </div>
                            <div className='login-reset'>
                                Forgot your password?
                            </div>
                            <div className='footer'>
                                <button onClick={(e) => handleClick} className='main-button button-form' type='submit'>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    <div
                        className='form-agreement'>
                        <span>JustDo support</span>
                    </div>
                </div>
                {children}
            </div>
        </Box>
    );
};

export default Form;