import { Badge, Card } from "flowbite-react";
import { BiSolidOffer } from "react-icons/bi";

type ProductCardProps = {
  _product: Product;
};
export default function ProductCard({ _product }: ProductCardProps) {

  return (
    <Card
      className="max-w-sm m-10"
      imgAlt={_product.detail}
      imgSrc={_product.image}
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {_product.name}
        </h5>
      </a>
      <div className="flex ">
        {_product.offer != undefined ? (  
          <Badge icon={BiSolidOffer} color="green" className=" justify-center ">
           <span> {_product.offer}</span>
          </Badge>
        ) : (
          <></>
        )}
      </div>
     
      
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          R${_product.price}
        </span>
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
      </div>
    </Card>
  );
}

