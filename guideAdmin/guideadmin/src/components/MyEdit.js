import React, { useState, useEffect } from "react";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";

function MyEdit(props) {
  const [editor, setEditor] = useState(null); // 存储 editor 实例
  const [html, setHtml] = useState();
  const { getMsg } = props;
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml();
    }, 1500);
  }, []);

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
    MENU_CONF: {},
  };

  // 及时销毁 editor

  const htmlChanged = (editor) => {
    setHtml(editor.getHtml());
    getMsg(editor.getHtml());
  };
  editorConfig.MENU_CONF["uploadImage"] = {
    server: "api/api/upload_img",
    maxFileSize: 1 * 1024 * 1024,
    maxNumberOfFiles: 10,
    allowedFileTypes: ["image/*"],
    timeout: 5 * 1000,
  };
  return (
    <>
      <div>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="simple"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          style={{ height: "500px", overflowY: "hidden" }}
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => htmlChanged(editor)}
          mode="simple"
        />
      </div>
    </>
  );
}

export default MyEdit;
