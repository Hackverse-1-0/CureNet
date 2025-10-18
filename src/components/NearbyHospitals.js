import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import "./NearbyHospitals.css";

const NearbyHospitals = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const mapRef = useRef(null);

  const mapStyles = { height: "500px", width: "100%" };

  // Get user location & set dummy hospitals
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(location);

          // Dummy hospitals with online images
          const dummyHospitals = [
            {
              name: "City Hospital",
              geometry: { location: { lat: location.lat + 0.005, lng: location.lng + 0.005 } },
              vicinity: "123 Main St",
              rating: 4.5,
              specialties: ["Cardiology", "Neurology", "Pediatrics"],
              image: "https://images.unsplash.com/photo-1576765607924-cf9cbd2d6c33?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
            {
              name: "Sunrise Clinic",
              geometry: { location: { lat: location.lat - 0.004, lng: location.lng - 0.006 } },
              vicinity: "456 Oak Rd",
              rating: 4.2,
              specialties: ["Dermatology", "ENT", "General Medicine"],
              image: "https://images.unsplash.com/photo-1588776814546-33d5d8474b6c?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
            {
              name: "Green Care Hospital",
              geometry: { location: { lat: location.lat + 0.003, lng: location.lng - 0.004 } },
              vicinity: "789 Elm St",
              rating: 4.7,
              specialties: ["Orthopedics", "ICU", "Emergency"],
              image: "https://images.unsplash.com/photo-1588776814546-33d5d8474b6c?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
            {
              name: "HealthPlus Medical Center",
              geometry: { location: { lat: location.lat - 0.006, lng: location.lng + 0.004 } },
              vicinity: "321 Pine Ave",
              rating: 4.3,
              specialties: ["Cardiology", "Radiology", "Rehabilitation"],
              image: "https://images.unsplash.com/photo-1588776814546-33d5d8474b6c?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
            {
              name: "Sunflower Hospital",
              geometry: { location: { lat: location.lat + 0.007, lng: location.lng - 0.005 } },
              vicinity: "654 Maple St",
              rating: 4.6,
              specialties: ["Pediatrics", "Oncology", "ENT"],
              image: "https://images.unsplash.com/photo-1576765607924-cf9cbd2d6c33?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
              {
              name: "City Hospital",
              geometry: { location: { lat: location.lat + 0.005, lng: location.lng + 0.005 } },
              vicinity: "123 Main St",
              rating: 4.5,
              specialties: ["Cardiology", "Neurology", "Pediatrics"],
              image: "https://images.unsplash.com/photo-1576765607924-cf9cbd2d6c33?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
            {
              name: "Sunrise Clinic",
              geometry: { location: { lat: location.lat - 0.004, lng: location.lng - 0.006 } },
              vicinity: "456 Oak Rd",
              rating: 4.2,
              specialties: ["Dermatology", "ENT", "General Medicine"],
              image: "https://images.unsplash.com/photo-1588776814546-33d5d8474b6c?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
            {
              name: "Green Care Hospital",
              geometry: { location: { lat: location.lat + 0.003, lng: location.lng - 0.004 } },
              vicinity: "789 Elm St",
              rating: 4.7,
              specialties: ["Orthopedics", "ICU", "Emergency"],
              image: "https://images.unsplash.com/photo-1588776814546-33d5d8474b6c?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
            {
              name: "HealthPlus Medical Center",
              geometry: { location: { lat: location.lat - 0.006, lng: location.lng + 0.004 } },
              vicinity: "321 Pine Ave",
              rating: 4.3,
              specialties: ["Cardiology", "Radiology", "Rehabilitation"],
              image: "https://images.unsplash.com/photo-1588776814546-33d5d8474b6c?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
            {
              name: "Sunflower Hospital",
              geometry: { location: { lat: location.lat + 0.007, lng: location.lng - 0.005 } },
              vicinity: "654 Maple St",
              rating: 4.6,
              specialties: ["Pediatrics", "Oncology", "ENT"],
              image: "https://images.unsplash.com/photo-1576765607924-cf9cbd2d6c33?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300",
            },
          ];

          setHospitals(dummyHospitals);
        },
        () => alert("Enable location access!")
      );
    }
  }, []);

  // Add markers
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    // Clear old markers
    if (mapRef.current.markers) mapRef.current.markers.forEach((m) => m.setMap(null));
    mapRef.current.markers = [];

    // User marker
    const userMarker = new window.google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: userLocation,
      content: `<div class="user-marker">You</div>`,
    });
    mapRef.current.markers.push(userMarker);

    // Hospital markers
    hospitals.forEach((h) => {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: h.geometry.location,
        content: `<div class="hospital-marker">H</div>`,
      });
      marker.addListener("click", () => setSelectedHospital(h));
      mapRef.current.markers.push(marker);
    });
  }, [userLocation, hospitals]);

  if (!userLocation) return <p>Detecting your location...</p>;

  return (
    <div className="nearby-hospitals-container">
      <h2>Nearby Hospitals</h2>

      <LoadScript googleMapsApiKey="AIzaSyAQYu6ps_f0DLcGAPWErbZ-4UueuafZgUI" libraries={["marker"]}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={userLocation}
          zoom={14}
          onLoad={(map) => (mapRef.current = map)}
        >
          {selectedHospital && (
            <InfoWindow
              position={selectedHospital.geometry.location}
              onCloseClick={() => setSelectedHospital(null)}
            >
              <div className="info-window">
                <h3>{selectedHospital.name}</h3>
                <p>{selectedHospital.vicinity}</p>
                {selectedHospital.rating && <p>Rating: {selectedHospital.rating} ⭐</p>}
                {selectedHospital.specialties && (
                  <p>Specialties: {selectedHospital.specialties.join(", ")}</p>
                )}
                <img
                  src={selectedHospital.image}
                  alt={selectedHospital.name}
                  className="info-image"
                />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <div className="hospital-list">
        {hospitals.map((h, idx) => (
          <div className="hospital-card" key={idx}>
            <img src={h.image} alt={h.name} className="hospital-image" />
            <div className="hospital-details">
              <h4>{h.name}</h4>
              <p>{h.vicinity}</p>
              {h.rating && <p>Rating: {h.rating} ⭐</p>}
              {h.specialties && <p>Specialties: {h.specialties.join(", ")}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyHospitals;
