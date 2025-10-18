import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import MedicinePage from "./medicinePage/pages/Home";
import MedicineCart from "./medicinePage/pages/Cart";
import Payment from "./medicinePage/pages/Payment";
import Success  from "./medicinePage/pages/Success";
import OrdersPage  from "./medicinePage/pages/OrdersPage";
import AppointmentBooking from "./appointment/AppointmentBooking";
import Report from "./report analyses/Report";
import VideoGuidance from "./video Guidance/VideoGuidance";
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
        <Route path="/medicine-booking" element={<MedicinePage />} />
        <Route path="/cart" element={<MedicineCart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/appointmentbooking" element={<AppointmentBooking />} />
        <Route path="/report" element={<Report />}  />
        <Route path="/videoguidance" element={<VideoGuidance />}  />
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
