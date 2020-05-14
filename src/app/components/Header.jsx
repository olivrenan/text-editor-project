import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import React from "react";

import { logout } from "../services/auth/actions";

const Header = ({ logout }) => {
  const isLogged = useSelector(({ auth }) => auth.jwt !== null);

  return (
    <header>
      <h1>Todo List Application</h1>
      {isLogged ? (
        <div className="user-actions">
          <div className="logout" onClick={() => logout()}>
            Logout
          </div>
        </div>
      ) : null}
    </header>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchToProps)(Header);
