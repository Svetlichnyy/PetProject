import axiosApi from '../../axios/api';
import {SAVE_ID_GROUP, SET_GROUP} from "./actions";
import {setError, setSuccess} from "./alertsActionCreator";

export function fetchGroups() {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get('/group');
            dispatch(setGroups(response.data));
        } catch (err) {
            dispatch(setError(true))
            console.log(err);
        }
    };
}

export function setGroups(group) {
    return {
        type: SET_GROUP,
        payload: group
    }
}

export function saveId(id) {
    return {
        type: SAVE_ID_GROUP,
        payload: id
    }
}

export function editGroup(groupId,groupList,groupData){
    return async (dispatch) => {
        try {
            const response = await axiosApi.put(`/group/${groupId}`, {
                title: groupData,
            })
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
            dispatch(setSuccess(true))
        }
        catch(err){
            console.log(err)
            dispatch(setError(true))
            console.log('Error in editing group')
        }
    }
}

export function deleteGroup(groupId,groupList){
    return async (dispatch) => {
        try{
            const response = await axiosApi.delete(`/group/${groupId}`)
            const newGroupList = groupList.filter((task) => task.id !== groupId);
            setGroups(newGroupList);
            dispatch(setGroups(newGroupList));
            dispatch(setSuccess(true))
        }
        catch(err){
            dispatch(setError(true))
            console.log(err)
            console.log('Error in deleting group')
        }
    }
}