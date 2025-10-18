import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Userdashboard from "./userdashboard/Dashboard";
import RewardsDashboard from "./components/rewardsDashboard/rewardsDashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/Rewards" element={<RewardsDashboard/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
