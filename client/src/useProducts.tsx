// eslint-disable-next-line node/no-extraneous-import
import {Product} from '@prisma/client';
import {useEffect, useState} from 'react';
import axios from './axios';

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      return (await axios.get('/products')) as Product[];
    }

    try {
      getProducts().then(products => setProducts(products as unknown as any[]));
    } catch (err) {
      console.error(err);
    }
  }, []);
  return products;
}
