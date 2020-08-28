import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import React, { useState } from "react";

import { login } from "../services/auth/actions";
import Loading from "../components/Loading";
import Header from "../components/Header";

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogged = useSelector(({ auth }) => auth.jwt !== null);

  return (
    <Route>
      <div className="login-page">
        <Header />
        <main>
          {isLogged ? (
            <Loading />
          ) : (
            <div className="login-page__box box">
              <div className="login-page__box-labels">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={e => setEmail(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === "Enter") login(email, password);
                  }}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === "Enter") login(email, password);
                  }}
                />
              </div>

              <div className="login-page__box-actions">
                <Link to="/register" className="link">
                  Register
                </Link>
                <button className="btn" onClick={() => login(email, password)}>
                  Login
                </button>
              </div>
              <p className="app__owner">© 2020 by Renan Oliveira</p>
            </div>
          )}
        </main>
      </div>
    </Route>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(null, mapDispatchToProps)(LoginPage);
