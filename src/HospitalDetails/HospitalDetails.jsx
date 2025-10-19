import React, { useState, useMemo } from "react";
import "./HospitalDetails.css";
import {
  FaClock,
  FaUserMd,
  FaStethoscope,
  FaHospitalAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaProcedures,
} from "react-icons/fa";

export default function HospitalDetails({ data }) {
  const sample = {
    name: "CureNet",
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
      const matchesTime = selectedTime ? doc.times.includes(selectedTime) : true;
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
    <div className="hospital-page">
      {/* Header */}
      <div className="hospital-header">
        <div className="hospital-header-left">
          <div className="hospital-icon">
            <FaHospitalAlt />
          </div>
          <div>
            <h1 className="hospital-name">{hospital.name}</h1>
            <p className="hospital-address">{hospital.address}</p>
            <div className="hospital-contact">
              <div>
                <FaClock /> {hospital.openingHours[0].time}
              </div>
              <div>{hospital.phone}</div>
            </div>
          </div>
        </div>

        <div className="hospital-header-right">
          <div className="hospital-stat">
            <p>Total Doctors</p>
            <h3>{hospital.stats.totalDoctors}</h3>
          </div>
          <div className="hospital-stat">
            <p>Vacancies</p>
            <h3>{hospital.stats.vacancies}</h3>
          </div>
          <button className="btn-primary">Book Appointment</button>
        </div>
      </div>

      <div className="hospital-content">
        {/* Left Column */}
        <div className="hospital-left">
          <div className="hospital-info-card">
            <h2>Hospital Information</h2>
            <p>
              {hospital.name} is a trusted healthcare institution providing
              advanced medical services and specialized care. Contact us at{" "}
              <span className="email">{hospital.email}</span> for queries.
            </p>

            <h3>Opening Hours</h3>
            <ul className="opening-hours">
              {hospital.openingHours.map((oh, i) => (
                <li key={i}>
                  <span>{oh.day}</span>
                  <span>{oh.time}</span>
                </li>
              ))}
            </ul>

            <h3>Equipments & Availability</h3>
            {hospital.equipments.map((eq, i) => (
              <div key={i} className="equipment">
                <div className="equipment-info">
                  <FaProcedures className="eq-icon" />
                  <div>
                    <p className="eq-name">{eq.name}</p>
                    <p className="eq-status">
                      {eq.available ? "Ready for use" : "Currently unavailable"}
                    </p>
                  </div>
                </div>
                {eq.available ? (
                  <FaCheckCircle className="eq-available" />
                ) : (
                  <FaTimesCircle className="eq-unavailable" />
                )}
              </div>
            ))}
          </div>

          <div className="specialties-card">
            <h3>Specialties</h3>
            <div className="specialty-tags">
              {hospital.stats.specialties.map((s, i) => (
                <span key={i} className="specialty">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="hospital-right">
          <div className="doctor-section">
            <div className="doctor-header">
              <div className="doctor-title">
                <FaUserMd /> <h2>Doctors & Availability</h2>
              </div>

              <div className="filters">
                <input
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}
                  placeholder="Search doctor or specialty"
                />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">All Times</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setSearchDoctor("");
                    setSelectedTime("");
                  }}
                  className="btn-reset"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="doctor-list">
              {availableDoctors.length === 0 ? (
                <p className="no-doctors">No doctors found for selected filters.</p>
              ) : (
                availableDoctors.map((doc) => (
                  <div key={doc.id} className="doctor-card">
                    <img src={doc.image} alt={doc.name} />
                    <div className="doctor-info">
                      <h4>{doc.name}</h4>
                      <p className="specialty-text">{doc.specialty}</p>
                      <p className="profile-text">{doc.profile}</p>

                      <div className="doctor-bottom">
                        <div className="times">
                          <FaStethoscope />
                          {doc.times.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                        <div className="buttons">
                          <button className="btn-book">Book</button>
                          <button className="btn-profile">Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="hospital-stats-grid">
            <div className="stat-card">
              <p>Total Doctors</p>
              <h3>{hospital.stats.totalDoctors}</h3>
            </div>
            <div className="stat-card">
              <p>Vacancies</p>
              <h3>{hospital.stats.vacancies}</h3>
            </div>
            <div className="stat-card">
              <p>Departments</p>
              <h3>{hospital.stats.specialties.length}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
