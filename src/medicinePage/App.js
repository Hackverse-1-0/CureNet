import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MedicineDetails from "./pages/MedicineDetails";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import "./pages/medicinePage.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicine/:id" element={<MedicineDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
