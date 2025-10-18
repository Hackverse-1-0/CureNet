import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAmbulance, FaHospitalSymbol, FaUserCircle } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check login status on load
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    alert("You have logged out!");
    navigate("/");
  };

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
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/find-hospitals">Find Hospitals</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/ambulance">Ambulance</Link>
          <Link to="/pharmacy">Pharmacy</Link>
          <Link to="/contact">Contact / Help</Link>
        </nav>

        {/* Right Section */}
        <div className="header-right">
          {/* Emergency Button */}
          <button className="emergency-btn">
            <FaAmbulance className="btn-icon" /> Emergency
          </button>

          {/* Show Login/Register or Profile Icon */}
          {!user ? (
            <Link to="/login" className="login-link">Login / Register</Link>
          ) : (
            <FaUserCircle
              className="profile-icon"
              title="Click to logout"
              onClick={handleLogout}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
