import { SET_TAGS } from "../actions/actions";

const initialState = {
  tags: [],
}

export default function tagReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload,
      }
    default:
      return state;
  }
}