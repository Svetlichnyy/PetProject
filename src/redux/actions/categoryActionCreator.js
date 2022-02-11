import axiosApi from '../../axios/api';
import { SET_CATEGORIES } from "./actions";
import {setError} from "./alertsActionCreator";

export function fetchCategories() {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get('/category');
            dispatch(setUserCategories(response.data));
        } catch (err) {
            dispatch(setError(true))
            console.log(err);
        }
    };
}

export function setUserCategories(categories) {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}