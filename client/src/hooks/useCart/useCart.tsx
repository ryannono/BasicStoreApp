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
