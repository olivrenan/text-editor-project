import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { Switch, Route } from "react-router";
import React, { useEffect } from "react";

import { isLoggedIn } from "./services/auth/actions";
import RootPage from "./pages/RootPage";
import LoginPage from "./pages/LoginPage";
import { requestAPI } from "./services/todos/actions";

const App = ({ isLoggedIn, requestAPI }) => {
  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLogged = useSelector(({ auth }) => auth.jwt !== null);

  useEffect(() => {
    if (isLogged) requestAPI();
  }, [isLogged]);

  return (
    <div className="app">
      <Switch>
        <Route
          path="/"
          component={() => (isLogged ? <RootPage /> : <LoginPage />)}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ todos }) => ({ todos: todos.todos });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ isLoggedIn, requestAPI }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
