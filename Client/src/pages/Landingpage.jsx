import React from "react";
import "../App.css";
import "./Landingpage.css";
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/login');
  }
  return (
    <>
      <div className="navbar landing-navbar">
        <div className="logo">
          <span className="primary-color">OCR</span>compiler
        </div>
        {/* onClick={downloadTxtFile} */}
        {/* <a href="/login"> */}
        <div className="save-btn btn-primary" onClick={handleClick} ddd>
          Login
        </div>
        {/* </a> */}
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
