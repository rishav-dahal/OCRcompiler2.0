import React from "react";
import "../pages/Dashboard.css";

const SnippetItem = ({ thumbnail, title, date }) => {
  return (
    <div>
      <div className="template-item">
        <div className="template-rect">
          <div className="template-rect-text">{thumbnail}</div>
        </div>
        <div className="template-info">
          <div className="template-info-title">Document no: {title}</div>
          <div className="template-info-date"> Created On : {date}</div>
        </div>
      </div>
    </div>
  );
};

export default SnippetItem;
