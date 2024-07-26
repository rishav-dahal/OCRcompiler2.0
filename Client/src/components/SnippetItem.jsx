import React from "react";
import "../pages/Dashboard.css";
import { MdDeleteOutline } from "react-icons/md";

const SnippetItem = ({ thumbnail, title, date, handleItemClick }) => {
  return (
    <div>
      <div className="template-item" onClick={handleItemClick}>
        <div className="template-rect">
          <div className="template-rect-text">{thumbnail}</div>
          <div className="delete-btn">
            <MdDeleteOutline />
          </div>
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
