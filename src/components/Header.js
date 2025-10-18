import React from "react";
import { FaAmbulance, FaHospitalSymbol } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <FaHospitalSymbol className="logo-icon" />
          <span className="logo-text">MediConnect</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-section">
          <a href="#home">Home</a>
          <a href="#hospitals">Hospitals</a>
          <a href="#doctors">Doctors</a>
          <a href="#ambulance">Ambulance</a>
          <a href="#pharmacy">Pharmacy</a>
          <a href="#rewards">Rewards</a>
        </nav>

        {/* Emergency Button */}
        <button className="emergency-btn">
          <FaAmbulance className="btn-icon" /> Emergency
        </button>
      </div>
    </header>
  );
};

export default Header;
