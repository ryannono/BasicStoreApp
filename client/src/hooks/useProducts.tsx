import {
  Product,
  ProductCategory,
  ProductImage,
  // eslint-disable-next-line node/no-extraneous-import
} from '@prisma/client';
import {useEffect, useMemo, useState} from 'react';
import axios from '../axios';

/**
 * Fetches product data and provides this data and a Map for efficient access to individual products.
 */
export default function useProducts() {
  // Initialize products state
  const [products, setProducts] = useState<IndividualProduct[] | null>(null);

  // Create a Map for efficient access to individual products
  const productsMap = useMemo(
    () => new Map(products?.map(product => [product.id, product])),
    [products]
  );

  useEffect(() => {
    // Fetch product data asynchronously
    async function fetchProducts() {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    // Call the fetch function
    fetchProducts();
  }, []);

  return {
    products,
    productsMap,
  };
}

/**
 * IndividualProduct type is an extension
 * of the Product type with images and category properties added
 */
export type IndividualProduct = Product & {
  images: ProductImage[];
  category: ProductCategory;
};
