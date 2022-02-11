import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { editPassword, editUser} from "../../../redux/actions/userActionCreator";
import {useNavigate} from "react-router";
import './Settings.scss'
import {Box} from "@mui/material";
import man from '../../../assets/images/modal-laptop-man.svg'
import {useForm} from "react-hook-form";
import axiosApi from "../../../axios/api";
import {setError, setSuccess} from "../../../redux/actions/alertsActionCreator";

const Settings = (props) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const userInfo = useSelector(store => store.userInfo.user)

    const userId = localStorage.getItem('userId')

    const [userData, setUserData] = useState({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email
    })

    const [userPassword, setUserPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const {
        register,
        formState:{
            errors,
        },
    } = useForm({
        mode: 'onBlur'
    });

    const changeUser = (userInfo, userData) => {
        dispatch(editUser(userInfo, userData));
        props.setOpenSettings(false)
    }

    const changePassword = (userPassword) => {
        dispatch(editPassword(userPassword));
    }

    const deleteUser = async () => {
        try {
            const response = await axiosApi.delete(`/user_info/${userId}`)
        }
        catch(err){
            dispatch(setError(true))
            console.log(err)
            console.log('Error in delete user')
        }
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        navigate('/home')
    }

    const clearPassword = (e) => {
        e.preventDefault()
        setUserPassword({...userPassword,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }
    const preventDef = (e) => {
        e.preventDefault()
    }

    return (
        <form action="#">
            <div className='settings'>
                <Box className='form-box'>
                    <div className='navbar'>
                        <div className='navbar-title'>Settings</div>
                        <div className='navbar-items'>
                            <div className='navbar-item'>Account</div>
                        </div>
                    </div>
                    <div className='account'>
                        <div className='account-title'>
                            Account
                        </div>
                        <div className='account-profile'>
                            <div className='account-profile-title'>
                                Profile
                            </div>
                            <div className='account-profile-photo'>
                                <div className='account-profile-img'>
                                    {userInfo.photo === null
                                        ? <div className='profile-without-photo'><span>{userInfo.first_name !== undefined && userInfo.first_name[0]} {userInfo.last_name !== undefined && userInfo.last_name[0]}</span></div>
                                        : <img src={man} style={{width: '44px', height:'44px', borderRadius: '50%'}} alt=""/>
                                    }
                                </div>
                                <div className='btn-photo'>
                                <div className='account-profile-group-change'>
                                    <button type="button" onClick={(e) => preventDef} className='account-profile-btn-change'><span>Change photo</span></button>
                                    <div className='account-profile-btn-change-clue'>Pick a photo up to 4MB.</div>
                                </div>
                                <button type="button" className='account-profile-btn-delete'><span>Delete</span></button>
                            </div>
                            </div>
                            <div className='account-inputs'>
                                <div className='login-email' style={{marginRight: '3vh'}}>
                                    <label className='form-email'>
                                        <input
                                            {...register('firstName',{
                                                required: true,
                                                pattern:/^[A-Za-z]+$/i,
                                                minLength: 2})}
                                            defaultValue={userInfo.first_name}
                                            onChange={(e) => setUserData({...userData, first_name:e.target.value})}
                                            placeholder="Enter First Name"
                                            className='form-email-input tag-input'
                                        />
                                        <span className='form-email-label'>First Name</span>
                                    </label>
                                    <div className='error'>
                                        {errors.firstName?.type === "required" && <span>This field is required</span>}
                                        {errors.firstName?.type === "minLength" && <span>Minimal length is 2</span>}
                                        {errors.firstName?.type === "pattern" && <span> Only English letters</span>}
                                    </div>
                                </div>
                                <div className='login-email'>
                                    <label className='form-email'>
                                        <input
                                            {...register('lastName',{
                                                required: true,
                                                pattern:/^[A-Za-z]+$/i,
                                                minLength: 2})}
                                            defaultValue={userInfo.last_name}
                                            onChange={(e) => setUserData({...userData, last_name:e.target.value})}
                                            placeholder="Enter Last Name"
                                            className='form-email-input tag-input'
                                        />
                                        <span className='form-email-label'>Last Name</span>
                                        <div className='error'>
                                            {errors.lastName?.type === "required" && <span>This field is required</span>}
                                            {errors.lastName?.type === "minLength" && <span>Minimal length is 2</span>}
                                            {errors.lastName?.type === "pattern" && <span> Only English letters</span>}
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className='login-email'>
                                <label className='form-email'>
                                    <input
                                        {...register('email', {
                                            required: true,
                                            pattern: /^\w[A-Z0-9._%+-]+@[A-Z]+\.[A-Z]{2,5}$/i
                                        })}
                                        defaultValue={userInfo.email}
                                        onChange={(e) => setUserData({...userData, email:e.target.value})}
                                        placeholder="Enter E-mail"
                                        className='form-email-input email-input'
                                    />
                                    <span className='form-email-label'>E-mail</span>
                                </label>
                                <div className='error'>
                                    {errors.email?.type === "required" && <span>Email is required</span>}
                                    {errors.email?.type === "pattern" && <span>Enter a valid email</span>}
                                </div>
                            </div>
                        </div>
                        <div className='account-password'>
                            <div className='account-password-title'>Password</div>
                            <div className='login-email'>
                                <label className='form-email'>
                                    <input
                                        value={userPassword.currentPassword}
                                        onChange={(e) => setUserPassword({...userPassword, currentPassword: e.target.value})}
                                        type="password"
                                        placeholder="Enter Current Password"
                                        className='form-email-input current-password-input'
                                    />
                                    <span className='form-email-label'>Current Password</span>
                                </label>
                            </div>
                            <div className='account-inputs'>
                                <div className='login-email' style={{marginRight: '3vh'}}>
                                    <label className='form-email'>
                                        <input
                                            value={userPassword.newPassword}
                                            onChange={(e) => setUserPassword({...userPassword, newPassword: e.target.value})}
                                            type="password"
                                            placeholder="Enter New Password"
                                            className='form-email-input tag-input'
                                        />
                                        <span className='form-email-label'>New Password</span>
                                    </label>
                                </div>
                                <div className='login-email pass-confirm-input'>
                                    <label className='form-email'>
                                        <input
                                            value={userPassword.confirmPassword}
                                            onChange={(e) => setUserPassword({...userPassword, confirmPassword: e.target.value})}
                                            type="password"
                                            placeholder="Enter Confirm Password"
                                            className='form-email-input tag-input'
                                        />
                                        <span className='form-email-label'>Confirm Password</span>
                                    </label>
                                </div>
                            </div>
                            <div className='password-buttons'>
                                <button
                                    type="button"
                                    onClick={clearPassword}
                                    className='account-profile-btn-delete pass-btn-cancel'><span>Cancel</span></button>
                                <button
                                    type="button"
                                    onClick={() => changePassword(userPassword)}
                                    className='account-profile-btn-change pass-btn-save'><span>Save</span></button>
                            </div>
                        </div>
                        <div className='account-delete'>
                            <div className='account-delete-title'>Delete account</div>
                            <button
                                type="button"
                                onClick={deleteUser}
                                className='account-profile-btn-delete btn-delete'><span>Delete Account</span></button>
                        </div>
                        <div className='account-btn'>
                            <button type="button" onClick={() => props.setOpenSettings(false)} className='account-btn-cancel'>Cancel</button>
                            <button type="button" onClick={() => changeUser(userInfo, userData)} className='account-btn-update'>Update</button>
                        </div>
                    </div>
                    {props.children}
                </Box>
            </div>
        </form>
    );
};

export default Settings;