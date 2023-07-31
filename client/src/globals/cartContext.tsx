import {ReactNode, createContext, useContext} from 'react';
import useCart from '../hooks/useCart/useCart';
import {useUserContext} from './userContext';
import {IndividualCartItem} from '../hooks/useCart/useCartTypes';

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

/**
 * The context that provides access to the cart.
 *
 * The context value includes:
 *  - `cart`: An array of items currently in the cart.
 *  - `totalPrice`: The total price of items in the cart.
 *  - `totalQuantity`: The total quantity of items in the cart.
 *  - `editCart`: A function to edit the cart.
 */
const CartContext = createContext<CartContexType | null>(null);

/**
 * A component that provides the CartContext to its descendants.
 *
 * @param props - The props to pass down to this component.
 * @param props.children - The children components to render inside this provider.
 */
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

/**
 * A hook to use the CartContext in a component.
 *
 * @returns The current value of the CartContext.
 */
export function useCartContext() {
  return useContext(CartContext);
}
