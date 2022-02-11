import axiosApi from '../../axios/api';
import { SET_TAGS } from "./actions";
import {setError} from "./alertsActionCreator";

export function fetchTags() {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get('/tag');
      dispatch(setUserTags(response.data));
    } catch (err) {
      dispatch(setError(true))
      console.log(err);
    }
  };
}

export function setUserTags(tags) {
  return {
    type: SET_TAGS,
    payload: tags
  }
}