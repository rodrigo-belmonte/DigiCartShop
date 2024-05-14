import { Axios, AxiosError, AxiosResponse } from "axios";
import { api } from "../ApiRequest";


export async function GetProducts(): Promise<Product[]> {
    let responseGetProducts: Product[] = [];

    await api
    .get(`/products`)
    .then((response: AxiosResponse) => {
      response.data.map((prod: any) => {
        const product: Product = {
            id: prod.id,
            name: prod.name,
            detail: prod.detail,
            hero: prod.hero,
            image: prod.image,
            info: prod.info,
            offer: prod.offer,
            price: prod.price,
        }
        responseGetProducts.push(product);
      })
    })

    return responseGetProducts;
}
  

export async function GetProductById(id: string): Promise<Product> {
    let responseGetProductById: Product = {
        name: "",
        detail: "",
        hero: "",
        id: "",
        image: "",
        info: "",
        offer: "",
        price: "",
      };

    await api
    .get(`/products/${id}`)
    .then((response: AxiosResponse) => {
        responseGetProductById = {
            id: response.data.id,
            name: response.data.name,
            detail: response.data.detail,
            hero: response.data.hero,
            image: response.data.image,
            info: response.data.info,
            offer: response.data.offer,
            price: response.data.price,
        }
    })

    return responseGetProductById;
}