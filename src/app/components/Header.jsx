import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import React from "react";

import { logout } from "../services/auth/actions";

const Header = ({ logout, title }) => {
  const isLogged = useSelector(({ auth }) => auth.jwt !== null);

  return (
    <Route>
      <header>
        <h1>
          <Link to="/" className="link">
            Todo List Application
          </Link>
        </h1>
        <h2>{title}</h2>
        {isLogged ? (
          <div className="user-actions">
            <Link to="/me" className="link">
              User
            </Link>
            <div>|</div>
            <Link to="/" className="logout link" onClick={() => logout()}>
              Logout
            </Link>
          </div>
        ) : null}
      </header>
    </Route>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchToProps)(Header);
