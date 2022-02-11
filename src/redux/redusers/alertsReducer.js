import {SET_ERROR, SET_SUCCESS} from "../actions/actions";

const initialState = {
    error: false,
    success: false
}

export default function alertsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload,
            }
        default:
            return state;
    }
}