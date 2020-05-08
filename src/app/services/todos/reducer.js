import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./actionTypes";

const initialState = {
  todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: action.todo };
    case UPDATE_TODO:
      return { ...state, todos: action.todo };
    case DELETE_TODO:
      return { ...state, todos: action.todo };
    default:
      return { ...state };
  }
};
