"use client";
import React from "react";

const PizzaQuantitySelector = ({ quantity, setQuantity }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="cart-item-num mb-4">
      <div className="cart-item-num-inner d-flex align-items-center">
        <button className="cart-btn" onClick={handleDecrement} style={{border:'none', background:'#eee', padding:'10px 15px', cursor:'pointer'}}>-</button>
        <input 
          type="number" 
          value={quantity} 
          readOnly 
          style={{width:'50px', textAlign:'center', border:'1px solid #ddd', padding:'9px 0'}} 
        />
        <button className="cart-btn" onClick={handleIncrement} style={{border:'none', background:'#eee', padding:'10px 15px', cursor:'pointer'}}>+</button>
      </div>
    </div>
  );
};

export default PizzaQuantitySelector;
