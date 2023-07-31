import {useState, useEffect, useReducer} from 'react';
import axios from '../../axios';
import {ClientUser} from '../useUser';
import {useProductsContext} from '../../globals/productContext';
import {IndividualCartItem} from './useCartTypes';
import {
  getCart,
  updateLocalCart,
  saveLocalCart,
  getTotalQuantity,
  getTotalPrice,
  reducer,
} from './useCartFunctions';

/**
 * A hook that manages the cart functionality. It provides several utilities
 * like getting the cart for a user, updating the cart, and calculating total
 * price and quantity. It also manages updating the cart status in the backend
 * and local storage based on the user's actions.
 *
 * @param user - The currently logged-in user or null if no user is logged in.
 *
 * @returns An object with properties:
 *   - `cart`: An array of items currently in the cart.
 *   - `totalQuantity`: The total quantity of items in the cart.
 *   - `totalPrice`: The total price of items in the cart.
 *   - `editCart`: A function to edit the cart.
 */
export default function useCart(user: ClientUser | null) {
  const {productsMap} = useProductsContext()!;
  const [pendingUpdates, setPendingUpdates] = useState<IndividualCartItem[]>(
    []
  );
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    totals: {quantity: 0, price: 0},
  });

  async function editCart(itemToEditId: string, newQuantity: number) {
    // get local cart
    const currentCart = await getCart(undefined);
    if (!currentCart) return;

    //mutate and save local cart
    const updatedCart = updateLocalCart(currentCart, itemToEditId, newQuantity);
    saveLocalCart(updatedCart);
    dispatch({type: 'SET_CART', cart: updatedCart});

    // if user is logged send updates to
    // pending datbase mutations
    if (user) {
      setPendingUpdates([
        ...pendingUpdates,
        {
          productId: itemToEditId,
          productQuantity: newQuantity,
        },
      ]);
    }
    return;
  }

  // set initial cart in state
  useEffect(() => {
    async function getAndSetCart() {
      const cart = await getCart(user?.id);
      if (cart) {
        dispatch({type: 'SET_CART', cart});
        dispatch({
          type: 'SET_TOTALS',
          totals: {
            quantity: getTotalQuantity(cart),
            price: getTotalPrice(cart, productsMap),
          },
        });
      }
    }

    getAndSetCart();
  }, [user, productsMap]);

  // manages batch updates to database
  useEffect(() => {
    if (user && pendingUpdates.length > 0) {
      const timer = setTimeout(async () => {
        try {
          // send all pending updates as single request
          await axios.put(`/users/${user.id}/cart`, pendingUpdates, {
            withCredentials: true,
          });
          setPendingUpdates([]);
        } catch (err) {
          console.error(err);
        }
      }, 2000); // 2 second delay

      // cleanup
      return () => clearTimeout(timer);
    }
  }, [pendingUpdates]);

  // update total on cart or product changes
  useEffect(() => {
    const totals = {
      quantity: getTotalQuantity(state.cart),
      price: getTotalPrice(state.cart, productsMap),
    };
    dispatch({type: 'SET_TOTALS', totals});
  }, [state.cart, productsMap]);

  return {
    cart: state.cart,
    totalQuantity: state.totals.quantity,
    totalPrice: state.totals.price,
    editCart,
  } as const;
}
