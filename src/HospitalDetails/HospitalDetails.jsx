import React, { useState, useMemo } from "react";
import {
  FaClock,
  FaUserMd,
  FaStethoscope,
  FaHospitalAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaProcedures,
} from "react-icons/fa";
import "./HospitalDetails.css";

export default function HospitalDetails({ data }) {
  const sample = {
    name: "Aadhya General Hospital",
    address: "123 Health St, Hyderabad, Telangana",
    phone: "+91 98765 43210",
    email: "contact@aadhyahospital.com",
    openingHours: [
      { day: "Mon - Fri", time: "09:00 - 18:00" },
      { day: "Sat", time: "09:00 - 14:00" },
      { day: "Sun", time: "Closed" },
    ],
    equipments: [
      { name: "X-Ray", available: true },
      { name: "MRI", available: false },
      { name: "Ventilator", available: true },
      { name: "ECG", available: true },
      { name: "Ultrasound", available: true },
    ],
    doctors: [
      {
        id: 1,
        name: "Dr. Priya Sharma",
        specialty: "Cardiologist",
        profile: "15 yrs experience, MBBS, MD (Cardiology)",
        times: ["09:00", "11:00", "15:00"],
        image: "https://via.placeholder.com/120?text=Dr+Priya",
      },
      {
        id: 2,
        name: "Dr. Karan Reddy",
        specialty: "Orthopedic",
        profile: "10 yrs experience, MS (Ortho)",
        times: ["10:00", "13:00"],
        image: "https://via.placeholder.com/120?text=Dr+Karan",
      },
      {
        id: 3,
        name: "Dr. Meera Iyer",
        specialty: "Pediatrics",
        profile: "8 yrs experience, MBBS, DCH",
        times: ["09:30", "12:00", "16:00"],
        image: "https://via.placeholder.com/120?text=Dr+Meera",
      },
    ],
    stats: {
      totalDoctors: 32,
      vacancies: 3,
      specialties: [
        "Cardiology",
        "Orthopedics",
        "Pediatrics",
        "Neurology",
        "Emergency",
      ],
    },
  };

  const hospital = data || sample;
  const [selectedTime, setSelectedTime] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");

  const availableDoctors = useMemo(() => {
    return hospital.doctors.filter((doc) => {
      const matchesTime = selectedTime
        ? doc.times.includes(selectedTime)
        : true;
      const matchesSearch = searchDoctor
        ? (doc.name + " " + doc.specialty + " " + doc.profile)
            .toLowerCase()
            .includes(searchDoctor.toLowerCase())
        : true;
      return matchesTime && matchesSearch;
    });
  }, [hospital.doctors, selectedTime, searchDoctor]);

  const timeSlots = useMemo(() => {
    const s = new Set();
    hospital.doctors.forEach((d) => d.times.forEach((t) => s.add(t)));
    return [...s].sort();
  }, [hospital.doctors]);

  return (
    <div className="hospital-container">
      <div className="hospital-header">
        <div className="hospital-info">
          <div className="hospital-icon">
            <FaHospitalAlt size={42} />
          </div>
          <div>
            <h1>{hospital.name}</h1>
            <p>{hospital.address}</p>
            <div className="hospital-meta">
              <span>
                <FaClock /> {hospital.openingHours[0].time}
              </span>
              <span>📞 {hospital.phone}</span>
            </div>
          </div>
        </div>

        <div className="hospital-stats">
          <div>
            <h2>{hospital.stats.totalDoctors}</h2>
            <p>Doctors</p>
          </div>
          <div>
            <h2>{hospital.stats.vacancies}</h2>
            <p>Vacancies</p>
          </div>
          <button className="book-btn">Book Appointment</button>
        </div>
      </div>

      <div className="hospital-main">
        <div className="left-section">
          <div className="details-card">
            <h2>Hospital Details</h2>
            <p>
              {hospital.name} offers emergency care, diagnostics, and specialty
              clinics. Contact: <strong>{hospital.email}</strong>
            </p>
            <h3>Opening Hours</h3>
            <ul>
              {hospital.openingHours.map((oh, idx) => (
                <li key={idx}>
                  <span>{oh.day}</span> <span>{oh.time}</span>
                </li>
              ))}
            </ul>

            <h3>Equipments & Availability</h3>
            {hospital.equipments.map((eq, i) => (
              <div key={i} className="equip-item">
                <div>
                  <FaProcedures /> <span>{eq.name}</span>
                </div>
                {eq.available ? (
                  <FaCheckCircle className="available" />
                ) : (
                  <FaTimesCircle className="unavailable" />
                )}
              </div>
            ))}
          </div>

          <div className="details-card">
            <h3>Specialties</h3>
            <div className="specialties">
              {hospital.stats.specialties.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="details-card">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search doctor or specialty"
                value={searchDoctor}
                onChange={(e) => setSearchDoctor(e.target.value)}
              />
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">All times</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button onClick={() => { setSelectedTime(""); setSearchDoctor(""); }}>
                Reset
              </button>
            </div>

            <div className="doctor-list">
              {availableDoctors.length === 0 ? (
                <p className="no-data">No doctors found for selected filters.</p>
              ) : (
                availableDoctors.map((doc) => (
                  <div key={doc.id} className="doctor-card">
                    <img src={doc.image} alt={doc.name} />
                    <div>
                      <h4>{doc.name}</h4>
                      <p>{doc.specialty}</p>
                      <small>{doc.profile}</small>
                      <div className="slots">
                        {doc.times.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      <div className="btns">
                        <button className="book">Book</button>
                        <button className="profile">Profile</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
