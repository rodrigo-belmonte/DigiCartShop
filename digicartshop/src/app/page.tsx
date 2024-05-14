"use client";

import { useEffect, useState } from "react";
import HeroProduct from "./components/home/heroProduct/page";
import { GetProducts } from "./services/ProductServices/ProductRequests";
import ProductCard from "./components/home/productCardHome/page";

export default function Home() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [heroProduct, setheroProduct] = useState<Product>({
    name: "",
    detail: "",
    hero: "",
    id: "",
    image: "",
    info: "",
    offer: "",
    price: "",
  });

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    console.log(productList);
    const hero = productList.filter((product) => product.hero !== undefined)[0];
    if (hero != undefined) setheroProduct(hero);
  }, [productList]);

  async function getProducts() {
    setProductList(await GetProducts());
  }

  return (
    <div>
      <HeroProduct _product={heroProduct} />
      <div className="flex flex-wrap justify-center">
        {productList.filter((product) => product.hero == undefined).map((product) => (
          <ProductCard key={product.id} _product={product} />
        ))}
      </div>
    </div>
  );
}
