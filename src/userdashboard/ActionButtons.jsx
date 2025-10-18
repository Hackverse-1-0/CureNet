import React from "react";
import "./ActionButtons.css";

const ActionButtons = () => {
  return (
    <div className="actions-container">
      <button>Edit Profile / Change Password</button>
      <button>Book New Appointment</button>
      <button>Order Medicines</button>
      <button>Redeem Rewards</button>
      <button>Generate Report</button>
    </div>
  );
};

export default ActionButtons;
