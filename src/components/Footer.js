import React from "react";
import "./Footer.css";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Brand Info */}
        <div className="footer-brand">
          <h2>MediConnect</h2>
          <p>
            Your trusted health partner for emergency services, hospital bookings,
            and online medicine orders — anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/hospitals">Find Hospitals</a></li>
            <li><a href="/ambulance">Book Ambulance</a></li>
            <li><a href="/medicines">Order Medicines</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <ul>
            <li><MapPin size={16} /> Hyderabad, Telangana, India</li>
            <li><Phone size={16} /> +91 98765 43210</li>
            <li><Mail size={16} /> support@mediconnect.in</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="footer-icons">
            <a href="#"><Facebook /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><Linkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MediConnect. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
