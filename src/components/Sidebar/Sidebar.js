import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import {ReactComponent as ReactLogo} from "../../assets/images/logo.svg"
import UserTags from "../Tags/UserTags";
import axiosApi from "../../axios/api";
import UserCategories from "../Categories/UserCategories";
import man from '../../assets/images/modal-laptop-man.svg'
import {Badge} from "@material-ui/core";
import {Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import Settings from "../modals/Settings/Settings";



const Sidebar = () => {

    const [hideTagInput, setHideTagInput] = useState(false)
    const [hideCategoryInput, setHideCategoryInput] = useState(false)

    const [openSettings, setOpenSettings] = useState(false);
    const handleOpenSettings = () => setOpenSettings(true);
    const handleCloseSettings = () => setOpenSettings(false);


    return (
        <div className='sidebar'>
            <div className="logo">
            <ReactLogo />
            </div>
            <div className="filter">
                <div className="category">
                    <div className="add-category">
                        <label htmlFor="addCategory" onClick={() =>
                        {setHideCategoryInput(!hideCategoryInput)
                        }}>
                            <div className="label-click">
                                <span >CATEGORY </span>
                            </div>
                        </label>
                    </div>
                    <ul className="category-items">
                        {<UserCategories
                            setHideCategoryInput={setHideCategoryInput}
                            hideCategoryInput={hideCategoryInput}
                        />}
                    </ul>
                </div>
                    <div className="tags">
                        <label htmlFor="addTag" onClick={() =>
                        {setHideTagInput(!hideTagInput)
                        }}>
                            <div className="label-click">
                        <span >TAGS </span>
                            </div>
                        </label>
                        <ul className='tags-list'>
                            {<UserTags
                                setHideTagInput={setHideTagInput}
                                hideTagInput={hideTagInput}
                            />}
                        </ul>
                    </div>
            </div>
            <div className="profile">
                <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
                    <img src={man} style={{width: '44px', height:'44px', borderRadius: '50%'}} alt=""/>
                </Badge>
                <button className='profile-name'>Whitney A.</button>
                <div className='profile-box'>
                    <div className='profile-box-account'>
                        <div className='profile-box-img'>
                            <img src={man} style={{width: '44px', height:'44px', borderRadius: '50%'}} alt=""/>
                        </div>
                        <div className='profile-box-title'>
                            <div className='profile-box-name'>
                                Whitney A.
                            </div>
                            <div className='profile-box-email'>
                                Whitneya@gmail.com
                            </div>
                        </div>
                    </div>
                    <div className='profile-box-function'>
                        <div onClick={handleOpenSettings} className='profile-box-settings'>
                            <SettingsIcon style={{color: 'grey', position: 'absolute'}} />
                            <span className='profile-box-settings-item'>Settings</span>
                        </div>
                        <Modal
                            open={openSettings}
                            onClose={handleCloseSettings}
                        >
                            <>
                                <Settings>
                                    <CloseIcon style={{color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer'}} onClick={handleCloseSettings}  />
                                </Settings>
                            </>
                        </Modal>
                        <div className='profile-box-notifications'>
                            <NotificationsNoneIcon style={{color: 'grey', position: 'absolute'}} />
                            <span className='profile-box-settings-item'>Notifications</span>
                        </div>
                        <div className='profile-box-logout'>
                            <LogoutIcon style={{color: 'grey', position: 'absolute', transform:'rotate(180deg)'}} />
                            <span className='profile-box-settings-item'>Log out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;


