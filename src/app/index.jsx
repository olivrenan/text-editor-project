import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "../styles/styles.scss";

const renderApp = () => {
  render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
};

renderApp();
