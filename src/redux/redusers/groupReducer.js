import {SAVE_ID_GROUP, SET_GROUP} from "../actions/actions";

const initialState = {
    groups: [],
    groupId: ''
}

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GROUP:
            return {
                ...state,
                groups: action.payload,
            }
        case SAVE_ID_GROUP:
            return {
                ...state,
                groupId: action.payload,
            }
        default:
            return state;
    }
}