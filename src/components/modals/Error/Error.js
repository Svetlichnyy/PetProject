import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../../../redux/actions/alertsActionCreator";
import "./Error.scss"
import {Modal} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

const Error = () => {

    const dispatch = useDispatch()

    const error = useSelector(store => store.alerts.error)

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error === true){setOpen(true)}
        if (error === false){setOpen(false)}
    }, [error])

    return (
        <Modal
            open={open}
            onClose={() => dispatch(setError(false))}
        >
         <div className={'error-wrap active'}>
            <div className="error">
                <CloseIcon style={{ color: 'grey', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer' }} onClick={() => dispatch(setError(false))} />
                <div className="error-image">
                    <span className="top-span">Error</span>
                    <div className="image">
                    </div>
                    <span className="bot-span">Error</span>
                </div>
                <div className="error-text">
                    <h3>Looks like we have a problem!</h3>
                    <span>But don’t worry, you don't need to call a doctor, we are already looking for a solution</span>
                </div>
            </div>
        </div>
        </Modal>
    );
};

export default Error;