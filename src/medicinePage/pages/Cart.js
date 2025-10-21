import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
      );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const handleCheckout = () => {
    // Navigate to Payment page instead of clearing cart
    navigate("/payment");
  };

  const total = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  return (
    <>
      <Header />

      <div className="cart-page">
        <h2 className="cart-title">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-card" key={item.id}>
                  <div className="cart-card-info">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-card-details">
                      <h3>{item.name}</h3>
                      <p className="price">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="cart-card-controls">
                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                    <p className="subtotal">Subtotal: ₹{item.price * item.quantity}</p>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{total}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>Proceed to Payment</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
