import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: "", cardNumber: "", expiry: "", cvv: "" });
  const [activeTab, setActiveTab] = useState("card"); // Card payment by default

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful! ✅");
    navigate("/success");
  };

  return (
    <>
      <Header />

      <div className="prof-payment-page">
        <div className="prof-payment-container">
          {/* Cart Summary */}
          <div className="prof-cart-summary">
  <h2>🛒 Order Summary</h2>

  {cart.length === 0 ? (
    <p className="empty-cart">Your cart is empty</p>
  ) : (
    <div className="summary-items-container">
      {/* Order Details */}
      <div className="order-details">
        <p><strong>Order ID:</strong> #{Math.floor(100000 + Math.random() * 900000)}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
      </div>

      {/* Cart Items */}
      {cart.map((item) => (
        <div className="summary-card" key={item.id}>
          <div className="summary-card-left">
            <img src={item.image} alt={item.name} />
            <div className="summary-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
          <div className="summary-card-right">
            <p>₹{item.price * item.quantity}</p>
          </div>
        </div>
      ))}

      <div className="summary-divider"></div>

      {/* Charges Section */}
      <div className="charges-section">
        <div className="charge-row">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>
        <div className="charge-row">
          <span>Tax (5%)</span>
          <span>₹{(total * 0.05).toFixed(2)}</span>
        </div>
        <div className="charge-row">
          <span>Delivery Charges</span>
          <span>₹50</span>
        </div>
      </div>

      <div className="summary-divider"></div>

      {/* Total */}
      <div className="summary-total">
        <h3>Total</h3>
        <h3>₹{(total * 1.05 + 50).toFixed(2)}</h3>
      </div>
    </div>
  )}
</div>



          {/* Payment Section */}
          <div className="prof-payment-form">
            <h2>💳 Payment Options</h2>

            {/* Tabs */}
            <div className="payment-tabs">
              <button className={activeTab === "card" ? "active" : ""} onClick={() => setActiveTab("card")}>Card</button>
              <button className={activeTab === "upi" ? "active" : ""} onClick={() => setActiveTab("upi")}>UPI / QR</button>
              <button className={activeTab === "netbanking" ? "active" : ""} onClick={() => setActiveTab("netbanking")}>Net Banking</button>
            </div>

            {/* Tab Contents */}
            {activeTab === "card" && (
              <form onSubmit={handlePayment} className="payment-form">
                <label>
                  Cardholder Name
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                </label>

                <label>
                  Card Number
                  <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength="16" required />
                </label>

                <div className="form-row">
                  <label>
                    Expiry
                    <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" maxLength="5" required />
                  </label>
                  <label>
                    CVV
                    <input type="password" name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" maxLength="3" required />
                  </label>
                </div>

                <button type="submit" className="pay-btn">Pay ₹{total}</button>
              </form>
            )}

            {activeTab === "upi" && (
              <div className="qr-payment">
                <p>Scan this QR code with your UPI app to pay ₹{total}</p>
                <img src="https://via.placeholder.com/200?text=QR+Code" alt="UPI QR" className="qr-code" />
              </div>
            )}

            {activeTab === "netbanking" && (
              <div className="netbanking-info">
                <p>Select your bank to pay ₹{total}:</p>
                <select>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>SBI</option>
                  <option>Axis Bank</option>
                </select>
                <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
