import { LOGIN, LOGOUT } from "./actionTypes";

const initialState = {
  jwt: null,
  email: null,
  role: null,
  name: null,
  _id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.data };
    case LOGOUT:
      return { jwt: null, email: null };
    default:
      return { ...state };
  }
};
