import { connect } from "react-redux";
import Modal from "react-modal";
import React, { useState } from "react";

import EditorModal from "../components/EditorModal";
import Grid from "../components/Grid";
import Header from "../components/Header";

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
        <Grid todos={todos} />
      </div>
      <button className="action-button" onClick={() => setIsOpen(true)}>
        <i className="material-icons">add</i>
      </button>
    </div>
  );
};

const mapStateToProps = ({ todos }) => ({ todos: todos.todos });

export default connect(mapStateToProps)(RootPage);
