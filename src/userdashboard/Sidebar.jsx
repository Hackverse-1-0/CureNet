import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>Profile Overview</li>
        <li>Appointments</li>
        <li>Rewards</li>
        <li>Reports & Analytics</li>
        <li>Medicines</li>
        <li>Video Guidance</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
