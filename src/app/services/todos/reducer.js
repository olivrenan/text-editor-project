import {
  ADD_TODO,
  UPDATE_TODO,
  UPDATE_POSITION,
  DELETE_TODO,
  FETCH_TODO
} from "./actionTypes";

const initialState = {
  todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: action.todo };
    case FETCH_TODO:
      return { todos: action.todo };
    case UPDATE_TODO:
      return { ...state, todos: action.todo };
    case UPDATE_POSITION:
      return { ...state, todos: action.todo };
    case DELETE_TODO:
      return { ...state, todos: action.todo };
    default:
      return { ...state };
  }
};
