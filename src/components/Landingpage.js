import React from "react";
import { FaAmbulance, FaHospitalUser, FaPills, FaCalendarCheck, FaFileMedical, FaUserMd, FaHeartbeat, FaMobileAlt, FaStar } from "react-icons/fa";
import "./LandingPage.css";
// import MapSection from "../components2/map";
import NearbyHospitals from "./NearbyHospitals";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Get Help in Seconds, Not Minutes 🚑</h1>
          <p>
            Find nearby hospitals, book ambulances, consult doctors, and order medicines — 
            all from one trusted medical platform designed for emergencies.
          </p>
          <button className="hero-btn">Find Nearby Hospitals</button>
        </div>
        <div className="hero-image">
          <img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png" alt="Medical illustration" />
        </div>
      </section>


        {/* <MapSection /> */}
        <NearbyHospitals />

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Our Key Services</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <FaHospitalUser className="feature-icon" />
            <h3>Find Hospitals</h3>
            <p>Locate top-rated hospitals and clinics near you in seconds.</p>
          </div>
          <div className="feature-card">
            <FaAmbulance className="feature-icon" />
            <h3>Book Ambulance</h3>
            <p>Book the nearest ambulance with real-time tracking instantly.</p>
          </div>
          <div className="feature-card">
            <FaPills className="feature-icon" />
            <h3>Order Medicines</h3>
            <p>Get trusted medicines delivered to your doorstep quickly.</p>
          </div>
          <div className="feature-card">
            <FaCalendarCheck className="feature-icon" />
            <h3>Book Appointments</h3>
            <p>Schedule doctor visits at your preferred hospitals with ease.</p>
          </div>
          <div className="feature-card">
            <FaFileMedical className="feature-icon" />
            <h3>Upload Reports</h3>
            <p>Store and share your medical reports securely anytime.</p>
          </div>
          <div className="feature-card">
            <FaUserMd className="feature-icon" />
            <h3>Consult Doctors</h3>
            <p>Talk to professional doctors online and get expert guidance.</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <div className="about-content">
          <h2>Why Choose MediConnect?</h2>
          <p>
            MediConnect brings all essential medical services under one roof — emergency help,
            doctor consultations, medicine delivery, and hospital navigation.
          </p>
          <ul>
            <li>✔ 24/7 emergency assistance</li>
            <li>✔ Verified hospitals and doctors</li>
            <li>✔ Real-time ambulance tracking</li>
            <li>✔ Simple, fast, and secure platform</li>
          </ul>
        </div>
        <div className="about-image">
          <img src="https://cdn-icons-png.flaticon.com/512/3629/3629530.png" alt="About us" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <FaStar className="star" />
            <p>"This app saved my father’s life during an emergency. Ambulance came in 5 minutes!"</p>
            <h4>- Ramesh, Hyderabad</h4>
          </div>
          <div className="testimonial-card">
            <FaStar className="star" />
            <p>"Finding a nearby hospital was never this easy. Beautiful interface and fast support."</p>
            <h4>- Priya, Chennai</h4>
          </div>
          <div className="testimonial-card">
            <FaStar className="star" />
            <p>"Medicine delivery is super quick and affordable. Highly recommended!"</p>
            <h4>- Arjun, Bengaluru</h4>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <FaMobileAlt className="cta-icon" />
        <h2>Get the MediConnect App</h2>
        <p>Book ambulances, consult doctors, and order medicines anytime, anywhere.</p>
        <button className="cta-btn">Download Now</button>
      </section>
    </div>
  );
};

export default LandingPage;
