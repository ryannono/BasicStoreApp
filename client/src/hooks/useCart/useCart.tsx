import {useState, useEffect, useReducer} from 'react';
import {useProductsContext} from '../../globals/productContext';
import {useUserContext} from '../../globals/userContext';
import {getTotals} from './useCartFunctions';
import {
  getCart,
  updateLocalCart,
  saveLocalCart,
  reducer,
  updateDatabaseCart,
} from './useCartFunctions';

/**
 * Custom hook `useCart` provides the functionality to handle the shopping cart state and its side effects.
 * It interfaces with the local storage to maintain the cart state when a user is not logged in, and communicates
 * with the database when a user is logged in.
 *
 * @returns {Object} An object containing the current state of the cart and a function to edit it.
 *
 * @property {CartItem[]} cart - An array of items currently in the cart.
 * @property {number} totalQuantity - Total quantity of items in the cart.
 * @property {number} totalPrice - Total price of items in the cart.
 * @property {(itemToEditId: string, newQuantity: number): Promise<void>} editCart - Function to edit the quantity of an item in the cart.
 */
export default function useCart() {
  const {productsMap} = useProductsContext()!;
  const [pendingUpdates, setPendingUpdates] = useState(new Map());
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    totals: {quantity: 0, price: 0},
  });
  const user = useUserContext()?.user;

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
      pendingUpdates.set(itemToEditId, {
        productId: itemToEditId,
        productQuantity: newQuantity,
      });
      setPendingUpdates(new Map(pendingUpdates));
    }
    return;
  }

  // set initial cart in state
  useEffect(() => {
    async function getAndSetCart() {
      // get user cart
      const cart = await getCart(user?.id);

      // set states to reflect database
      if (cart) {
        dispatch({
          type: 'SET_CART_AND_TOTALS',
          cart,
          totals: getTotals(cart, productsMap),
        });
      }
    }

    getAndSetCart();
  }, [user, productsMap]);

  // manages batch updates to database
  useEffect(() => {
    if (user && pendingUpdates.size > 0) {
      const timer = setTimeout(async () => {
        try {
          await updateDatabaseCart(
            Array.from(pendingUpdates.values()),
            user.id
          );
          setPendingUpdates(new Map());
        } catch (error) {
          console.error('Database update failed: ', error);
          // handle error accordingly...
        }
      }, 500); // 1 second delay

      // cleanup
      return () => clearTimeout(timer);
    }
  }, [pendingUpdates, user]);

  // update total on cart or product changes
  useEffect(() => {
    dispatch({type: 'SET_TOTALS', totals: getTotals(state.cart, productsMap)});
  }, [state.cart, productsMap]);

  return {
    cart: state.cart,
    totalQuantity: state.totals.quantity,
    totalPrice: state.totals.price,
    editCart,
  } as const;
}
