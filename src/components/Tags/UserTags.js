import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axiosApi from '../../axios/api'
import { fetchTags, setUserTags } from '../../redux/actions/tagActionCreator';
import Tag from "./Tag";
// import Error from "../../components/modals/Error";

const UserTags = (props) => {

    const hide = () => props.setHideTagInput(false)
    const userTags = useSelector((state) => state.userTag.tags);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    const addTag = async (e) => {
        if (e.key === "Enter") {
            if (e.target.value.length > 0) {
                try {
                    const response = await axiosApi.post('/tag', { title: e.target.value })
                    hide();
                    dispatch(setUserTags([...userTags, response.data]))
                    // console.log(response)
                } catch (err) {
                    console.log('ERROR in posting TAG data')
                }

            }
            else {
                hide()
            }
            // e.target.value = "";
        }
    }

    const editTag = async (tagId, data) => {
        console.log(data)
        try {
            const response = await axiosApi.put(`/tag/${tagId}`, { ...data })
            console.log(response)
        }
        catch (err) {
            console.log('Error in editing tag')
        }
    }
    const deleteTag = async (tagId) => {
        console.log(tagId);
        try {
            const response = await axiosApi.delete(`/tag/${tagId}`)
            console.log(response)
        }
        catch (err) {
            console.log(err);
            console.log('Error in deleting TAG')
        }
        const newUserTags = userTags.filter((tag) => tag.id !== tagId)
        setUserTags(newUserTags)
        dispatch(setUserTags(newUserTags))
    }

    const tags = userTags.map((data) => {
        return (
            <Tag
                key={data.id + data.title}
                data={data}
                setUserTags={setUserTags}
                userTags={userTags}
                deleteTag={deleteTag}
                editTag={editTag}
            />
        )
    })
    return (
        <>
            {tags}
            {props.hideTagInput &&
                <li>
                    <input
                        id="addTag"
                        type="text"
                        onKeyDown={addTag}
                    />
                </li>}
            {/*<Error />*/}
        </>
    );
};

export default UserTags;