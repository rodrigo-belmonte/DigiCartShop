"use client";

import { use, useEffect, useState } from "react";
import { ProductCardCart } from "../components/cart/productCardCart/page";
import { Button, Modal } from "flowbite-react";
import { useCartContext } from "../contexts/CartContext/CartContext";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BiHappyAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function Cart() {
  const route = useRouter();
  const [productsCart, setproductsCart] = useState<ProductCart[]>([]);
  const [total, settotal] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
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
    setOpenModal(true);
  }

  return (
    <div>
      {productsCart.length <= 0 ? (
        <div className="flex flex-col items-center p-10 m-10  ">
          Seu Carrinho Está Vazio :(
          <a href="/" className="text-blue-500">
            Volte para a nossa Loja{" "}
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center  ">
          <div className="border border-solid rounded-lg p-5 mb-5 lg:w-1/2 md:w-2/3 w-full ">
            {productsCart.map((productcart) => (
              <ProductCardCart
                key={productcart.product.id}
                _productCart={productcart}
                _productsCart={productsCart}
                _setproductsCart={setproductsCart}
              />
            ))}
          </div>
          <div className="border border-solid rounded-lg p-5 lg:w-1/2 md:w-2/3  w-full text-center ">
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
      <Modal
        show={openModal}
        size="md"
        onClose={() => route.push("/")}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BiHappyAlt className="mx-auto mb-4 h-14 w-14 " />
            <h3 className="mb-5 text-lg font-normal ">
              Obrigado por comprar com a gente!
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" href="/">
                Voltar a Loja
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
