import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";

import { updatePassword, updateUser, getMe } from "../services/auth/actions";
import Header from "../components/Header";

const MePage = ({ auth, updateUser, updatePassword, getMe }) => {
  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="me-page">
      <Header title="User Configurations" />
      <div className="me-page__box box">
        <div className="me-page__box-labels"></div>
        <div className="me-page__box-labels--config">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="btn" onClick={() => updateUser(name, email)}>
            Update Me
          </button>
        </div>

        <div className="me-page__box-labels--password">
          <label htmlFor="password">Current Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            onChange={e => setNewPassword(e.target.value)}
          />
          <label htmlFor="newPasswordConfirm">Confirm New Password:</label>
          <input
            type="password"
            name="newPasswordConfirm"
            id="newPasswordConfirm"
            onChange={e => setNewPasswordConfirm(e.target.value)}
          />
          <button
            className="btn"
            onClick={() =>
              updatePassword(currentPassword, newPassword, newPasswordConfirm)
            }
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUser, updatePassword, getMe }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MePage);
