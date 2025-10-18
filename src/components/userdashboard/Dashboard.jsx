import React from "react";
import "./Dashboard.css";

const Dashboard = () => (
  <div className="main-dashboard">
    {/* Side Navigation */}
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="avatar-large"></div>
        <span>John Doe</span>
      </div>
      <nav className="side-menu">
        <a href="#">Profile Overview</a>
        <a href="#">Appointments</a>
        <a href="#">Rewards</a>
        <a href="#">Reports & Analytics</a>
        <a href="#">Medicines</a>
        <a href="#">Video Guidance</a>
        <a href="#" className="logout">Logout</a>
      </nav>
    </aside>

    {/* Main Content */}
    <main className="dashboard-content">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <span className="welcome">Welcome, John!</span>
        </div>
        <div className="notif-bell">&#128276;</div>
      </header>

      {/* Quick Summary Widgets */}
      <section className="widget-row">
        <div className="widget">
          <span className="widget-number">3</span>
          <span className="widget-label">Appointments</span>
        </div>
        <div className="widget">
          <span className="widget-number">85</span>
          <span className="widget-label">Health Score</span>
        </div>
        <div className="widget">
          <span className="widget-number">5</span>
          <span className="widget-label">Reports</span>
        </div>
      </section>

      {/* Profile + Actions */}
      <section className="profile-actions">
        <div className="profile-info">
          <p className="email">john.doe@example.com</p>
          <p className="phone">555-123-4567</p>
        </div>
        <div className="action-buttons">
          <button>Edit Profile</button>
          <button className="change-pass">Change Password</button>
        </div>
      </section>

      {/* Control panel buttons */}
      <section className="quick-actions-row">
        <button>Book New Appointment</button>
        <button>Order Medicines</button>
        <button>Redeem Rewards</button>
        <button>Generate Report</button>
      </section>

      {/* Video Guidance */}
      <section className="video-area">
        <h4>Video Guidance</h4>
        <div className="video-placeholder">
          <span>&#9654;</span>
        </div>
      </section>
    </main>
  </div>
);

export default Dashboard;