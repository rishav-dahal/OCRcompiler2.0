import React, { useEffect, useState } from "react";
import "../App.css";
import "./Dashboard.css";
import SnippetItem from "../components/SnippetItem";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [documents, setDocuments] = useState({});
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    const token = localStorage.getItem("access"); // Retrieve JWT token from localStorage
    // console.log(token); // Check the token value
    fetch("http://localhost:8000/api/v1/profile/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // console.log(data); // Check the response structure
        setDocuments(data || []); // Adjust according to the actual structure
        console.log(documents); // Check the updated state value
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <span className="primary-color">OCR</span>compiler
        </div>
        <div className="save-btn btn-primary" onClick={handleButtonClick}>
          Create a new Document
        </div>
        <div className="user-img"></div>
      </div>

      {/* Start with a Template */}
      <div className="template-wrapper">
        <div className="template-header">Start with a template</div>
        <div className="template-items">
          <div className="template-item">
            <div className="template-rect">
              <div className="template-rect-text">Py</div>
            </div>
            <div className="template-info">Python Document</div>
          </div>
          <div className="template-item">
            <div className="template-rect">
              <div className="template-rect-text">JS</div>
            </div>
            <div className="template-info">Javascript Document</div>
          </div>
          <div className="template-item">
            <div className="template-rect">
              <div className="template-rect-text">C</div>
            </div>
            <div className="template-info">C Document</div>
          </div>
          <div className="template-item">
            <div className="template-rect">
              <div className="template-rect-text">C++</div>
            </div>
            <div className="template-info">C++ Document</div>
          </div>
          <div className="template-item">
            <div className="template-rect">
              <div className="template-rect-text">text</div>
            </div>
            <div className="template-info">General Document</div>
          </div>
        </div>
      </div>

      <hr className="hr-line" />

      {/* Recent DOcuments */}
      <div className="recent-docs-wrapper">
        <div className="template-header">Recent documents</div>
        <div className="template-items">
          {/* {documents.map((item) => (
            <SnippetItem
              key={item.snippets.id}
              thumbnail={item.snippets.language}
              title={item.snippets.id}
              date={item.snippets.created_at}
            />
          ))} */}
          <SnippetItem thumbnail="C" title="1" date="2024-12-2" />
          <SnippetItem thumbnail="C++" title="2" date="2024-12-2" />
          <SnippetItem thumbnail="Py" title="3" date="2024-12-24 " />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
