import axios from "axios";

import * as actionTypes from "./actionTypes";

export const login = (email, password) => async dispatch => {
  try {
    const result = await axios({
      method: "post",
      url: "http://localhost:8000/api/users/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: { email, password }
    });

    const jwt = result.data.token;
    const { _id, useremail, name, role } = result.data.data.user;

    dispatch({
      type: actionTypes.LOGIN,
      data: { _id, jwt, email: useremail, name, role }
    });
  } catch (error) {
    console.log("ACTION Login ERROR: ", error.response?.data);
  }
};

export const logout = () => {};

export const signup = () => {};
