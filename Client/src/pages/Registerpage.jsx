import React from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";

const Registerpage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }
  return (
    <div className="login-container">
      <div className="left-panel"></div>
      <div className="right-panel">
        <div className="right-panel-wrapper">
          <div className="logo login-logo">
            <span className="primary-color">OCR</span>compiler
          </div>
          <div className="welcome-text">Create a new account !</div>
          <div className="welcome-subtext">
            To start compiling your code snippets
          </div>
          <form className="input-form">
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="input-field"
            ></input>
            <input
              type="text"
              id="email"
              placeholder="Enter email"
              className="input-field"
            ></input>
            <input
              type="password"
              id="username"
              placeholder="Enter password"
              className="input-field"
            ></input>
            <button className="login-btn btn-primary">Sign In</button>
          </form>
          <div className="register-text">
            Already have an account?
            <span className="primary-color register-cta" onClick={handleClick}>
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
