import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const NearbyHospitals = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const mapStyles = { height: "400px", width: "100%" };

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Dummy nearby hospitals (replace with Google Places API later)
          const nearby = [
            { name: "City Hospital", lat: latitude + 0.005, lng: longitude + 0.005 },
            { name: "Sunrise Clinic", lat: latitude - 0.004, lng: longitude - 0.006 },
            { name: "Green Care Hospital", lat: latitude + 0.003, lng: longitude - 0.004 },
          ];
          setHospitals(nearby);
        },
        () => alert("Geolocation is not enabled")
      );
    }
  }, []);

  if (!userLocation) return <p>Loading map...</p>;

  return (
    <div style={{ maxWidth: "100vw", textAlign: "center" }}>
      <LoadScript googleMapsApiKey="AIzaSyAQYu6ps_f0DLcGAPWErbZ-4UueuafZgUI">
        <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={userLocation}>
          <Marker position={userLocation} label="You" />
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              position={{ lat: hospital.lat, lng: hospital.lng }}
              onClick={() => setSelectedHospital(hospital)}
            />
          ))}

          {selectedHospital && (
            <InfoWindow
              position={{ lat: selectedHospital.lat, lng: selectedHospital.lng }}
              onCloseClick={() => setSelectedHospital(null)}
            >
              <div>{selectedHospital.name}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default NearbyHospitals;
