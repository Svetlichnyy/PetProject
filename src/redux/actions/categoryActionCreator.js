import axiosApi from '../../axios/api';
import { SET_CATEGORIES } from "./actions";

export function fetchCategories() {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get('/category');
            dispatch(setUserCategories(response.data));
        } catch (err) {
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