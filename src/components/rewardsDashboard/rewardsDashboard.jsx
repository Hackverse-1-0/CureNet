import React from "react";
import "./RewardsDashboard.css";

const RewardsDashboard = () => {
  return (
    <div className="rewards-dashboard">
      {/* Points Summary */}
      <section className="points-summary">
        <div className="points-header">
          <h2>Points Summary</h2>
          <span className="tier-label">Now Tier</span>
        </div>
        <h1 className="total-points">500</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "100%" }}></div>
        </div>
      </section>

      {/* Rewards Catalog */}
      <section className="rewards-catalog">
        <h3>Rewards Catalog</h3>
        <div className="rewards-grid">
          {[
            "Free Checkup",
            "Free Checkup",
            "Discount Voucher",
            "Discount Voucher",
          ].map((reward, i) => (
            <div key={i} className="reward-card">
              <h4>{reward}</h4>
              <p>Point required</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Redemption History */}
      <section className="redemption-history">
        <h3>Redemption History</h3>
        <ul>
          <li>
            <span>1. Redeemed: Free Checkup</span>
            <span className="date">(2024.09.15)</span>
          </li>
          <li>
            <span>2. Redeemed: Free Checkup</span>
            <span className="date">(2024.09.15)</span>
          </li>
        </ul>
      </section>

      {/* Bottom Buttons */}
      <div className="bottom-buttons">
        <button className="redeem-btn">Redeem Now</button>
        <button className="blue-btn">View Rewards History</button>
        <button className="orange-btn">Earn More Points</button>
      </div>
    </div>
  );
};

export default RewardsDashboard;
