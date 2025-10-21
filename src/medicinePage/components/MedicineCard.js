import React from "react";
import "./MedicineCard.css";

const MedicineCard = ({ medicine, onAdd, onOrder }) => {
  return (
    <div className="medicine-card1">
      <img
        src={medicine.image || "https://via.placeholder.com/150"} 
        alt={medicine.name}
        className="medicine-image"
      />
      <div className="medicine-info">
        <h3>{medicine.name}</h3>
        <p className="medicine-desc">{medicine.desc}</p>
        <p className="medicine-category">{medicine.category}</p>
        <p className="medicine-price">₹{medicine.price}</p>
      </div>
      <div className="medicine-actions">
        <button className="add-btn" onClick={() => onAdd(medicine)}>Add to Cart</button>
        <button className="order-btn" onClick={() => onOrder(medicine)}>Order Now</button>
      </div>
    </div>
  );
};

export default MedicineCard;
