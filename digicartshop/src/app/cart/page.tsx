"use client";

import { useEffect, useState } from "react";
import { ProductCardCart } from "../components/_ui/productCardCart/page";
import { Button } from "flowbite-react";
import { useCartContext } from "../contexts/CartContext/CartContext";

export default function Cart() {
  const [productsCart, setproductsCart] = useState<ProductCart[]>([]);
  const [total, settotal] = useState<number>(0);
  const cart = useCartContext();

  useEffect(() => {
    if (cart.state != "") {
      setproductsCart(cart.state);
    }
  }, []);

  useEffect(() => {
    console.log(productsCart);
    const subtotal = productsCart.map((product) => {
      return product.quantity * Number.parseInt(product.product.price);
    });
    console.log(subtotal);
    const total = subtotal.reduce(function (total, valor) {
      return total + valor;
    }, 0);
    settotal(total);
    console.log(total);
  }, [productsCart]);

  function handleFecharPedido(): void {
    cart.updateState("");
    
  }

  return (
    <div >
      {productsCart.length <= 0 ? (
        <div className="flex flex-col items-center p-10 m-10  ">  
         Seu Carrinho Está Vazio :(

          <a href="/" className="text-blue-500">Volte para a nossa Loja </a>
        </div>
      ) : (
        <div className="flex flex-col items-center  ">
          <div className="border border-solid rounded-lg p-10 mb-5 lg:w-1/2 md:w-2/3 ">
            {productsCart.map((productcart) => (
              <ProductCardCart
                key={productcart.product.id}
                _productCart={productcart}
                _productsCart={productsCart}
                _setproductsCart={setproductsCart}
              />
            ))}
          </div>
          <div className="border border-solid rounded-lg p-5 w-1/2 text-center ">
            Total <span className="font-semibold text-sm">R$ </span>
            <span className="font-bold text-2xl">
              {total.toFixed(2).replace(".", ",")}
            </span>
            
            <div className="mt-5">
              <Button onClick={handleFecharPedido} className="w-full">
                Fechar Pedido
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
