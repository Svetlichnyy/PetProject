import axiosApi from '../../axios/api';
import { SET_TAGS } from "./actions";

export function fetchTags() {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get('/tag');
      dispatch(setUserTags(response.data));
    } catch (err) {
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