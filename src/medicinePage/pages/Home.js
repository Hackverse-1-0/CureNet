import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import MedicineCard from "../components/MedicineCard";
import "./Home.css";
import image1 from "../../assets/Paracetmol.png";
import image2 from "../../assets/BidRx-10.png";
import image3 from "../../assets/vitaminC.png";
import image4 from "../../assets/cough.png";
import image5 from "../../assets/ibuprofen.png";
import image6 from "../../assets/cetirizine.png";
import image7 from "../../assets/Azithromycin.png";
import image8 from "../../assets/Multivitamins.png";
import image9 from "../../assets/cough.png";
import image11 from "../../assets/vitaminC.png"
import { useNavigate } from "react-router-dom"; // <-- change this import

// Sample Medicines Data
const SAMPLE_MEDICINES = [
  { id: 1, name: "Paracetamol", price: 50, category: "Pain Relief", desc: "Effective for fever and mild pain relief.", image: image1 },
  { id: 2, name: "Amoxicillin", price: 120, category: "Antibiotics", desc: "Used to treat bacterial infections.", image: image2 },
  { id: 3, name: "Vitamin C", price: 80, category: "Vitamins", desc: "Boosts immunity and overall health.", image: image3 },
  { id: 4, name: "Cough Syrup", price: 140, category: "Cold & Flu", desc: "Relieves sore throat and dry cough.", image: image4 },
  { id: 5, name: "Ibuprofen", price: 70, category: "Pain Relief", desc: "Reduces inflammation and pain.", image: image5 },
  { id: 6, name: "Cetirizine", price: 60, category: "Allergy", desc: "Relieves allergy symptoms.", image: image6 },
  { id: 7, name: "Azithromycin", price: 200, category: "Antibiotics", desc: "Treats various bacterial infections.", image: image7 },
  { id: 8, name: "Multivitamins", price: 150, category: "Vitamins", desc: "Comprehensive daily vitamin supplement.", image: image8 },
  { id: 9, name: "Cough Syrup", price: 140, category: "Cold & Flu", desc: "Relieves sore throat and dry cough.", image: image9 },
  { id: 10, name: "Cetirizine", price: 60, category: "Allergy", desc: "Relieves allergy symptoms.", image: image6 },
  { id: 11, name: "Vitamin C", price: 80, category: "Vitamins", desc: "Boosts immunity and overall health.", image: image11 },
  { id: 12, name: "Multivitamins", price: 150, category: "Vitamins", desc: "Comprehensive daily vitamin supplement.", image: image8 },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = useMemo(() => ["All", ...new Set(SAMPLE_MEDICINES.map(m => m.category))], []);

  // Add to cart
  const handleAddToCart = (medicine) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === medicine.id);
      if (exists) return prev.map(item => item.id === medicine.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...medicine, qty: 1 }];
    });
  };

const handleSingleOrder = (medicine) => {
  // 1️⃣ Update Cart in localStorage
  setCart(prev => {
    const exists = prev.find(item => item.id === medicine.id);
    let updatedCart;
    if (exists) {
      updatedCart = prev.map(item =>
        item.id === medicine.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...prev, { ...medicine, qty: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart)); // store cart
    return updatedCart;
  });

  // 2️⃣ Add Order to localStorage separately
  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: "Confirmed",
    items: [{ ...medicine, qty: 1 }],
  };

  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const updatedOrders = [...existingOrders, newOrder];
  localStorage.setItem("orders", JSON.stringify(updatedOrders)); // store orders

  // 3️⃣ Navigate to payment page
  alert("✅ Order placed successfully! Check your Orders page for details.");
  navigate("/payment");
};



  const filteredMedicines = useMemo(() => {
    return SAMPLE_MEDICINES.filter(med => {
      const matchSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = category === "All" || med.category === category;
      const matchPrice =
        priceFilter === "All" ||
        (priceFilter === "low" && med.price < 100) ||
        (priceFilter === "mid" && med.price >= 100 && med.price <= 200) ||
        (priceFilter === "high" && med.price > 200);
      return matchSearch && matchCategory && matchPrice;
    });
  }, [searchQuery, category, priceFilter]);

  return (
    <div className="home-page">
      <Header
        query={searchQuery}
        setQuery={setSearchQuery}
        cartCount={cart.length}
        category={category}
        setCategory={setCategory}
        categories={categories}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />

      <section className="hero-section">
        <div className="hero-content">
          <h1>💊 Your Trusted Online Pharmacy</h1>
          <p>Authentic medicines delivered fast — at the best prices.</p>
          <a href="#shop" className="btn-shop">Shop Now</a>
        </div>
      </section>

      <section className="medicine-section" id="shop">
        <h2 className="section-title">Available Medicines</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
            <option value="All">All Prices</option>
            <option value="low">Below ₹100</option>
            <option value="mid">₹100 - ₹200</option>
            <option value="high">Above ₹200</option>
          </select>
        </div>

        <div className="medicine-grid">
          {filteredMedicines.map(med => (
          <MedicineCard 
          key={med.id} 
          medicine={med} 
          onAdd={handleAddToCart} 
          onOrder={handleSingleOrder} 
        />
          ))}

        </div>

      </section>
    </div>
  );
};

export default Home;
