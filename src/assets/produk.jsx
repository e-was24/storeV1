// src/Produk.jsx
import React from 'react';
import './Produk.css'; // Opsional, untuk styling khusus

function Produk({ brand }) {
  return (
    <div className="card">
      <h3>{brand}</h3>
    </div>
  );
}

export default Produk;
