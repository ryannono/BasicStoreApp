import React, {ReactNode, createContext, useContext} from 'react';
import useProducts, {IndividualProduct} from '../hooks/useProducts';

type ProductContextType = {
  products: IndividualProduct[] | null;
  productsMap: Map<string, IndividualProduct>;
};

const ProductsContext = createContext<ProductContextType | null>(null);

export default function ProductsProvider(props: {children: ReactNode}) {
  const {products, productsMap} = useProducts();
  return (
    <ProductsContext.Provider value={{products, productsMap}}>
      {props.children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  return useContext(ProductsContext);
}
