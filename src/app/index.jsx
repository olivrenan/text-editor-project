import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "react-dom";
import axios from "axios";
import React from "react";
import Modal from "react-modal";

import "../styles/styles.scss";
import App from "./App";
import store from "./store";

const initAxios = store => {
  axios.interceptors.response.use(
    response =>
      // Do something with response data
      response,
    error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status == 401 || error.response.status == 403) {
          store.dispatch({ type: "RESET" });
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      return Promise.reject(error);
    }
  );
};

initAxios(store);

const appElement = document.getElementById("modal");

Modal.setAppElement("#modal");

const renderApp = () => {
  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById("root")
  );
};

renderApp(appElement);
