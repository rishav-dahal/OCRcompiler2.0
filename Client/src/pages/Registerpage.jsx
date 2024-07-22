import React, { useState } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";

const Registerpage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  // handle form submit
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("http://localhost:8000/api/v1/register/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.token.accessToken);
        localStorage.setItem("refreshToken", data.token.refreshToken);
        // Route to dashboard
        navigate("/login");
      } else {
        // Handle error response
        console.error("Register failed");
        const errorData = await response.json();
        setError(errorData.message || "Register failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
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
          <form className="input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="input-field"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <input
              type="text"
              id="email"
              placeholder="Enter email"
              className="input-field"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              id="username"
              placeholder="Enter password"
              className="input-field"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
