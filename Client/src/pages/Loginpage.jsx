import React from "react";
import "../pages/Loginpage.css";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/register");
  }
  return (
    <div className="login-container">
      <div className="left-panel"></div>
      <div className="right-panel">
        <div className="right-panel-wrapper">
          <div className="logo login-logo">
            <span className="primary-color">OCR</span>compiler
          </div>
          <div className="welcome-text">
            Hey, <br /> Welcome back !
          </div>
          <div className="welcome-subtext">Login to access your dashbaord</div>
          <form className="input-form">
            <input
              type="text"
              id="username"
              placeholder="Enter username or email"
              className="input-field"
            ></input>
            <input
              type="password"
              id="username"
              placeholder="Enter password"
              className="input-field"
            ></input>
            <button className="login-btn btn-primary">Log In</button>
          </form>
          <div className="register-text">
            Dont have an account?
            <span className="primary-color register-cta" onClick={handleClick}>
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
