import {ReactNode, createContext, useContext} from 'react';
import useCart, {IndividualCartItem} from '../hooks/useCart';

type CartContexType = {
  cart: IndividualCartItem[];
  addToCart: (
    item: IndividualCartItem,
    cartId?: string | undefined
  ) => Promise<void>;
};

const CartContext = createContext<CartContexType | null>(null);

export default function CartProvider(props: {children: ReactNode}) {
  const {cart, addToCart} = useCart();
  return (
    <CartContext.Provider value={{cart, addToCart}}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
