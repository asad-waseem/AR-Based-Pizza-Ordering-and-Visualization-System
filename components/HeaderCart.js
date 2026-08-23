"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const HeaderCart = ({ iconClass = "far fa-shopping-basket" }) => {
  const { cartItems, getCartCount, getCartSubtotal, removeFromCart } = useCart();
  const count = getCartCount();
  const subtotal = getCartSubtotal();

  return (
    <div className="menu-cart">
      <div className="cart-box">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <ul key={item.lineId}>
                <li className={index === cartItems.length - 1 ? "border-none" : ""}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-product">
                    <Link href={`/pizza/${item.id}`}>{item.name}</Link>
                    <span>
                      {item.selectedSize} - ${item.price.toFixed(2)} x {item.quantity}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.lineId)} 
                      style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', display: 'block', fontSize: '12px', padding: 0 }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              </ul>
            ))}
            <div className="shopping-items d-flex align-items-center justify-content-between">
              <span>Items : {count}</span>
              <span>Total : ${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-button d-flex justify-content-between mb-4">
              <Link href="/shop-cart" className="theme-btn">
                View Cart
              </Link>
              <Link href="/checkout" className="theme-btn bg-red-2">
                Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="empty-cart text-center p-4">
            <p>Your cart is empty.</p>
            <div className="cart-button d-flex justify-content-center">
              <Link href="/menu" className="theme-btn">
                Shop Pizzas
              </Link>
            </div>
          </div>
        )}
      </div>
      <Link href="/shop-cart" className="cart-icon">
        <i className={iconClass} />
        {count > 0 && (
          <span className="cart-count badge bg-danger position-absolute" style={{ top: '-5px', right: '-10px', borderRadius: '50%' }}>
            {count}
          </span>
        )}
      </Link>
    </div>
  );
};

export default HeaderCart;
