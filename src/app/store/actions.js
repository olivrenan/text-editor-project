import { v4 as uuidv4 } from "uuid";

import * as actionTypes from "./actionTypes";

export const addNewTodo = todo => (dispatch, getState) => {
  const { todos } = getState();

  const newTodos = [...todos];
  newTodos.push([{ id: uuidv4(), children: [...todo] }]);

  dispatch({
    type: actionTypes.ADD_TODO,
    todo: newTodos
  });
};

export const deleteTodo = todo => (dispatch, getState) => {
  const { todos } = getState();

  const newTodos = [...todos].filter(element => todo[0].id !== element[0].id);

  dispatch({
    type: actionTypes.DELETE_TODO,
    todo: newTodos
  });
};

export const updateTodo = updatedTodo => (dispatch, getState) => {
  const { todos } = getState();

  let newTodos;

  if (updatedTodo[0].children[0].children[0].text === "")
    newTodos = [...todos].filter(todo => todo[0].id !== updatedTodo[0].id);
  else
    newTodos = [...todos].map(todo =>
      todo[0].id === updatedTodo[0].id ? updatedTodo : todo
    );

  dispatch({
    type: actionTypes.UPDATE_TODO,
    todo: newTodos
  });
};
