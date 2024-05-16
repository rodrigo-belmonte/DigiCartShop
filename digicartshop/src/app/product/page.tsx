"use client";

import { GetProductById } from "@/app/services/ProductServices/ProductRequests";
import {
  Badge,
  Button,
  Card,
  CustomFlowbiteTheme,
  Label,
  Rating,
  TextInput,
} from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import Image from "next/image";
import { useCartContext } from "../contexts/CartContext/CartContext";

type ProductProps = {
  _product: Product;
};

const customCardTheme: CustomFlowbiteTheme["card"] = {
  img: {
    base: "w-full",
    horizontal: {
      on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};
export default function Product() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product>({
    name: "",
    detail: "",
    hero: "",
    id: "",
    image: "",
    info: "",
    offer: "",
    price: "",
  });
  const [imagewidth, setimagewidth] = useState<number>(300);
  const [imageheight, setimageheight] = useState<number>(300);
  const [qtd, setqtd] = useState<number>(1);
  const cart = useCartContext();
  
  const id = searchParams.get("id");

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (product.hero != undefined) {
      setimagewidth(940);
    }
  }, [product]);
  async function getProduct() {
    setProduct(await GetProductById(id));
  }

  

  function SendToCart(): void {
    const prodCart : ProductCart = {
      product: product,
      quantity: qtd
    }
    if (cart.state !== "") {
      let prodExistsInCart = cart.state.filter(
        (product: any) => product.product.id == product.id
      )[0];
      if (prodExistsInCart) {
        const prodincart = cart.state;
        prodincart.map((p: ProductCart) =>
          p.product.id === prodExistsInCart.product.id
            ? (p.quantity = p.quantity + qtd)
            : (p = p)
        );
        cart.updateState(prodincart);
      } else {
        cart.updateState([...cart.state, prodCart]);
      }
    } else {
      cart.updateState([prodCart]);
    }
    router.push("/cart");
  }

  return (
    <div>
      {product ? (
        <div className=" flex justify-center   ">
        <Card className=" lg:w-1/2   items-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
          <Image
            width={imagewidth}
            height={imageheight}
            alt={product.detail}
            src={product.image}
          />
          <Rating className="mb-2">
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              5 out of 5
            </p>
          </Rating>
          {product.offer ? (
            <Badge
              icon={BiSolidOffer}
              color="green"
              className=" justify-center mb-10 w-fit"
            >
              <span> {product.offer}</span>
            </Badge>
          ) : (
            <></>
          )}

          <p className="font-normal text-gray-700 dark:text-gray-400  ">
            {product.info}
          </p>
          <span className="text-3xl font-bold text-gray-900 dark:text-white ">
            R${Number.parseInt(product.price).toFixed(2).replace(".", ",")}
          </span>
          <p className="text-1xl font-bold text-gray dark:text-white ">
            Detalhes do produto
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400 ">
            {product.detail}
          </p>
          <div className="max-w-sm mx-auto w-20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Quantidade
            </label>
            <input
              type="number"
              id="number-input"
              value={qtd}
              onChange={ (e) => {setqtd(Number.parseInt(e.target.value))}}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0"
              required
            />
          </div>
          <div>
            <Button className="w-full" onClick={SendToCart}>Comprar</Button>
          </div>
        </Card>
      </div>
      ) : (
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>
            <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
        
        ) }
      
    </div>
  );
}
