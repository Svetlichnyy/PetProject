import React, {useEffect, useState} from 'react';
import "./Homepage.scss"
import Header from "../../components/Header/Header";
import {ReactComponent as ReactImage} from "../../assets/images/Illustration.svg";
import {Modal} from "@mui/material";
import Form from "../../components/UI/Form/Form";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router";


const Homepage = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token){
            navigate('/')
        }
    },[open])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Header/>
            <div className="main-container">
                <div className="main-phrase">
                    <h1 className="main-text">
                        Be productive <br/> with <span>JustDo</span>
                    </h1>
                    <button onClick={handleOpen} className='larger-button'>
                        To Begin
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            <Form>
                                <CloseIcon style={{color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer'}} onClick={handleClose} />
                            </Form>
                        </>
                    </Modal>
                </div>
                <div className="main-image">
                    <ReactImage className='image'/>
                </div>
            </div>
        </div>
    );
};

export default Homepage;