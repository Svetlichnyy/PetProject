import React, { useEffect } from 'react';
import {fetchCategories, setUserCategories} from "../../redux/actions/categoryActionCreator";
import { useSelector, useDispatch } from 'react-redux'
import axiosApi from '../../axios/api'
import Category from "./Category";
import {setError} from "../../redux/actions/alertsActionCreator";
const UserCategories = (props) => {

    const hide = () => props.setHideCategoryInput(false)
    const userCategories = useSelector((state) => state.userCategories.categories)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    const addCategory = async (e) => {
        if (e.key === "Enter") {
            if (e.target.value.length > 0) {
                try {
                    const response = await axiosApi.post('/category', { title: e.target.value })
                    hide();
                    dispatch(setUserCategories([...userCategories, response.data]))
                    // console.log(response.data)
                } catch (err) {
                    dispatch(setError(true))
                    console.log('ERROR in posting Category data')
                }

            }
            else {
                hide()
            }
            e.target.value = "";
        }
    }
    const editCategory = async (categoryId,data) =>{
        console.log(data)
        try{
            const response = await axiosApi.put(`/category/${categoryId}`, {...data})
            console.log(response)
        }
        catch(err){
            dispatch(setError(true))
            console.log('Error in editing Category')
        }
    }
    const deleteCategory = async (categoryId) => {
        console.log(categoryId);
        try {
            const response = await axiosApi.delete(`/category/${categoryId}`)
            console.log(response)
        }
        catch (err) {
            dispatch(setError(true))
            console.log(err);
            console.log('Error in deleting Category')
        }
        const newUserCategories = userCategories.filter((category) => category.id !== categoryId)
        setUserCategories(newUserCategories)
        dispatch(setUserCategories(newUserCategories))
    }

    const categories = userCategories.map((data) => {
        return (
            <Category
                key={data.id + data.title}
                data={data}
                setUserCategories={setUserCategories}
                userCategories={userCategories}
                deleteCategory={deleteCategory}
                editCategory={editCategory}
            />
        )
    })

    return (
        <>
            {categories}
            {props.hideCategoryInput && <li>  <input id="addCategory" type="text" onKeyDown={addCategory} /></li>}
        </>
    );
};

export default UserCategories;