import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import React, { useCallback, useMemo } from "react";

import { deleteTodo } from "../store/actions";
import Element from "./Element";
import Leaf from "./Leaf";
import Popover from "./Popover";

const RenderTodos = ({ todo, deleteTodo }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <div className="editor">
      <Popover
        icon="more_vert"
        listChildren={["Edit", "Delete"]}
        actionsArray={[() => {}, () => deleteTodo(todo)]}
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
