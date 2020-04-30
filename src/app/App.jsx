import { connect } from "react-redux";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";

import EditorModal from "./components/EditorModal";
import RenderTodos from "./components/RenderTodos";
import { requestAPI } from "./store/actions";

const App = ({ todos, requestAPI }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Todo List Application</h1>
        <p className="app--owner">© 2020 by Renan Oliveira</p>
        <div className="user-actions">
          <p className="login">Login</p>
          <p>|</p>
          <p className="signup">Sign Up</p>
        </div>
      </header>
      <div className="content">
        <Modal
          className="modal"
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <EditorModal handleClose={() => setIsOpen(false)} />
        </Modal>
        <div className="render-todos">
          {todos.map((todo, index) => (
            <RenderTodos todo={todo} key={index} />
          ))}
        </div>
      </div>
      <button className="action-button" onClick={() => setIsOpen(true)}>
        <i className="material-icons">add</i>
      </button>
    </div>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestAPI }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
