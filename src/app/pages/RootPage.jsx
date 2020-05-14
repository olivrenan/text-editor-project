import { connect } from "react-redux";
import Modal from "react-modal";
import React, { useState } from "react";

import EditorModal from "../components/EditorModal";
import Header from "../components/Header";
import RenderTodos from "../components/RenderTodos";

const RootPage = ({ todos }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className="app__page">
      <Header />
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

const mapStateToProps = ({ todos }) => ({ todos: todos.todos });

export default connect(mapStateToProps)(RootPage);
