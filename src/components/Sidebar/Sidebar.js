import React, { useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "../../redux/actions/taskActionCreator";
import {useNavigate} from "react-router";
import "./Sidebar.scss";
import {ReactComponent as ReactLogo} from "../../assets/images/logo.svg"
import UserTags from "../Tags/UserTags";
import UserCategories from "../Categories/UserCategories";
import man from '../../assets/images/modal-laptop-man.svg'
import {Badge} from "@material-ui/core";
import {Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import Settings from "../modals/Settings/Settings";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {ReactComponent as BurgerMenu} from "../../assets/images/burger.svg";


const Sidebar = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [hideTagInput, setHideTagInput] = useState(false)
    const [hideCategoryInput, setHideCategoryInput] = useState(false)

    const [openSettings, setOpenSettings] = useState(false);
    const handleOpenSettings = () => setOpenSettings(true);
    const handleCloseSettings = () => setOpenSettings(false);

    const userInfo = useSelector(store => store.userInfo.user)

    const closeAccount = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        navigate('/home')
    }
    const handleClickAway = () => {
        props.setOpenSidebar(false);
    };
    const handleClick = () => {
        props.setOpenSidebar(!props.openSidebar);
    };
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={props.openSidebar ?  'sidebar-wrap active' : 'sidebar-wrap'}>
                <BurgerMenu className='burger' onClick={handleClick}/>
                <div className={props.openSidebar ?  'sidebar active' : 'sidebar'}>
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
                        <li onClick={() => dispatch(fetchTasks())} className='tag-wrap'>ALL</li>
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
                        <li onClick={() => dispatch(fetchTasks())} className='tag-wrap'>ALL</li>
                        {<UserTags
                            setHideTagInput={setHideTagInput}
                            hideTagInput={hideTagInput}
                        />}
                    </ul>
                </div>
            </div>
            <div className="profile">
                <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
                    {userInfo.photo === null
                        ? <div className='profile-without-photo'><span>{userInfo.first_name !== undefined && userInfo.first_name[0]} {userInfo.last_name !== undefined && userInfo.last_name[0]}</span></div>
                        : <img src={man} style={{width: '44px', height:'44px', borderRadius: '50%'}} alt=""/>
                    }
                </Badge>
                <button className='profile-name'>
                    {userInfo.first_name} {userInfo.last_name !== undefined && userInfo.last_name[0] + '.'}
                </button>
                <div className='profile-box'>
                    <div className='profile-box-account'>
                        <div className='profile-box-img'>
                            {userInfo.photo === null
                                ? <div className='profile-without-photo'><span>{userInfo.first_name !== undefined && userInfo.first_name[0]} {userInfo.last_name !== undefined && userInfo.last_name[0]}</span></div>
                                : <img src={man} style={{width: '44px', height:'44px', borderRadius: '50%'}} alt=""/>
                            }
                        </div>
                        <div className='profile-box-title'>
                            <div className='profile-box-name'>
                                {userInfo.first_name} {userInfo.last_name !== undefined && userInfo.last_name[0] + '.'}
                            </div>
                            <div className='profile-box-email'>
                                {userInfo.email}
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
                                <Settings setOpenSettings={setOpenSettings}>
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
                            <span
                                onClick={closeAccount}
                                className='profile-box-settings-item'>Log out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </ClickAwayListener>
    );
};

export default Sidebar;


