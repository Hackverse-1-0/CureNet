import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Userdashboard from "./userdashboard/Dashboard";
import RewardsDashboard from "./components/rewardsDashboard/rewardsDashboard";
import Login from "./components/Login";
import Register from "./components/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/Rewards" element={<RewardsDashboard/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<div>🩺 Services Page</div>} />
        <Route path="/contact" element={<div>📞 Contact Page</div>} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
