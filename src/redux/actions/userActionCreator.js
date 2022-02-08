import axiosApi from '../../axios/api';
import { SET_USER } from "./actions";

const userId = localStorage.getItem('userId')

export function fetchUserInfo() {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get(`/user_info/${userId}`)
            console.log(response);
            dispatch(setUserInfo(response.data));
        } catch (err) {
            console.log(err);
        }
    };
}

export function setUserInfo(info) {
    return {
        type: SET_USER,
        payload: info
    }
}

export function editUser(userInfo, userData){
    console.log(userData)
    return async (dispatch) => {
        try {
            const response = await axiosApi.put(`/user_info/${userId}`, {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email
            })
            console.log(response)
            const newList = {
                id: userInfo.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                password: userInfo.password,
                photo: userInfo.photo,
                createdAt: userInfo.createdAt,
                updatedAt: userInfo.updatedAt
            }
            setUserInfo(newList);
            dispatch(setUserInfo(newList));
        }
        catch(err){
            console.log(err)
            console.log('Error in editing user')
        }
    }
}

export function editPassword(userPassword){
    console.log(userPassword)
    return async () => {
        try {
            const response = await axiosApi.put(`/user_info/${userId}/change_password`, {
                currentPassword: userPassword.currentPassword,
                newPassword: userPassword.newPassword,
                confirmPassword: userPassword.confirmPassword
            })
            console.log(response)
        }
        catch(err){
            console.log(err)
            console.log('Error in editing user')
        }
    }
}
