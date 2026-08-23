"use client";
import React from "react";

const PizzaSizeSelector = ({ sizes, selectedSize, onSizeChange }) => {
  return (
    <div className="pizza-size-selector mb-4">
      <h5 className="mb-3">Choose Size:</h5>
      <div className="d-flex gap-3 flex-wrap">
        {Object.entries(sizes).map(([key, size]) => (
          <button
            key={key}
            className={`btn ${selectedSize === size.label ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => onSizeChange(size.label)}
            style={{ minWidth: '100px' }}
          >
            <strong>{size.label}</strong>
            <div style={{ fontSize: '0.85em', marginTop: '5px' }}>
              {size.diameterInches} in / {(size.diameterMeters * 100).toFixed(1)} cm
            </div>
            <div style={{ fontSize: '0.85em' }}>
              ${size.price.toFixed(2)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PizzaSizeSelector;
