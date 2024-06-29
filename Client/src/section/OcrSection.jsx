import React, { useState } from "react";
import { AiOutlineScan } from "react-icons/ai";
// import CodeMirror from "@uiw/react-codemirror";
// import { cpp } from "@codemirror/lang-cpp";
// import { EditorView } from "codemirror";
// import { dracula } from "@uiw/codemirror-theme-dracula";
import Editor from "@monaco-editor/react";

const editorOptions = {
  wordWrap: "on",
};

function OcrSection({ onchangeHandler, code, handleRunClick }) {
  const [language, setLanguage] = useState("javascript");

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="ocr-section">
      <div className="section-title">
        <div className="section-title-text">
          <AiOutlineScan className="section-title-icon" />
          OCR
        </div>
        <div className="dropdown">
          <select onChange={onLanguageChange}>
            <option value="js" selected>
              Javascript
            </option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
        </div>
      </div>
      <div className="code-editor">
        <Editor
          className="monaco-wrapper"
          height="90vh"
          // defaultLanguage={language}
          language={language}
          defaultValue=""
          theme="vs-dark"
          options={editorOptions}
          value={code}
          onChange={(e) => {
            onchangeHandler(e);
          }}
        />
        {/* <CodeMirror
          height="100%"
          theme={dracula}
          extensions={[cpp(), EditorView.lineWrapping]}
          lineWrapping="true"
          className="codemirror-wrapper"
          onChange={(e)=>{onchangeHandler(e)}}
          value={code} 
          // onChangeCapture={(e)=>{onchangeHandler(e)}}
        /> */}
      </div>
      <div className="ocr-btns">
        <div className="compile-btn btn-primary" onClick={handleRunClick}>
          Compile
        </div>
        {/* <div className="prettify-btn btn-secondary">Prettify</div> */}
      </div>
    </div>
  );
}

export default OcrSection;
