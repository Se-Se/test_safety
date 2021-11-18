import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { jsonData } from "@/pages/management/mock.js";
import { Modal } from "tea-component";
import { addWindowEvent, removeWindowEvent } from "@/utils/index";

export default function ReactCodeEdit(props) {
  // eslint-disable-next-line
  const [code, setCode] = useState(JSON.stringify(jsonData, null, " "));
  useEffect(() => {});

  function resizeFn() {
    console.log(1);

    // editorDidMount()
  }
  // 窗口变化 初始化编辑器
  addWindowEvent("resize", resizeFn);

  useEffect(() => {
    return () => {
      console.log(321);
      removeWindowEvent("resize", resizeFn);
    };
  });

  function editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    // editor.focus();
    // editor.automaticLayout()
  }
  function onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }

  function close() {
    props.close();
  }
  const scollorbarOption = {
    // verticalSliderSize: 5,
  };
  const options = {
    selectOnLineNumbers: false,
    readOnly: true,
    automaticLayout: true, //编辑器随窗口变化
    codeLens: false,
    folding: false, //是否显示折叠
    scrollbar: scollorbarOption,
  };

  return (
    <Modal
      visible={props.show}
      className="code-modal"
      onClose={close}
      caption="查看json"
    >
      <Modal.Body>
        <hr />
        <MonacoEditor
          className="monaco-edit"
          height="600"
          language="json"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </Modal.Body>
    </Modal>
  );
}
