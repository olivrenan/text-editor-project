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
