import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((u) => u.email === user.email);

    if (userExists) {
      alert("User already exists. Please login!");
      navigate("/login");
      return;
    }

    existingUsers.push(user);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration successful! You can now log in.");
    setUser({ name: "", email: "", password: "" });
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="login-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
