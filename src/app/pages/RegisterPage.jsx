import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router";
import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import { signup, isLoggedIn } from "../services/auth/actions";

const RegisterPage = ({ signup, isLoggedIn }) => {
  useEffect(() => {
    isLoggedIn();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const isLogged = useSelector(({ auth }) => auth.jwt !== null);

  return (
    <Route>
      <div className="register-page">
        <Header />
        <div className="register-page__box box">
          <label htmlFor="name">User Name:</label>
          <input
            type="name"
            name="name"
            id="name"
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={e => setPasswordConfirm(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => signup(name, email, password, passwordConfirm)}
          >
            <Link to="/register">Register</Link>
            {isLogged ? <Redirect to="/" /> : null}
          </button>
        </div>
      </div>
    </Route>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signup, isLoggedIn }, dispatch);

export default connect(null, mapDispatchToProps)(RegisterPage);
