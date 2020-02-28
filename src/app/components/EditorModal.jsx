import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createEditor, Editor, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { jsx } from "slate-hyperscript";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { addNewTodo } from "../store/actions";
import { BlockButton, MarkButton } from "../helpers/Toggle";
import { ELEMENT_TAGS, HOTKEYS, TEXT_TAGS } from "../helpers/Keys";
import Element from "./Element";
import Leaf from "./Leaf";
import Toolbar from "./Toolbar";

export const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent;
  }
  if (el.nodeType !== 1) {
    return null;
  }
  if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = [...el.childNodes[0]];
  }

  const children = Array.from(parent.childNodes)
    .map(deserialize)
    .flat();

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map(child => jsx("text", attrs, child));
  }

  return children;
};

const withHtml = editor => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = data => {
    const html = data.getData("text/html");

    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

const EditorModal = ({ handleClose, addNewTodo }) => {
  const [isMounted, setIsMounted] = useState();
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Enter some text…" }]
    }
  ]);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withHtml(withReact(withHistory(createEditor()))),
    []
  );

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <div className="editor modal">
      <Slate
        editor={editor}
        value={value}
        onChange={value => (isMounted ? setValue(value) : null)}
      >
        <Toolbar className="toolbar">
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>
        <Editable
          className="editor-text"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          onKeyDown={event => {
            Object.keys(HOTKEYS).forEach(hotkey => {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            });
          }}
        />
        <button
          className="add-button"
          onClick={() => {
            addNewTodo(value);
            handleClose();
          }}
        >
          Add Note
        </button>
      </Slate>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNewTodo }, dispatch);

export default connect(null, mapDispatchToProps)(EditorModal);
