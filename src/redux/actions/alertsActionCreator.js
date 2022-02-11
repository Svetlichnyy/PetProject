import {SET_ERROR, SET_SUCCESS} from "./actions";

export function setError(error) {
    return {
        type: SET_ERROR,
        payload: error
    }
}
export function setSuccess(success) {
    return {
        type: SET_SUCCESS,
        payload: success
    }
}