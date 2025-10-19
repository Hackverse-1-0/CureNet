import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAmbulance, FaHospitalSymbol, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import image from "./assets/Picsart_25-10-17_15-36-46-695.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
          <img src={image} alt="logo" className="logo-icon"/>
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

          {/* Login/Register or Profile + Logout */}
          {!user ? (
            <Link to="/login" className="login-link">Login / Register</Link>
          ) : (
            <div className="profile-logout">
            <FaUserCircle
              className="profile-icon"
              title="Profile"
              onClick={() => navigate("/userdashboard")}
            />
              <FaSignOutAlt
                className="logout-icon"
                title="Logout"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
