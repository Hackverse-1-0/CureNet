import React, { useState } from "react";
import { FaShoppingCart, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ 
  query, setQuery, 
  cartCount = 0, 
  category, setCategory, 
  categories = [],  // default to empty array
  priceFilter, setPriceFilter 
}) => {

  const [filters, setFilters] = useState({
    inStock: false,
    discount: false,
    prescription: false,
  });

  const Navigate = useNavigate();

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.checked });

  return (
    <header className="header">
      <div className="logo">CureNet</div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search medicines..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </div>

      

      {/* Filters Dropdown */}
      <div className="filters-dropdown">
        <button className="filter-button">
          Filters ▾
        </button>
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={filters.inStock}
              onChange={handleFilterChange}
            />
            In Stock
          </label>
          <label>
            <input
              type="checkbox"
              name="discount"
              checked={filters.discount}
              onChange={handleFilterChange}
            />
            Discount
          </label>
          <label>
            <input
              type="checkbox"
              name="prescription"
              checked={filters.prescription}
              onChange={handleFilterChange}
            />
            Prescription Required
          </label>
        </div>
      </div>

      {/* Cart and Orders */}
      <div className="cart-orders">
        <button onClick={() => Navigate("/cart")}>
          <FaShoppingCart size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button onClick={() => Navigate("/orders")}>
          <FaClipboardList size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
