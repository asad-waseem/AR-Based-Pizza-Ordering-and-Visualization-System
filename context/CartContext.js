"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("arPizzaCart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      localStorage.removeItem("arPizzaCart");
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("arPizzaCart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Create a unique line ID based on pizza ID and configuration (size)
      const lineId = `${item.id}-${item.selectedSize}`;
      const existingItem = prevItems.find((i) => i.lineId === lineId);

      if (existingItem) {
        return prevItems.map((i) =>
          i.lineId === lineId ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [...prevItems, { ...item, lineId, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (lineId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.lineId !== lineId));
  };

  const updateQuantity = (lineId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((i) => (i.lineId === lineId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
