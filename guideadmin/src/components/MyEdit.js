import React, { useState, useEffect } from "react";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { BASE_URL } from "../Utils/config";

function MyEdit(props) {
  const [editor, setEditor] = useState(null); // 存储 editor 实例
  const [html, setHtml] = useState();
  const { getMsg, initHtml } = props;
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {

    setHtml(initHtml);

  }, [initHtml]);

  useEffect(
    ()=>{
      console.log(editorConfig.MENU_CONF["uploadImage"].server);
      
      return () => {
        console.log(editorConfig.MENU_CONF["uploadImage"].server);
      }
    },
   []);

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
    server: BASE_URL + "/api/articles/upload_img",
    maxFileSize: 3 * 1024 * 1024,
    maxNumberOfFiles: 10,
    allowedFileTypes: ["image/*"],
    timeout: 5 * 1000,
  };


  return (
    <>
       

      <div className="editor">
      <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="simple"
          className = "toolBar"
         />

        <Editor
          style={{ width: '600px', height:'75vh'}}
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
