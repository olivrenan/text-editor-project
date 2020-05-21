import axios from "axios";

import * as actionTypes from "./actionTypes";

export const requestAPI = () => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const newTodos = [];

  try {
    const result = await axios({
      method: "get",
      url: `http://localhost:8000/api/todos/${_id}`,
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    result.data.todos.forEach(todo => newTodos.push(new Array(todo)));

    dispatch({
      type: actionTypes.FETCH_TODO,
      todo: newTodos
    });
  } catch (error) {
    console.log("ACTION requestAPI ERROR: ", error.response?.data);
  }
};

export const addNewTodo = todo => async (dispatch, getState) => {
  const { todos } = getState().todos;
  const { _id } = getState().auth;
  const newTodo = [{ children: [...todo] }];

  try {
    await axios({
      method: "post",
      url: "http://localhost:8000/api/todos",
      data: {
        user: _id,
        children: newTodo[0].children
      },
      withCredentials: true
    });
  } catch (error) {
    console.log("ACTION addNewTodo ERROR: ", error.response?.data);
    return;
  }

  const newTodos = [...todos];
  newTodos.push(todo);

  dispatch({
    type: actionTypes.ADD_TODO,
    todo: newTodos
  });
};

export const deleteTodo = todo => async (dispatch, getState) => {
  const { todos } = getState().todos;
  const newTodos = [...todos].filter(element => todo[0]._id !== element[0]._id);

  try {
    await axios({
      method: "delete",
      url: `http://localhost:8000/api/todos/${todo[0]._id}`,
      withCredentials: true
    });
  } catch (error) {
    console.log("ACTION deleteTodo ERROR: ", error.response?.data);
    return;
  }

  dispatch({
    type: actionTypes.DELETE_TODO,
    todo: newTodos
  });
};

export const updateTodo = updatedTodo => async (dispatch, getState) => {
  const { todos } = getState().todos;
  let newTodos;

  try {
    await axios({
      method: "patch",
      url: `http://localhost:8000/api/todos/${updatedTodo[0]._id}`,
      data: {
        children: updatedTodo[0].children
      },
      withCredentials: true
    });
  } catch (error) {
    console.log("ACTION updatedTodo ERROR: ", error.response?.data);
    return;
  }

  if (updatedTodo[0].children[0].children[0].text === "")
    newTodos = [...todos].filter(todo => todo[0]._id !== updatedTodo[0]._id);
  else
    newTodos = [...todos].map(todo =>
      todo[0]._id === updatedTodo[0]._id ? updatedTodo : todo
    );

  dispatch({
    type: actionTypes.UPDATE_TODO,
    todo: newTodos
  });
};
