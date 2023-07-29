// eslint-disable-next-line node/no-extraneous-import
import {
  Product,
  ProductCategory,
  ProductImage,
  ProductPayload,
  // eslint-disable-next-line node/no-extraneous-import
} from '@prisma/client';
import {useEffect, useState} from 'react';
import axios from './axios';

export type ProductList = (Product & {
  images: ProductImage[];
  category: ProductCategory;
})[];

export default function useProducts() {
  const [products, setProducts] = useState<ProductList | null>();

  useEffect(() => {
    async function getProducts() {
      return (await axios.get('/products')).data as ProductList;
    }

    try {
      getProducts().then(products => {
        console.log(products);
        setProducts(products);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  return products;
}
