import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider(props) {
  const [cart, setCart] = useState([]);
  const addTpCart = () => {};
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, increaseQuantity, decreaseQuantity }}>
      {props.children}
    </CartContext.Provider>
  );
}
