import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductTable from "./components/ProductTable";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<ProductTable />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;