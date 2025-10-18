import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // Create a new order
      const newOrder = {
        id: Date.now(),
        items: cart,
        date: new Date().toLocaleString(),
        status: "Processing",
        expectedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };

      // Save updated orders to localStorage first
      localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

      // Then clear cart
      localStorage.removeItem("cart");
    }
  }, []);

  const handleViewOrders = () => {
    navigate("/orders", { replace: true }); // navigate to orders page
  };

  return (
    <div className="success-page">
      <div className="success-box">
        <h1>🎉 Order Confirmed!</h1>
        <p>Your medicines will be delivered soon!</p>
        <button onClick={handleViewOrders}>View Orders</button>
      </div>
    </div>
  );
};

export default Success;
