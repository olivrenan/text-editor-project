import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import React, { useState } from "react";

import { login } from "../services/auth/actions";
import Loading from "../components/Loading";
import Header from "../components/Header";

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogged = useSelector(({ auth }) => auth.jwt !== null);

  return (
    <div className="login">
      <Header />
      <main>
        {isLogged ? (
          <Loading />
        ) : (
          <div className="login-box">
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
            <button onClick={() => login(email, password)}>Login</button>
            <p className="app__owner">© 2020 by Renan Oliveira</p>
          </div>
        )}
      </main>
    </div>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(null, mapDispatchToProps)(LoginPage);
