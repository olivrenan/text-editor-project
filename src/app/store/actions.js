import axios from "axios";

import * as actionTypes from "./actionTypes";

export const requestAPI = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/")
    .then(res => {
      const { todos } = getState();
      const newTodos = [...todos];

      res.data.todos.forEach(todo => newTodos.push(new Array(todo)));

      dispatch({
        type: actionTypes.ADD_TODO,
        todo: newTodos
      });
    })
    .catch(err => console.log(err));
};

export const addNewTodo = todo => (dispatch, getState) => {
  const { todos } = getState();
  const newTodo = [{ children: [...todo] }];

  axios.post("http://localhost:8000/", newTodo).then(res => console.log(res));

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

  axios.delete(`http://localhost:8000/${todo[0]._id}`);

  dispatch({
    type: actionTypes.DELETE_TODO,
    todo: newTodos
  });
};

export const updateTodo = updatedTodo => (dispatch, getState) => {
  const { todos } = getState();
  let newTodos;

  axios.patch(`http://localhost:8000/${updatedTodo[0]._id}`, {
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
