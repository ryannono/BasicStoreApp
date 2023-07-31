import axios from 'axios';
import {IndividualProduct} from '../useProducts';
import {Action, IndividualCartItem, State} from './useCartTypes';

// ---------------- Calculations ------------------ //

/**
 * Calculates the total price of the items in the cart.
 *
 * @param cart - An array of items in the cart.
 * @param productsMap - A map of products.
 *
 * @returns The total price of the items in the cart, rounded to two decimal places.
 */
export function getTotalPrice(
  cart: IndividualCartItem[],
  productsMap: Map<string, IndividualProduct>
) {
  return (
    Math.round(
      cart.reduce((runningTotal, cartItem) => {
        const productMatch = productsMap.get(cartItem.productId);
        const cost = (productMatch?.price ?? 0) * cartItem.productQuantity;
        return runningTotal + cost;
      }, 0) * 100
    ) / 100
  );
}

/**
 * Calculates the total quantity of items in the cart.
 *
 * @param cart - An array of items in the cart.
 *
 * @returns The total quantity of items in the cart.
 */
export function getTotalQuantity(cart: IndividualCartItem[]) {
  return cart.reduce((runningTotal, cartItem) => {
    return runningTotal + cartItem.productQuantity;
  }, 0);
}

// ---------------- Local Storage ---------------- //

/**
 * Stores the current state of the cart in the local storage.
 *
 * @param cart - An array of items in the cart.
 */
export function saveLocalCart(cart: IndividualCartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Updates the quantity of an item in the cart stored in the local storage.
 *
 * @param cart - An array of items in the cart.
 * @param itemToEditId - The ID of the item to be updated.
 * @param newQuantity - The new quantity of the item.
 *
 * @returns An updated array of items in the cart.
 */
export function updateLocalCart(
  cart: IndividualCartItem[],
  itemToEditId: string,
  newQuantity: number
): IndividualCartItem[] {
  if (newQuantity === 0) {
    return cart.filter(cartItem => cartItem.productId !== itemToEditId);
  }

  const filteredCart = cart.filter(
    cartItem => cartItem.productId !== itemToEditId
  );
  filteredCart.push({productId: itemToEditId, productQuantity: newQuantity});

  return filteredCart;
}

// ----------------- Cart fetch ------------------- //

/**
 * Fetches the cart of a user. If the user is not signed in, it retrieves the cart from the local storage.
 *
 * @param userId - The ID of the user.
 *
 * @returns A Promise that resolves to an array of items in the cart, or null if there's an error.
 */
export async function getCart(
  userId?: string
): Promise<IndividualCartItem[] | null> {
  if (userId) {
    try {
      return (
        await axios.get(`/users/${userId}/cart`, {
          withCredentials: true,
        })
      ).data.items;
    } catch (err) {
      console.error(err);
      return null;
    }
  } else {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
}

// -----------------`States` ---------------- //

/**
 * The reducer function for the useReducer hook in the Cart component.
 *
 * @param state - The current state of the component.
 * @param action - The action to perform on the state.
 * @returns The new state after the action is performed.
 */
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CART':
      return {...state, cart: action.cart};
    case 'SET_TOTALS':
      return {...state, totals: action.totals};
    default:
      return state;
  }
}
