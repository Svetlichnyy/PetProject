import { combineReducers } from 'redux';

import tagReducer from './tagReducer'
import taskReducer from './taskReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
  userTag: tagReducer,
  tasks: taskReducer,
  userCategories: categoryReducer
})