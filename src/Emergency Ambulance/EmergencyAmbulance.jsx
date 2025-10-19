import React, { useState, useEffect } from 'react';

// --- Global Styles (No Tailwind CSS) ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

    .emergency-app-container {
        font-family: 'Roboto', sans-serif;
        min-height: 100vh;
        background-color: #f0f4f8;
        color: #1e293b;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        box-sizing: border-box;
    }
    .emergency-wrapper {
        width: 100%;
        max-width: 1200px;
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    .emergency-header {
        text-align: center;
        padding: 2rem;
        background-color: #dc2626;
        color: white;
        border-bottom: 5px solid #b91c1c;
    }
    .emergency-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: 1px;
    }
    .emergency-header p {
        font-size: 1.1rem;
        opacity: 0.9;
        margin-top: 0.5rem;
    }
    .emergency-main-content {
        display: flex;
        flex-wrap: wrap;
        padding: 2rem;
    }
    .request-section {
        flex: 1;
        min-width: 300px;
        padding-right: 2rem;
        border-right: 1px solid #e2e8f0;
    }
    .status-section {
        flex: 1.5;
        min-width: 300px;
        padding-left: 2rem;
    }
    .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #334155;
        margin-top: 0;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid #cbd5e1;
        padding-bottom: 0.5rem;
    }
    .location-box {
        background-color: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 1.5rem;
        text-align: center;
        margin-bottom: 1.5rem;
    }
    .location-box p {
        margin: 0;
        font-weight: 500;
        color: #475569;
    }
    .location-box .detected-location {
        font-weight: 700;
        color: #1e293b;
        font-size: 1.1rem;
        margin-top: 0.5rem;
    }
    .location-error {
        color: #b91c1c;
    }
    .emergency-btn {
        width: 100%;
        padding: 1rem;
        font-size: 1.2rem;
        font-weight: 700;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }
    .btn-call {
        background-color: #dc2626;
        color: white;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
    }
    .btn-call:hover {
        background-color: #b91c1c;
        transform: translateY(-2px);
    }
    .btn-secondary {
        background-color: #475569;
        color: white;
    }
    .btn-secondary:hover {
        background-color: #334155;
    }
    .ambulance-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 250px;
        overflow-y: auto;
    }
    .ambulance-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
    }
    .ambulance-item-info {
        flex-grow: 1;
    }
    .ambulance-item-name {
        font-weight: 700;
        color: #1e293b;
    }
    .ambulance-item-details {
        font-size: 0.9rem;
        color: #64748b;
    }
    .ambulance-item-eta {
        font-weight: 700;
        font-size: 1rem;
        color: #16a34a;
        text-align: right;
    }
    .tracking-map {
        height: 200px;
        background-color: #e2e8f0;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #64748b;
        font-weight: 500;
        margin-top: 1.5rem;
        text-align: center;
    }
`;

// --- SVG Icons ---
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;

// --- Mock Data ---
const mockAmbulances = [
    { id: 1, name: 'City Central Hospital', distance: '2.5 km', eta: '5 mins' },
    { id: 2, name: 'LifeCare Responders', distance: '3.1 km', eta: '7 mins' },
    { id: 3, name: 'St. Jude’s Emergency', distance: '4.8 km', eta: '10 mins' },
    { id: 4, name: 'County Medical Unit 7', distance: '6.2 km', eta: '12 mins' },
];

export default function EmergencyAmbulancePage() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const [alertSent, setAlertSent] = useState(false);
    const [trackingInfo, setTrackingInfo] = useState(null);

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lon: longitude, text: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}` });
                    setError('');
                },
                (err) => {
                    setError('Unable to retrieve location. Please grant permission.');
                    setLocation(null);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const handleCallAmbulance = () => {
        if (!location) {
            setError('Please detect your location before calling.');
            return;
        }
        setAlertSent(true);
        setTrackingInfo({
            ambulance: mockAmbulances[0],
            status: 'Dispatched',
        });
        // In a real app, this would trigger a phone call and a backend API call.
        // window.location.href = "tel:102"; // Example for India emergency number
        console.log('Ambulance called to:', location.text);
    };

    useEffect(() => {
        // Automatically detect location on initial load
        handleDetectLocation();
    }, []);

    return (
        <>
            <style>{styles}</style>
            <div className="emergency-app-container">
                <div className="emergency-wrapper">
                    <header className="emergency-header">
                        <h1>Emergency Response</h1>
                        <p>Instant help when you need it most.</p>
                    </header>
                    <main className="emergency-main-content">
                        <section className="request-section">
                            <h2 className="section-title">Emergency Request</h2>
                            <div className="location-box">
                                <p>Your Current Location</p>
                                {location ? (
                                    <p className="detected-location">{location.text}</p>
                                ) : (
                                    <p className="location-error">{error || 'Location not detected.'}</p>
                                )}
                            </div>
                            <button onClick={handleDetectLocation} className="emergency-btn btn-secondary">
                                <MapPinIcon /> Detect My Location
                            </button>
                            <button onClick={handleCallAmbulance} className="emergency-btn btn-call">
                                <PhoneIcon /> CALL AMBULANCE
                            </button>
                            <button className="emergency-btn btn-secondary">
                                <ShareIcon /> Share Location Now
                            </button>
                            {alertSent && <p style={{ color: '#16a34a', fontWeight: 'bold', textAlign: 'center' }}>Alert sent to nearest responders!</p>}
                        </section>
                        <section className="status-section">
                            <h2 className="section-title">Live Status</h2>
                            <p style={{ marginTop: 0, marginBottom: '1rem', color: '#475569' }}>Nearby Hospitals & Ambulances</p>
                            <ul className="ambulance-list">
                                {mockAmbulances.map(amb => (
                                    <li key={amb.id} className="ambulance-item">
                                        <div className="ambulance-item-info">
                                            <p className="ambulance-item-name">{amb.name}</p>
                                            <p className="ambulance-item-details">{amb.distance} away</p>
                                        </div>
                                        <div className="ambulance-item-eta">{amb.eta}</div>
                                    </li>
                                ))}
                            </ul>
                            <div className="tracking-map">
                                {trackingInfo ? (
                                    <p>Tracking {trackingInfo.ambulance.name}...<br />Status: {trackingInfo.status}</p>
                                ) : (
                                    <p>Ambulance tracking will appear here.</p>
                                )}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
