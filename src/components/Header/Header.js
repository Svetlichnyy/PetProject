import CloseIcon from "@mui/icons-material/Close";
import {Modal} from "@mui/material";
import "../../circe.css"
import Form from "../UI/Form/Form.js";
import Login from "../modals/Login/Login";
import "./Header.scss"
import React, {useState} from 'react';
import {ReactComponent as ReactLogo} from "../../assets/images/logo2.svg"
import {ReactComponent as Burger} from "../../assets/images/burger.svg"

const Header = () => {

    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
    const [hidden,setHidden] = useState(true)
    const [openLogin, setOpenLogin] = useState(false);
    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    return (
        <div className="header-main">
            <div className="header-container">
                <div className="logo">
                    <ReactLogo />
                </div>
                <Burger onClick={() => setHidden(!hidden)} className='burger'/>
                <div className={hidden ? "header-sidebar" : "header-sidebar active"}>
                    <button>Opportunities</button>
                    <button>Templates</button>
                    <button>For teams</button>
                    <button>Resources</button>

                </div>
                <div className="button-container">
                    <button>Opportunities</button>
                    <button>Templates</button>
                    <button>For teams</button>
                    <button>Resources</button>
                </div>
                <div className="header-grow"/>
                <div className="header-auth-buttons">
                    <button onClick={handleOpenForm} className='outlined-button'>
                        Registration
                    </button>
                    <Modal
                        open={openForm}
                        onClose={handleCloseForm}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            <Form setOpenForm={setOpenForm} setOpenLogin={setOpenLogin}>
                                <CloseIcon style={{color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer'}} onClick={handleCloseForm} />
                            </Form>
                        </>
                    </Modal>
                    <button onClick={handleOpenLogin} className="main-button">
                        Log in
                    </button>
                    <Modal
                        open={openLogin}
                        onClose={handleCloseLogin}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            <Login setOpenForm={setOpenForm} setOpenLogin={setOpenLogin}>
                                <CloseIcon style={{color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer'}} onClick={handleCloseLogin}  />
                            </Login>
                        </>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Header;