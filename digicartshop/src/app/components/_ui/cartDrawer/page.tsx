"use client";

import {  Drawer } from "flowbite-react";


type CartDrawerProps = {
    drawerOpen: boolean;
    handleClose: any
  };

export function CartDrawer({drawerOpen, handleClose}: CartDrawerProps) {

  return (
    <>
      <Drawer open={drawerOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Cart Shop" />
        <Drawer.Items>
         
        </Drawer.Items>
      </Drawer>
    </>
  );
}
