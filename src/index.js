import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AppointmentBooking from "./appointment/AppointmentBooking";
import Report from "./report analyses/Report";
import VideoGuidance from "./video Guidance/VideoGuidance";
import EmergencyAmbulance from "./Emergency Ambulance/EmergencyAmbulance";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/appointmentbooking" element={<AppointmentBooking />} />
        <Route path="/report" element={<Report />}  />
        <Route path="/videoguidance" element={<VideoGuidance />}  />
        <Route path="/emergencyambulance" element={<EmergencyAmbulance/>}  />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);