import { v4 as uuidv4 } from "uuid";

import * as actionTypes from "./actionTypes";

export const addNewTodo = todo => (dispatch, getState) => {
  const { todos } = getState();

  const newTodos = [...todos];
  newTodos.push([{ id: uuidv4(), children: [...todo] }]);

  console.log(newTodos);

  dispatch({
    type: actionTypes.ADD_TODO,
    todo: newTodos
  });
};
