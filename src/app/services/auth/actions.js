import axios from "axios";

import * as actionTypes from "./actionTypes";

export const login = (userEmail, password) => async (dispatch, getState) => {
  const { _id, jwt, email, role, name } = getState().auth;

  if (!jwt) {
    const localAuth = localStorage.getItem("auth");

    if (!localAuth) {
      try {
        const result = await axios({
          method: "post",
          url: "http://localhost:8000/api/users/login",
          headers: {
            "Content-Type": "application/json"
          },
          data: { email: userEmail, password },
          withCredentials: true
        });

        const jwt = result.data.token;
        const { _id, email, name, role } = result.data.data.user;
        localStorage.setItem(
          "auth",
          JSON.stringify({ _id, jwt, email, role, name })
        );

        dispatch({
          type: actionTypes.LOGIN,
          data: { _id, jwt, email, name, role }
        });
      } catch (error) {
        console.log("ACTION Login ERROR: ", error.response?.data);
      }
    } else {
      dispatch({
        type: actionTypes.LOGIN,
        data: { _id, jwt, email, name, role }
      });
    }
  }
};

export const isLoggedIn = () => async dispatch => {
  const localAuth = localStorage.getItem("auth");

  if (!localAuth) return;

  const { _id, jwt, email, role, name } = JSON.parse(localAuth);

  dispatch({
    type: actionTypes.LOGIN,
    data: { _id, jwt, email, name, role }
  });
};

export const logout = () => async dispatch => {
  try {
    await axios({
      method: "get",
      url: "http://localhost:8000/api/users/logout"
    });

    localStorage.removeItem("auth");

    dispatch({
      type: actionTypes.LOGOUT
    });
  } catch (error) {
    console.log("ACTION Login ERROR: ", error.response?.data);
  }
};

export const signup = () => {};
