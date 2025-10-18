import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const SAMPLE_MEDICINES = [
  { id: 1, name: "Paracetamol", price: 50, description: "Used to relieve pain and reduce fever.", category: "Pain Relief", inStock: true },
  { id: 2, name: "Amoxicillin", price: 120, description: "Antibiotic used for bacterial infections.", category: "Antibiotics", inStock: true },
  { id: 3, name: "Vitamin C 500mg", price: 80, description: "Boosts immunity and prevents scurvy.", category: "Vitamins", inStock: false },
  { id: 4, name: "Cough Syrup", price: 140, description: "Provides relief from cough and throat irritation.", category: "Cold & Flu", inStock: true },
  { id: 5, name: "Ibuprofen", price: 70, description: "Reduces inflammation and relieves pain.", category: "Pain Relief", inStock: true },
];

const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const medicine = SAMPLE_MEDICINES.find((m) => m.id === Number(id));

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((c) => c.id === medicine.id);
    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else cart.push({ ...medicine, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`${medicine.name} added to cart`);
  };

  if (!medicine) return <div>Medicine not found</div>;

  return (
    <>
      <Header onSearchChange={() => {}} onCategoryChange={() => {}} filters={{ setSort: () => {}, setAvailability: () => {} }} />
      <div className="details-page">
        <img
          src={`https://via.placeholder.com/300x250?text=${medicine.name}`}
          alt={medicine.name}
        />
        <div className="details-content">
          <h2>{medicine.name}</h2>
          <p className="category">{medicine.category}</p>
          <p>{medicine.description}</p>
          <p className="price">₹{medicine.price}</p>
          {medicine.inStock ? (
            <button onClick={handleAddToCart}>Add to Cart</button>
          ) : (
            <button disabled style={{ background: "#94a3b8" }}>Out of Stock</button>
          )}
          <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
      </div>
    </>
  );
};

export default MedicineDetails;
