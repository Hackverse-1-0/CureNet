import React, { useState } from "react";
import "./ContactHelp.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactHelp() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h2>Need Help? We're Here for You</h2>
        <p>Get in touch with our support team for any assistance or queries.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <h4>Email</h4>
              <p>support@curenet.com</p>
            </div>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h4>Address</h4>
              <p>123 Health Street, Hyderabad, Telangana</p>
            </div>
          </div>
          <div className="info-item">
            <FaClock className="info-icon" />
            <div>
              <h4>Working Hours</h4>
              <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
          {submitted && <p className="success-msg">✅ Message sent successfully!</p>}
        </div>
      </div>
    </div>
  );
}
