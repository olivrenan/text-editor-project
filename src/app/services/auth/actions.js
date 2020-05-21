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

export const signup = (
  name,
  email,
  password,
  passwordConfirm
) => async dispatch => {
  try {
    const result = await axios({
      method: "post",
      url: "http://localhost:8000/api/users/signup",
      headers: {
        "Content-Type": "application/json"
      },
      data: { name, email, password, passwordConfirm },
      withCredentials: true
    });

    const jwt = result.data.token;
    const { _id, role } = result.data.data.user;

    localStorage.setItem(
      "auth",
      JSON.stringify({ _id, jwt, email, role, name })
    );

    dispatch({
      type: actionTypes.SIGNUP,
      data: { name, email, jwt, _id, role }
    });

    const { status } = result.data;
    return status;
  } catch (error) {
    console.log("ACTION Signup ERROR: ", error.response?.data);
  }
};

export const getMe = () => async (dispatch, getState) => {
  const { jwt } = getState().auth;

  try {
    const result = await axios({
      method: "get",
      url: "http://localhost:8000/api/users/me",
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    const { _id, email, role, name } = result.data.data.data;

    localStorage.setItem(
      "auth",
      JSON.stringify({ _id, jwt, email, role, name })
    );

    dispatch({
      type: actionTypes.UPDATEUSER,
      data: { name, email }
    });
  } catch (error) {
    console.log("ACTION getMe ERROR: ", error.response?.data);
  }
};

export const updateUser = (name, email) => async dispatch => {
  try {
    await axios({
      method: "patch",
      url: "http://localhost:8000/api/users/updateMe",
      headers: {
        "Content-Type": "application/json"
      },
      data: { name, email },
      withCredentials: true
    });

    dispatch({
      type: actionTypes.UPDATEUSER,
      data: { name, email }
    });
  } catch (error) {
    console.log("ACTION updateUser ERROR: ", error.response?.data);
  }
};

export const updatePassword = (
  passwordCurrent,
  password,
  passwordConfirm
) => async () => {
  try {
    const result = await axios({
      method: "patch",
      url: "http://localhost:8000/api/users/updateMyPassword",
      headers: {
        "Content-Type": "application/json"
      },
      data: { passwordCurrent, password, passwordConfirm },
      withCredentials: true
    });

    console.log(result);
  } catch (error) {
    console.log("ACTION updatePassword ERROR: ", error.response?.data);
  }
};
