import React, { useState, useEffect } from "react";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Update localStorage when orders change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Cancel order handler
  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      );
      setOrders(updatedOrders);
    }
  };

  const activeOrders = orders.filter((order) => order.status !== "Cancelled");
  const cancelledOrders = orders.filter((order) => order.status === "Cancelled");

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>🛒 No Orders Yet</h2>
        <p>Once you place an order, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <>
          <h3 className="section-title">🟢 Active Orders</h3>
          {activeOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order ID: {order.id}</h3>
                <p>📅 Ordered On: {order.date}</p>
                <p>🚚 Expected Delivery: {order.expectedDelivery}</p>
                <p className={`status ${order.status.toLowerCase()}`}>
                  Status: {order.status}
                </p>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>₹{item.price}</p>
                      <p>Qty: {item.qty || 1}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-actions">
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Cancelled Orders */}
      {cancelledOrders.length > 0 && (
        <>
          <h3 className="section-title cancelled-title">❌ Cancelled Orders</h3>
          {cancelledOrders.map((order) => (
            <div key={order.id} className="order-card cancelled">
              <div className="order-header">
                <h3>Order ID: {order.id}</h3>
                <p>📅 Ordered On: {order.date}</p>
                <p>🚫 Status: Cancelled</p>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>₹{item.price}</p>
                      <p>Qty: {item.qty || 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrdersPage;
