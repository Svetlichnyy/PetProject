import axiosApi from '../../axios/api';
import { SAVE_ID, SET_TODOS } from "./actions";

export function fetchTasks() {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get('/task')
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

export function sortTasks(title, date, sort,category,tag) {
  return async (dispatch) => {
    try {
      if (title !== undefined){
        const response = await axiosApi.get(`/task/?searchTitle=${title}`)
        dispatch(setUserTasks(response.data));
      }
      if (date !== undefined){
        const response = await axiosApi.get(`/task/?searchDate=${date}`)
        dispatch(setUserTasks(response.data));
      }
      if (sort !== undefined){
        const response = await axiosApi.get(`/task/?sortOption=${sort}`)
        dispatch(setUserTasks(response.data));
      }
      if (category !== undefined){
        const response = await axiosApi.get(`/task/?categoryId=${category}`)
        dispatch(setUserTasks(response.data));
      }
      if (tag !== undefined){
        const response = await axiosApi.get(`/task/?tagId=${tag}`)
        dispatch(setUserTasks(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function editTask(todoId,todoList,ToDoData){
  const convertDate = (date) => {
    if (!date) {
      return date
    }
    else {
      date = new Date(date)
      date = new Date(date.getTime() + 3 * 60 * 60 * 1000)
      return date
    }
  }
  return async (dispatch) => {
    try {
    const response = await axiosApi.put(`/task/${todoId}`, {
      title: ToDoData.title,
      description: ToDoData.description,
      tagsTitleArray: ToDoData.tagsTitleArray,
      notificationTime: ToDoData.notificationTime,
      deadline: convertDate(ToDoData.deadline),
      categoryTitle: ToDoData.categoryTitle,
      priorityColor: ToDoData.priorityColor,
      })
      const newList = todoList.map((item) => {
        if(item.id === todoId){
          return{
            ...item,
            title:response.data.title,
            description: response.data.description,
            tags: response.data.tags,
            notification: response.data.notification,
            deadline: response.data.deadline,
            category: response.data.category,
            priority: response.data.priority,
            remind_in: response.data.remind_in,
          }
        }
        return item;
      })
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