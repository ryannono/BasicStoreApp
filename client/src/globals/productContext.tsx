import React, {ReactNode, createContext, useContext} from 'react';
import useProducts, {IndividualProduct} from '../hooks/useProducts';

/**
 * Defines the type of the context that will be provided by the ProductsContext.
 */
type ProductContextType = {
  products: IndividualProduct[] | null;
  productsMap: Map<string, IndividualProduct>;
};

/**
 * ProductsContext is a React Context object. If a React Component is a part of the context provider,
 * ProductsContext.Provider can be used to change the context.
 */
const ProductsContext = createContext<ProductContextType | null>(null);

/**
 * ProductsProvider is a context provider for ProductsContext. It holds the state for products and
 * a Map to access each product individually. It uses the custom useProducts hook to create these states.
 *
 * @param {Object} props - The props that are passed to the ProductsProvider.
 * @param {ReactNode} props.children - The child components over which this context will be provided.
 * @returns {ReactNode} A Provider component which wraps the children and injects the context into them.
 */
export default function ProductsProvider(props: {children: ReactNode}) {
  const {products, productsMap} = useProducts();
  return (
    <ProductsContext.Provider value={{products, productsMap}}>
      {props.children}
    </ProductsContext.Provider>
  );
}

/**
 * useProductsContext is a custom hook for allowing easy access to the ProductsContext.
 *
 * @returns {ProductContextType} The value of the ProductsContext, which includes an array of products and a map of products.
 *
 * @throws {Error} If the context is null (i.e., if this hook is called outside of the ProductsProvider component), an error is thrown.
 */
export function useProductsContext() {
  return useContext(ProductsContext);
}
