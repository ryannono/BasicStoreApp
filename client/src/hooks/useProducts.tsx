// eslint-disable-next-line node/no-extraneous-import
import {
  Product,
  ProductCategory,
  ProductImage,
  // eslint-disable-next-line node/no-extraneous-import
} from '@prisma/client';
import {useEffect, useState} from 'react';
import axios from '../axios';

/**
 * A type representing an individual product. It extends from the base Product type
 * and includes an array of ProductImage and a single ProductCategory.
 */
export type IndividualProduct = Product & {
  images: ProductImage[];
  category: ProductCategory;
};

/**
 * A type representing a list of individual products.
 */
export type ProductList = IndividualProduct[];

/**
 * A custom hook for fetching and managing product data.
 *
 * If an ID is provided, the hook will return data for a single product. If no ID is
 * provided, it will return a list of all products.
 *
 * @param id - The ID of the product to fetch. If this parameter is provided, the
 * hook will return an IndividualProduct. If this parameter is not provided, the
 * hook will return a ProductList.
 *
 * @returns null if the product(s) have not been fetched yet, or the product(s) once
 * they have been fetched. The type of the return value depends on whether an ID was
 * provided.
 */
export default function useProducts<T>(
  id?: T
): null | (T extends string ? IndividualProduct : ProductList) {
  const [products, setProducts] = useState<
    ProductList | IndividualProduct | null
  >(null);

  useEffect(() => {
    async function getProducts() {
      try {
        axios.get(`/products${id ? `/${id}` : ''}`).then(response => {
          setProducts(response.data);
        });
      } catch (err) {
        console.error(err);
      }
    }

    if (!products) getProducts();
  }, [id]);
  return products as null | typeof id extends string
    ? IndividualProduct
    : ProductList;
}
