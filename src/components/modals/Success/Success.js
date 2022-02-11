import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSuccess} from "../../../redux/actions/alertsActionCreator";
import "./Success.scss"
import {Modal} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

const Success = () => {

    const dispatch = useDispatch()

    const success = useSelector(store => store.alerts.success)

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (success === true){setOpen(true)}
        if (success === false){setOpen(false)}
    }, [success])

    return (
        <Modal
            open={open}
            onClose={() => dispatch(setSuccess(false))}
        >
            <div className='success-wrap'>
                <div className="success">
                    <CloseIcon style={{ color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer' }} onClick={() => dispatch(setSuccess(false))} />
                        <div className="image"/>
                    <div className="success-items">
                        <h3>Success</h3>
                        <div>Your action successfully completed!</div>
                        <button onClick={() => dispatch(setSuccess(false))}><span>Okay</span></button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Success;