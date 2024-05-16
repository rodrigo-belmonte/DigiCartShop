"use client"

import React,{ createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({})

export function CartProvider({ children }: any) {
  const [state, setState] = useState<ProductCart[]>(() => {
    const localData = localStorage.getItem('prodsInCart');
    return localData ? JSON.parse(localData) : "";
  }); 
  
  useEffect(() => {
    localStorage.setItem('prodsInCart', JSON.stringify(state));
  }, [state]);
  
  const updateState = (newData:ProductCart[]) => {
    setState(newData);
  };

  return (
    <CartContext.Provider value={{ state, updateState }}>
        {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};


