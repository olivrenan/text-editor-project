import axios from "axios";

import * as actionTypes from "./actionTypes";
import Notify from "../../helpers/notify";

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

        Notify.success("Login successfully!");

        dispatch({
          type: actionTypes.LOGIN,
          data: { _id, jwt, email, name, role }
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development")
          console.log("ACTION Login ERROR: ", error.response?.data);

        if (error.response?.status === 401) {
          Notify.error("Unauthorized login");
        } else {
          Notify.error("Error logging in!");
        }
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
    if (process.env.NODE_ENV === "development")
      console.log("ACTION Login ERROR: ", error.response?.data);
    Notify.error("Error logging out");
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

    Notify.success("Registred user!");

    dispatch({
      type: actionTypes.SIGNUP,
      data: { name, email, jwt, _id, role }
    });

    const { status } = result.data;
    return status;
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.log("ACTION Signup ERROR: ", error.response?.data);
    Notify.error("Error when registering");
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
    if (process.env.NODE_ENV === "development")
      console.log("ACTION getMe ERROR: ", error.response?.data);
    Notify.error("Error fetching user data");
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

    Notify.success("Data updated successfully!");

    dispatch({
      type: actionTypes.UPDATEUSER,
      data: { name, email }
    });
  } catch (error) {
    console.log("ACTION updateUser ERROR: ", error.response?.data);
    Notify.error("Error updating user data");
  }
};

export const updatePassword = (
  passwordCurrent,
  password,
  passwordConfirm
) => async () => {
  try {
    await axios({
      method: "patch",
      url: "http://localhost:8000/api/users/updateMyPassword",
      headers: {
        "Content-Type": "application/json"
      },
      data: { passwordCurrent, password, passwordConfirm },
      withCredentials: true
    });

    Notify.success("Password updated successfully!");
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.log("ACTION updatePassword ERROR: ", error.response?.data);
    Notify.error("Error updating user password");
  }
};
