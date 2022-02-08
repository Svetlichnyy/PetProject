import React, { useState } from 'react';
import { ReactComponent as EditPenIcon } from "../../assets/images/bx-edit-alt.svg";
import { ReactComponent as TrashCanIcon } from "../../assets/images/bx-trash.svg";

const Tag = (props) => {

    const [tagData, setTagData] = useState('')
    const [isEdit, setEdit] = useState(false);

    // console.log(data)
    function handleEditClick(e) {
        e.preventDefault();
        setTagData(props.data.title);
        setEdit(true);
        // console.log(editTagId)
    }
    function editHandler(e) {
        if (e.key === 'Enter') {
            props.data.title = tagData;
            setEdit(false);
            props.editTag(props.data.id, props.data)
        }
    }
    const deleteHandler = (e) => {
        e.preventDefault();
        props.deleteTag(props.data.id);
    }



    return (
        <li key={props.data.id} className='tag-wrap'>
            {isEdit
                ? <>
                    <input type="text"
                        // onBlur={() =>setEdit(false)}
                        value={tagData}
                        onKeyPress={(e) => editHandler(e)}
                        onChange={(e) => setTagData(e.target.value)} />
                </>
                : <>
                    {props.data.title}
                    <label
                        onClick={(event) => handleEditClick(event)}
                        className="edit"
                    >
                        <EditPenIcon />
                        <button style={{ display: 'none' }} > </button>
                    </label>

                    <label onClick={deleteHandler} className="delete">
                        <TrashCanIcon />
                        <button style={{ display: 'none' }} />
                    </label>
                </>
            }
        </li>
    );
};

export default Tag;