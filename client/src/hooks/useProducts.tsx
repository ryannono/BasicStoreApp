import {
  Product,
  ProductCategory,
  ProductImage,
  // eslint-disable-next-line node/no-extraneous-import
} from '@prisma/client';
import {useEffect, useMemo, useState} from 'react';
import axios from '../axios';

export default function useProducts() {
  const [products, setProducts] = useState<IndividualProduct[] | null>(null);
  const productsMap = useMemo(
    () => new Map(products?.map(product => [product.id, product])),
    [products]
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, []);

  return {
    products,
    productsMap,
  };
}

export type IndividualProduct = Product & {
  images: ProductImage[];
  category: ProductCategory;
};

export type ProductOrProductList<T extends string | null> = T extends string
  ? IndividualProduct
  : IndividualProduct[];

type IdType = string | null;
