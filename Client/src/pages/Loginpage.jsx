import React, { useState } from "react";
import "../pages/Loginpage.css";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Route to /register
  function handleClick() {
    navigate("/register");
  }

  // Handle Login Btn Click
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("/login", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        // Route to dashboard
        navigate("/dashboard");
      } else {
        // Handle error response
        console.error("Login failed");
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
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
          <div className="welcome-text">
            Hey, <br /> Welcome back !
          </div>
          <div className="welcome-subtext">Login to access your dashbaord</div>
          <form className="input-form" onSubmit={handleSubmit}>
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
            {/* Login Error Message */}
            {error && <div className="error-message">{error}</div>}
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
