import { bindActionCreators } from "redux";
import { ToastContainer } from "react-toastify";
import { connect, useSelector } from "react-redux";
import { Switch, Route } from "react-router";
import React, { useEffect } from "react";

import { isLoggedIn } from "./services/auth/actions";
import { requestAPI } from "./services/todos/actions";
import LoginPage from "./pages/LoginPage";
import MePage from "./pages/MePage";
import RegisterPage from "./pages/RegisterPage";
import RootPage from "./pages/RootPage";

const App = ({ isLoggedIn, requestAPI }) => {
  useEffect(() => {
    isLoggedIn();
  }, []);

  const CloseButton = () => <i className="material-icons">close</i>;

  const isLogged = useSelector(({ auth }) => auth.jwt !== null);

  useEffect(() => {
    if (isLogged) requestAPI();
  }, [isLogged]);

  return (
    <div className="app">
      <Switch>
        <Route
          path="/"
          exact
          component={() => (isLogged ? <RootPage /> : <LoginPage />)}
        />
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/me">
          <MePage />
        </Route>
      </Switch>
      <ToastContainer closeButton={CloseButton} />
    </div>
  );
};

const mapStateToProps = ({ todos }) => ({ todos: todos.todos });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ isLoggedIn, requestAPI }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
