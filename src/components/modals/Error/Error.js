import React, {useState} from 'react';
import "./Error.scss"





const Error = () => {
    const [isHidden,setHidden] = useState(true)
    return (
        <>
        { isHidden && <div onClick={() => setHidden(false)} className={'error-wrap active'}>
            <div className="error">
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
}
</>
    );
};

export default Error;