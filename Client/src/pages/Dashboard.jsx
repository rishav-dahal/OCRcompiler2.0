import React from "react";
import "../App.css";
import "./Dashboard.css";
import SnippetItem from "../components/SnippetItem";

const Dashboard = () => {
  return (
    <div className="App">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <span className="primary-color">OCR</span>compiler
        </div>
        <div className="save-btn btn-primary">Create a new Document</div>
        <div className="user-img"></div>
      </div>

      {/* Start with a Template */}
      <div className="template-wrapper">
        <div className="template-header">Start with a template</div>
        <div className="template-items">
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">Python Document</div>
          </div>
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">Javascript Document</div>
          </div>
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">C Document</div>
          </div>
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">C++ Document</div>
          </div>
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">General Document</div>
          </div>
        </div>
      </div>

      <hr className="hr-line" />

      {/* Recent DOcuments */}
      <div className="recent-docs-wrapper">
        <div className="template-header">Recent documents</div>
        <div className="template-items">
          <SnippetItem thumbnail="C" title="My document" date="2024-02-12" />
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">My document 1</div>
          </div>
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">My document 1</div>
          </div>
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">My document 1</div>
          </div>
          <div className="template-item">
            <div className="template-rect"></div>
            <div className="template-info">My document 1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
