import React from "react";
import { FaBell } from "react-icons/fa";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="notifications">
        <FaBell size={20} />
        <span className="badge">3</span>
      </div>
    </div>
  );
};

export default TopBar;
