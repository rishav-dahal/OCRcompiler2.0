import React from "react";
import "../App.css";
import "./Landingpage.css";

const Landingpage = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <span className="primary-color">OCR</span>compiler
        </div>
        {/* onClick={downloadTxtFile} */}
        <a href="/login">
          <div className="save-btn btn-primary">Login</div>
        </a>
      </div>
      <div className="container">
        <div className="hero-section">
          Scan and compile code snippets in instant
        </div>
      </div>
    </>
  );
};

export default Landingpage;
