import {ReactNode, createContext, useContext} from 'react';
import useCart, {IndividualCartItem} from '../hooks/useCart';
import {useUserContext} from './userContext';

type CartContexType = {
  cart: IndividualCartItem[];
  totalPrice: number;
  totalQuantity: number | null;
  editCart: (
    itemToEditId: string,
    newQuantity: number,
    operation?: 'increment' | 'decrement'
  ) => Promise<void>;
};

const CartContext = createContext<CartContexType | null>(null);

export default function CartProvider(props: {children: ReactNode}) {
  const userContext = useUserContext();
  const {cart, totalQuantity, totalPrice, editCart} = useCart(
    userContext?.user ?? null
  );
  return (
    <CartContext.Provider value={{cart, totalQuantity, totalPrice, editCart}}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
