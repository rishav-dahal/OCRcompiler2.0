import React, { useEffect, useState } from "react";
import { AiOutlineScan } from "react-icons/ai";
import Editor from "@monaco-editor/react";

const editorOptions = {
  wordWrap: "on",
};

function OcrSection({
  onchangeHandler,
  code,
  handleRunClick,
  updateExtension,
  language,
}) {
  const [codelanguage, setCodeLanguage] = useState("");

  useEffect(() => {
    console.log("Language prop received:", language); // Debugging line
    if (language) {
      setCodeLanguage(language);
    }
  }, [language]);

  const onLanguageChange = (e) => {
    setCodeLanguage(e.target.value);
    updateExtension(e.target.value);
  };
  return (
    <div className="ocr-section">
      <div className="section-title">
        <div className="section-title-text">
          <AiOutlineScan className="section-title-icon" />
          OCR
        </div>
        <div className="dropdown">
          <select
            onChange={onLanguageChange}
            defaultValue={codelanguage}
            value={codelanguage}
          >
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="python">Python</option>
          </select>
        </div>
      </div>
      <div className="code-editor">
        <Editor
          className="monaco-wrapper"
          height="90vh"
          // defaultLanguage={language}
          language={codelanguage}
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
