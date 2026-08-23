"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const PizzaCard = ({ pizza }) => {
  const { addToCart } = useCart();

  const startingPrice = pizza.sizes.medium.price;

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    addToCart({
      id: pizza.id,
      name: pizza.name,
      image: pizza.image,
      selectedSize: "Medium",
      diameterInches: pizza.sizes.medium.diameterInches,
      price: startingPrice,
      quantity: 1
    });
    alert("Added to cart!");
  };

  return (
    <div className="catagory-product-card-2 shadow-style text-center">
      <div className="icon">
        <button style={{background:'none',border:'none'}}>
          <i className="far fa-heart" />
        </button>
      </div>
      <div className="catagory-product-image">
        <Link href={`/pizza/${pizza.slug}`}>
          <img 
            src={pizza.image} 
            alt={pizza.name} 
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
          />
        </Link>
      </div>
      <div className="catagory-product-content">
        <div className="catagory-button">
          <button onClick={handleAddToCart} className="theme-btn-2" style={{border: 'none', cursor: 'pointer'}}>
            <i className="far fa-shopping-basket" />
            Add To Cart
          </button>
        </div>
        <div className="info-price d-flex align-items-center justify-content-center">
          <h6>${startingPrice.toFixed(2)}</h6>
        </div>
        <h4>
          <Link href={`/pizza/${pizza.slug}`}>{pizza.name}</Link>
        </h4>
        <p style={{fontSize: '14px', margin: '10px 0', color: '#666'}}>{pizza.shortDescription}</p>
        <div className="star">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`fas fa-star ${i >= Math.floor(pizza.rating) ? 'text-white' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
