import React, { useState } from 'react';
import { ReactComponent as EditPenIcon } from "../../assets/images/bx-edit-alt.svg";
import { ReactComponent as TrashCanIcon } from "../../assets/images/bx-trash.svg";
import {useDispatch} from "react-redux";
import {sortTasks} from "../../redux/actions/taskActionCreator";

const Tag = (props) => {

    const dispatch = useDispatch()
    const [categoryData, setCategoryData] = useState('')
    const [isEdit, setEdit] = useState(false);

    // console.log(data)
    function handleEditClick(e) {
        e.preventDefault();
        setCategoryData(props.data.title);
        setEdit(true);
        // console.log(editTagId)
    }
    function editHandler (e) {
        if(e.key === 'Enter') {
            props.data.title = categoryData;
            setEdit(false);
            props.editCategory(props.data.id ,props.data)
        }
    }
    const deleteHandler = (e) => {
        e.preventDefault();
        props.deleteCategory(props.data.id);
    }



    return (
        <li onClick={() => dispatch(sortTasks(undefined,undefined,undefined, props.data.id))} key={props.data.id} className='tag-wrap'>
            {isEdit
                ? <input type="text"
                    // onBlur={() =>setEdit(false)}
                         value={categoryData}
                         onKeyPress={(e)=> editHandler(e)}
                         onChange={(e) => setCategoryData(e.target.value)} />
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