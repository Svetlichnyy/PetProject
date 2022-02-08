import axiosApi from '../../axios/api';
import {SAVE_ID_GROUP, SET_GROUP} from "./actions";

export function fetchGroups() {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get('/group');
            console.log(response);
            dispatch(setGroups(response.data));
        } catch (err) {
            console.log(err);
        }
    };
}

export function setGroups(tags) {
    return {
        type: SET_GROUP,
        payload: tags
    }
}

export function saveId(id) {
    return {
        type: SAVE_ID_GROUP,
        payload: id
    }
}

export function editGroup(groupId,groupList,groupData){
    console.log(groupData)
    return async (dispatch) => {
        try {
            const response = await axiosApi.put(`/group/${groupId}`, {
                title: groupData,
            })
            console.log(response)
            const newList = groupList.map((item) => {
                if(item.id === groupId){
                    return{
                        ...item,
                        title: groupData
                    }
                }
                return item;
            })
            setGroups(newList);
            dispatch(setGroups(newList));
        }
        catch(err){
            console.log(err)
            console.log('Error in editing Task')
        }
    }
}

export function deleteGroup(groupId,groupList){
    return async (dispatch) => {
        try{
            const response = await axiosApi.delete(`/group/${groupId}`)
            console.log(response);
            console.log(groupList)
            const newGroupList = groupList.filter((task) => task.id !== groupId);
            setGroups(newGroupList);
            dispatch(setGroups(newGroupList));
        }
        catch(err){
            console.log(err)
            console.log('Error in deleting group')
        }
    }
}