import axiosApi from '../../axios/api';
import { SAVE_ID, SET_TODOS, EDIT_TODO } from "./actions";
import todoId from "../../components/TodoId";

export function fetchTasks() {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get('/task')
      console.log(response);
      dispatch(setUserTasks(response.data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function setUserTasks(tasks) {
  return {
    type: SET_TODOS,
    payload: tasks
  }
}
export function deleteTask(todoId,taskList){
  return async (dispatch) => {
    try{
      const response = await axiosApi.delete(`/task/${todoId}`)
      console.log(response);
      console.log(taskList)
      const newTodoList = taskList.filter((task) => task.id !== todoId);
      setUserTasks(newTodoList);
      dispatch(setUserTasks(newTodoList));
    }
    catch(err){
      console.log(err)
      console.log('Error in deleting task')
    }
  }
}

export function editTask(todoId,todoList,ToDoData){
  console.log(ToDoData)
  return async (dispatch) => {
    try {
    const response = await axiosApi.put(`/task/${todoId}`, {
      title: ToDoData.title,
      description: ToDoData.description,
      tagsTitleArray: [...ToDoData.tagsTitleArray],
      notificationTime: ToDoData.notificationTime,
      deadline: ToDoData.deadline,
      categoryTitle: ToDoData.categoryTitle,
      priorityColor: ToDoData.priorityColor,
      })
      console.log(response)
      const newList = todoList.map((item) => {
        if(item.id === ToDoData.id){
          return{
          ...item,
          title:ToDoData.title,
            description: ToDoData.description,
            tagsTitleArray: [...ToDoData.tagsTitleArray],
            notificationTime: ToDoData.notificationTime,
            deadline: ToDoData.deadline,
            categoryTitle: ToDoData.categoryTitle,
            priorityColor: ToDoData.priorityColor,
              }
        }
        return item;
      })
      setUserTasks(newList);
      dispatch(setUserTasks(newList));
    }
    catch(err){
      console.log(err)
      console.log('Error in editing Task')
    }
  }
}

export function saveId(id) {
  return {
    type: SAVE_ID,
    payload: id
  }
}