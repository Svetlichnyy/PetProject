import { SET_TODOS, SAVE_ID, EDIT_TODO } from "../actions/actions";
import category from "../../components/Categories/Category";

const initialState = {
  tasks: [],
  toDoId: ''
}

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        tasks: action.payload,
      }
    case SAVE_ID:
      return {
        ...state,
        toDoId: action.payload,
      }
    case EDIT_TODO:
      return {
        ...state,
        tasks:action.payload,
      };
    default:
      return state;
  }
}