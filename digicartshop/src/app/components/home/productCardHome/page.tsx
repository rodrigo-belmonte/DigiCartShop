"use client";

import { useCartContext } from "@/app/contexts/CartContext/CartContext";
import { Badge, Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";

type ProductCardProps = {
  _product: Product;
};
export default function ProductCard({ _product }: ProductCardProps) {
  const route = useRouter();
  const cart = useCartContext();



  function AddProdToCart(): void {
    if (cart.state !== "") {
      let prodExistsInCart = cart.state.filter(
        (product: ProductCart) => product.product.id == _product.id
      )[0];
      if (prodExistsInCart) {
        const prodincart = cart.state;
        prodincart.map((p: ProductCart) =>
          p.product.id === prodExistsInCart.product.id
            ? (p.quantity = p.quantity + 1)
            : (p = p)
        );
        cart.updateState(prodincart);
      } else {
        cart.updateState([...cart.state, { product: _product, quantity: 1 }]);
      }
    } else {
      cart.updateState([{ product: _product, quantity: 1 }]);
    }
  }

  return (
    <div>
      <Card
        className="max-w-sm mx-10 border-b-0 rounded-b-none"
        imgAlt={_product.detail}
        imgSrc={_product.image}
        href={`product?id=${_product.id}`}
      >
        <div>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {_product.name}
          </h5>
        </div>
        <div className="flex h-14 ">
          {_product.offer != undefined ? (
            <Badge
              icon={BiSolidOffer}
              color="green"
              className=" justify-center "
            >
              <span> {_product.offer}</span>
            </Badge>
          ) : (
            <div className="h-14"> </div>
          )}
        </div>
        <div>
        {_product.detail}
        </div>
      </Card>
      <Card className="mx-10 mb-10 flex items-center justify-between border-t-0 rounded-t-none">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          R${Number.parseInt(_product.price).toFixed(2).replace(".", ",")}
        </span>
        <Button fullSized onClick={AddProdToCart} className="w-full">
          Add to cart
        </Button>
      </Card>
    </div>
  );
}
