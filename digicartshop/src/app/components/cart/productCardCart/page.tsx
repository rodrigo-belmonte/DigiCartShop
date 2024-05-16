import { Card } from "flowbite-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { useCartContext } from "@/app/contexts/CartContext/CartContext";

type ProductCardCart = {
  _productCart: ProductCart;
  _productsCart: ProductCart[];
  _setproductsCart: Dispatch<SetStateAction<ProductCart[]>>;
};

export function ProductCardCart({
  _productCart,
  _productsCart,
  _setproductsCart,
}: ProductCardCart) {
  const [qtd, setqtd] = useState<number>(_productCart.quantity);
  const [productCart, setproductCart] = useState<ProductCart>(_productCart);
  const cart = useCartContext();

  useEffect(() => {
    setproductCart({ ...productCart, quantity: qtd });
  }, [qtd]);

  useEffect(() => {
    if (_productsCart) {
      const prodsCart = _productsCart.map((p: ProductCart) => {
        if (p.product.id === productCart.product.id) {
          p.quantity = productCart.quantity;
        }
        return p;
      });

      cart.updateState(prodsCart);
      _setproductsCart(prodsCart);
    }
  }, [productCart]);

  function handleUpdateQuantity(e: ChangeEvent<HTMLInputElement>) {
    setqtd(Number.parseInt(e.target.value));
  }

  function handleDelete(): void {
    const prodsCart = _productsCart.filter(
      (prod) => prod.product.id !== productCart.product.id
    );
    cart.updateState(prodsCart);
    _setproductsCart(prodsCart);
  }

  return (
    <div className="flex border border-solid rounded-lg p-10 mb-5">
      <div className="mr-5">
        <Image
          width={300}
          height={300}
          alt={_productCart.product.detail}
          src={_productCart.product.image}
        />
      </div>
      <div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
          {_productCart.product.name}
        </h5>
        <p className="font-normal  mb-5">{_productCart.product.detail}</p>
        <p className="font-normal ">
          R$
          {Number.parseInt(_productCart.product.price)
            .toFixed(2)
            .replace(".", ",")}
        </p>
        <div className="max-w-sm  w-20 my-10">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Quantidade
          </label>
          <input
            type="number"
            id="number-input"
            value={qtd}
            onChange={handleUpdateQuantity}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
          />
        </div>
        <div>
          <a className="cursor-pointer text-blue-500 underline" onClick={handleDelete}>
            Excluir
          </a>
        </div>
      </div>
    </div>
  );
}
