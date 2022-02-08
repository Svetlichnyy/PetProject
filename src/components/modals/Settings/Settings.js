import React from 'react';
import './Settings.css'
import {Box} from "@mui/material";
import man from '../../../assets/images/modal-laptop-man.svg'

const Settings = ({children}) => {

    return (
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
                                <img src={man} style={{width: '80px', height:'80px', borderRadius: '50%'}} alt=""/>
                            </div>
                            <div className='account-profile-group-change'>
                                <button className='account-profile-btn-change'><span>Change photo</span></button>
                                <div className='account-profile-btn-change-clue'>Pick a photo up to 4MB.</div>
                            </div>
                            <button className='account-profile-btn-delete'><span>Delete</span></button>
                        </div>
                        <div className='account-inputs'>
                            <div className='login-email' style={{marginRight: '3vh'}}>
                                <label className='form-email'>
                                    <input
                                        placeholder="Enter First Name"
                                        className='form-email-input tag-input'
                                    />
                                    <span className='form-email-label'>First Name</span>
                                </label>
                            </div>
                            <div className='login-email'>
                                <label className='form-email'>
                                    <input
                                        placeholder="Enter Last Name"
                                        className='form-email-input tag-input'
                                    />
                                    <span className='form-email-label'>Last Name</span>
                                </label>
                            </div>
                        </div>
                        <div className='login-email'>
                            <label className='form-email'>
                                <input
                                    placeholder="Enter E-mail"
                                    className='form-email-input tag-input'
                                />
                                <span className='form-email-label'>E-mail</span>
                            </label>
                        </div>
                    </div>
                    <div className='account-password'>
                        <div className='account-password-title'>Password</div>
                        <button className='account-profile-btn-change btn-change'><span>Change Password</span></button>
                    </div>
                    <div className='account-delete'>
                        <div className='account-delete-title'>Delete account</div>
                        <button className='account-profile-btn-delete btn-delete'><span>Delete Account</span></button>
                    </div>
                    <div className='account-btn'>
                        <button className='account-btn-cancel'>Cancel</button>
                        <button className='account-btn-update'>Update</button>
                    </div>
                </div>
                {children}
            </Box>
        </div>
    );
};

export default Settings;