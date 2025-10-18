import React, { useState } from "react";
import "./App.css";

const doctors = [
  { id: "d1", name: "Dr. Evelyn Reed", specialty: "Cardiology", hospital: "City General Hospital", bio: "Dr. Reed is a board-certified cardiologist with over 15 years of experience.", photo: "https://placehold.co/100x100/E8F5E9/333?text=ER" },
  { id: "d2", name: "Dr. Samuel Chen", specialty: "Dermatology", hospital: "City General Hospital", bio: "Dr. Chen specializes in medical and cosmetic dermatology.", photo: "https://placehold.co/100x100/FFF3E0/333?text=SC" },
  { id: "d3", name: "Dr. Maria Garcia", specialty: "Pediatrics", hospital: "Green Valley Clinic", bio: "Dr. Garcia provides comprehensive care for children of all ages.", photo: "https://placehold.co/100x100/F3E5F5/333?text=MG" },
  { id: "d4", name: "Dr. Ben Carter", specialty: "Orthopedics", hospital: "Green Valley Clinic", bio: "Dr. Carter is a leading orthopedic surgeon.", photo: "https://placehold.co/100x100/E1F5FE/333?text=BC" },
];

const hospitals = [
  { id: "h1", name: "City General Hospital" },
  { id: "h2", name: "Green Valley Clinic" },
];

const services = [
  { id: "s1", name: "Cardiology", icon: "❤️" },
  { id: "s2", name: "Dermatology", icon: "✨" },
  { id: "s3", name: "Pediatrics", icon: "🧸" },
  { id: "s4", name: "Orthopedics", icon: "🦴" },
];

const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"];

function MessageBox({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="message-box">
      <p>{message}</p>
      <button onClick={onClose}>✖</button>
    </div>
  );
}

function Navbar({ currentPage, currentUser, onNavClick, onLogin, onLogout }) {
  return (
    <nav className="top-navbar">
      <h2>CureNet</h2>
      <ul className="nav-links">
        <li className={currentPage === "booking" ? "active" : ""} onClick={() => onNavClick("booking")}>
          Home & Booking
        </li>
        {currentUser && (
          <li className={currentPage === "myAppointments" ? "active" : ""} onClick={() => onNavClick("myAppointments")}>
            My Appointments
          </li>
        )}
      </ul>
      <div className="nav-profile">
        {currentUser ? (
          <>
            <span>Welcome, <strong>{currentUser.name}</strong></span>
            <button className="secondary" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button onClick={onLogin}>Login</button>
        )}
      </div>
    </nav>
  );
}

function BookingPage({ bookingDetails, onSelectChange, onConfirm, onReset }) {
  const doctorsForSelectedHospital = bookingDetails.hospital
    ? doctors.filter((d) => d.hospital === bookingDetails.hospital)
    : [];

  return (
    <>
      <div className="hero-section">
        <h2>Welcome to CureNet Healthcare</h2>
        <p>Book appointments with top doctors and specialists in minutes</p>
      </div>

      <div className="section">
        <h3>Book Your Appointment</h3>
        <div className="booking-layout">
          <div className="booking-form">
            <p>Complete the form below to schedule your visit.</p>

            <label>Select Hospital</label>
            <select name="hospital" value={bookingDetails.hospital} onChange={onSelectChange}>
              <option value="">-- Select a Hospital --</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>

            <label>Select Doctor</label>
            <select name="doctor" value={bookingDetails.doctor} onChange={onSelectChange} disabled={!bookingDetails.hospital}>
              <option value="">-- Select a Doctor --</option>
              {doctorsForSelectedHospital.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name} ({d.specialty})
                </option>
              ))}
            </select>

            <label>Select Date</label>
            <input type="date" name="date" value={bookingDetails.date} onChange={onSelectChange} />

            <label>Select Time</label>
            <select name="time" value={bookingDetails.time} onChange={onSelectChange}>
              <option value="">-- Select a Time --</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <label>Health Concern (Optional)</label>
            <textarea name="issue" value={bookingDetails.issue} onChange={onSelectChange} placeholder="Describe your health concern..." rows={4} />

            <div className="form-actions">
              <button onClick={onConfirm}>Confirm Booking</button>
              <button className="secondary" onClick={onReset}>Cancel</button>
            </div>
          </div>

          <div className="booking-image-container">
            <img src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Doctor providing consultation online" />
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><h4>500+</h4><p>Expert Doctors</p></div>
        <div className="stat-card"><h4>50K+</h4><p>Happy Patients</p></div>
      </div>

      <div className="section">
        <h3>Why Choose CureNet?</h3>
        <p>We are committed to making healthcare accessible, convenient, and patient-centered.</p>
      </div>

      <div className="section">
        <h3>Our Services</h3>
        <div className="info-section">
          {services.map((service) => (
            <div key={service.id} className="info-card">
              <h3>{service.icon} {service.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Our Specialists</h3>
        <p>Meet our team of dedicated and experienced healthcare professionals.</p>
        <div className="doctor-list">
          {doctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <img src={doc.photo} alt={doc.name} className="doctor-photo" />
              <h4>{doc.name}</h4>
              <p>{doc.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function MyAppointmentsPage({ appointments }) {
  return (
    <div className="section">
      <h3>My Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        appointments.map((app) => (
          <div key={app.id} className="appointment-card">
            <p><strong>Hospital:</strong> {app.hospital}</p>
            <p><strong>Doctor:</strong> {app.doctor}</p>
            <p><strong>Date & Time:</strong> {app.date} at {app.time}</p>
          </div>
        ))
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2025 CureNet Healthcare | All Rights Reserved</p>
    </footer>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("booking");
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState({ hospital: "", doctor: "", date: "", time: "", issue: "" });
  const [appointments, setAppointments] = useState([]);

  const handleLogin = () => setCurrentUser({ name: "Alex Williams" });
  const handleLogout = () => { setCurrentUser(null); setCurrentPage("booking"); };
  const resetBooking = () => setBookingDetails({ hospital: "", doctor: "", date: "", time: "", issue: "" });

  const handleConfirmAppointment = () => {
    if (!currentUser) { setMessage("Please log in to book an appointment."); return; }
    const { hospital, doctor, date, time } = bookingDetails;
    if (!hospital || !doctor || !date || !time) { setMessage("Please fill out all required fields before confirming."); return; }
    setAppointments([...appointments, { id: Date.now(), ...bookingDetails }]);
    setMessage("Appointment Confirmed!");
    resetBooking();
    setCurrentPage("myAppointments");
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value, ...(name === "hospital" && { doctor: "" }) }));
  };

  return (
    <div className="app-container">
      <MessageBox message={message} onClose={() => setMessage("")} />
      <Navbar
        currentPage={currentPage}
        currentUser={currentUser}
        onNavClick={setCurrentPage}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {currentPage === "booking" ? (
          <BookingPage
            bookingDetails={bookingDetails}
            onSelectChange={handleSelectChange}
            onConfirm={handleConfirmAppointment}
            onReset={resetBooking}
          />
        ) : (
          <MyAppointmentsPage appointments={appointments} />
        )}
        <Footer />
      </main>
    </div>
  );
}
