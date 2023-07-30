import {
  Product,
  ProductCategory,
  ProductImage,
  // eslint-disable-next-line node/no-extraneous-import
} from '@prisma/client';
import {useEffect, useRef, useState} from 'react';
import axios from '../axios';

type IndividualProduct = Product & {
  images: ProductImage[];
  category: ProductCategory;
};

export type ProductList = IndividualProduct[];

export type ProductOrProductList<T extends string | null> = T extends string
  ? IndividualProduct
  : ProductList;

type IdType = string | null;

export default function useProducts<T extends IdType>(
  id: T
): null | ProductOrProductList<T> {
  const [products, setProducts] = useState<ProductOrProductList<T> | null>(
    null
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`/products${id ? `/${id}` : ''}`);
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, []);

  return products;
}
