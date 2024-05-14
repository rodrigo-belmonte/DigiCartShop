"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  Button,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import { CartDrawer } from "../_ui/cartDrawer/page";
import { useState } from "react";
import { BiSolidCart } from "react-icons/bi";



function Header() {
  const [drawerOpen, setdrawerOpen] = useState<boolean>(false);
  const route = useRouter();

  const onCartDrawerOpen = () => {
    setdrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setdrawerOpen(false);
  };
  return (
    <>
      <Navbar fluid rounded className="h-20">
        <NavbarBrand href="/"></NavbarBrand>
        <div className="flex md:order-2 h-full">
          <Button onClick={onCartDrawerOpen} className="rounded-full"><BiSolidCart size={40} /></Button>
        </div>

       
      </Navbar>
      <CartDrawer drawerOpen={drawerOpen} handleClose={handleCloseDrawer} />
    </>
  );
}

export default Header;
