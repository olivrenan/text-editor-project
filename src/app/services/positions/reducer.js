import { SET_POSITION } from "./actionTypes";

const initialState = {
  positions: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSITION:
      return { ...state, positions: action.positions };
    default:
      return { ...state };
  }
};
