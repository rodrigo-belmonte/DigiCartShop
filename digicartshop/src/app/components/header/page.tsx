"use client";

import { Navbar, NavbarToggle, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiSolidCart } from "react-icons/bi";
import { useCartContext } from "@/app/contexts/CartContext/CartContext";
import { CartDrawer } from "../cart/cartDrawer/page";

function Header() {
  const [drawerOpen, setdrawerOpen] = useState<boolean>(false);
  const [productsCart, setproductsCart] = useState<ProductCart[]>([]);
  useEffect(() => {
    if (cart.state != "") {
      setproductsCart(cart.state);
    }
  }, []);
  const onCartDrawerOpen = () => {
    setdrawerOpen(true);
  };
  const cart = useCartContext();

  const handleCloseDrawer = () => {
    setdrawerOpen(false);
  };

  return (
    <>
      <Navbar fluid rounded className="h-20">
        <Navbar.Brand className="lg:pl-10" href="/">
          Digi CartShop
        </Navbar.Brand>
        <div className="flex order-2 h-full lg:pr-10 ">
          <div className="mx-auto flex flex-wrap items-center justify-between"></div>
          <Button className="rounded-full" href="/cart">
            <BiSolidCart size={40} />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {productsCart.length}
            </div>
          </Button>
        </div>
        <a className=" w-auto  text-xl" href="/">
          Home
        </a>
      </Navbar>
      <CartDrawer drawerOpen={drawerOpen} handleClose={handleCloseDrawer} />
    </>
  );
}

export default Header;
