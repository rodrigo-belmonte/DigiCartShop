"use client";
import { Badge } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiShocked } from "react-icons/bi";

type HeroProductProps = {
  _product: Product;
};

function HeroProduct({ _product }: HeroProductProps) {
  return (
    <section className="bg-white  flex">
      <div className="justify-center py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-2 text-sm  rounded-full"
          role="alert"
        >
          <Badge
            color="success"
            size="7xl"
            icon={BiShocked}
            className="text-sm font-medium px-4 py-1.5 mr-3"
          >
            {_product.hero}
          </Badge>
        </div>
        <div className="mb-5">
          <Image
            width={940}
            height={300}
            alt={_product.detail}
            src={_product.image}
          />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {_product.name}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          {_product.detail}
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href={`product?id=${_product.id}`}
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Ver Produto
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroProduct;
