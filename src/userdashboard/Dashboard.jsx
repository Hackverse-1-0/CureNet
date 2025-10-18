import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SummaryWidgets from "./SummaryWidgets";
import ActionButtons from "./ActionButtons";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <h1>Welcome to Your Control Panel</h1>
        <SummaryWidgets />
        <ActionButtons />
      </div>
    </div>
  );
};

export default Dashboard;
