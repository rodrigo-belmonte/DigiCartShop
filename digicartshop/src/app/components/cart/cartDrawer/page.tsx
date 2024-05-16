"use client";

import { Drawer } from "flowbite-react";
import { ProductCardCart } from "../productCardCart/page";
import { useEffect, useState } from "react";
import { useCartContext } from "@/app/contexts/CartContext/CartContext";

type CartDrawerProps = {
  drawerOpen: boolean;
  handleClose: any;
};

export function CartDrawer({ drawerOpen, handleClose }: CartDrawerProps) {
  const [products, setProducts] = useState<ProductCart[] | null>([]);
  const [cart, setcart] = useState(useCartContext());

  useEffect(() => {
    window.addEventListener('storage', () => {
      const localData = localStorage.getItem('prodsInCart');
      setProducts( localData ? JSON.parse(localData) : []);
    });
  }, []);


  useEffect(() => {
    if (cart.state != "") setProducts(cart.state);
  }, [cart]);

  return (
    <>
      <Drawer open={drawerOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Cart Shop" />
        <Drawer.Items>
          {products.map((product) => (
            <ProductCardCart key={product.product.id} _productCart={product} />
          ))}
        </Drawer.Items>
      </Drawer>
    </>
  );
}
