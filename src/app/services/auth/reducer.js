import { LOGIN, LOGOUT, SIGNUP, UPDATEUSER } from "./actionTypes";

const initialState = {
  _id: null,
  email: null,
  name: null,
  role: null,
  jwt: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.data };
    case SIGNUP:
      return { ...state, ...action.data };
    case UPDATEUSER:
      return { ...state, ...action.data };
    case LOGOUT:
      return { ...initialState };
    default:
      return { ...state };
  }
};
