"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import FoodKingLayout from "@/layouts/FoodKingLayout";

export default function TestCart() {
  const { addToCart, clearCart, getCartCount, cartItems } = useCart();

  const addTestPizza = () => {
    addToCart({
      id: "p1",
      name: "Test Pizza",
      price: 15.99,
      quantity: 1,
      image: "/assets/img/shop-food/s1.png",
      selectedSize: "Medium",
      diameterInches: 12
    });
  };

  return (
    <FoodKingLayout>
      <div className="container section-padding text-center">
        <h2>Cart Test Page</h2>
        <p>Current Count: {getCartCount()}</p>
        <button className="theme-btn" onClick={addTestPizza}>Add Test Pizza</button>
        <button className="theme-btn bg-red-2 ml-2" onClick={clearCart}>Clear Cart</button>
      </div>
    </FoodKingLayout>
  );
}
