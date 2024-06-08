import React from "react";
import { AiOutlineScan } from "react-icons/ai";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { EditorView } from "codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";

function OcrSection({ onchangeHandler, code , handleRunClick}) {
  return (
    <div className="ocr-section">
      <div className="section-title">
        <div className="section-title-text">
          <AiOutlineScan className="section-title-icon" />
          OCR
        </div>
      </div>
      <div className="code-editor">
        <CodeMirror
          height="100%"
          theme={dracula}
          extensions={[cpp(), EditorView.lineWrapping]}
          lineWrapping="true"
          className="codemirror-wrapper"
          onChange={(e)=>{onchangeHandler(e)}}
          value={code} 
          // onChangeCapture={(e)=>{onchangeHandler(e)}}
        />
      </div>
      <div className="ocr-btns">
        <div className="compile-btn btn-primary" onClick={handleRunClick}>Compile</div>
        {/* <div className="prettify-btn btn-secondary">Prettify</div> */}
      </div>
    </div>
  );
}

export default OcrSection;
