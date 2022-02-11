import { combineReducers } from 'redux';

import tagReducer from './tagReducer'
import taskReducer from './taskReducer'
import categoryReducer from './categoryReducer'
import groupReducer from "./groupReducer";
import userReducer from "./userReducer";
import alertsReducer from "./alertsReducer";

export default combineReducers({
  userTag: tagReducer,
  tasks: taskReducer,
  userCategories: categoryReducer,
  groups: groupReducer,
  userInfo: userReducer,
  alerts: alertsReducer
})