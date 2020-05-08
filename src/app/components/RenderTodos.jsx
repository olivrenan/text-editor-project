import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import Modal from "react-modal";
import React, { useCallback, useMemo, useState } from "react";

import { deleteTodo } from "../services/todos/actions";
import EditorModal from "./EditorModal";
import Element from "./Element";
import Leaf from "./Leaf";
import Popover from "./Popover";

const RenderTodos = ({ todo, deleteTodo }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <div className="editor">
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <EditorModal
          handleClose={() => setIsOpen(false)}
          initialValue={todo}
          updateEnable
        />
      </Modal>
      <Popover
        icon="more_vert"
        listChildren={["Edit", "Delete"]}
        actionsArray={[() => setIsOpen(true), () => deleteTodo(todo)]}
      />
      <Slate editor={editor} value={todo}>
        <Editable
          readOnly
          className="editor-text"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteTodo }, dispatch);

export default connect(null, mapDispatchToProps)(RenderTodos);
