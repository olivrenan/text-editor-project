import axios from "axios";

import * as actionTypes from "./actionTypes";

export const requestAPI = () => async (dispatch, getState) => {
  const { todos } = getState().todos;
  const newTodos = [...todos];

  try {
    const result = await axios.get("http://localhost:8000/api/todos");

    result.data.todos.forEach(todo => newTodos.push(new Array(todo)));

    dispatch({
      type: actionTypes.ADD_TODO,
      todo: newTodos
    });
  } catch (error) {
    console.log(error);
  }
};

export const addNewTodo = todo => (dispatch, getState) => {
  const { todos } = getState();
  const newTodo = [{ children: [...todo] }];

  axios
    .post("http://localhost:8000/api/todos", newTodo)
    .then(res => console.log(res));

  const newTodos = [...todos];
  newTodos.push(todo);

  dispatch({
    type: actionTypes.ADD_TODO,
    todo: newTodos
  });
};

export const deleteTodo = todo => (dispatch, getState) => {
  const { todos } = getState();
  const newTodos = [...todos].filter(element => todo[0]._id !== element[0]._id);

  axios.delete(`http://localhost:8000/api/todos/${todo[0]._id}`);

  dispatch({
    type: actionTypes.DELETE_TODO,
    todo: newTodos
  });
};

export const updateTodo = updatedTodo => (dispatch, getState) => {
  const { todos } = getState();
  let newTodos;

  axios.patch(`http://localhost:8000/api/todos/${updatedTodo[0]._id}`, {
    children: [...updatedTodo[0].children]
  });

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
