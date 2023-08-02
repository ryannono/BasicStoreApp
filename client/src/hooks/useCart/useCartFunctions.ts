import axios from '../../axios';
import {IndividualProduct} from '../useProducts';
import {Action, IndividualCartItem, State} from './useCartTypes';

// ---------------- Calculations ------------------ //

/**
 * Calculates and returns the total quantity and price of items in a cart.
 *
 * @param cart - An array of cart items.
 * @param productsMap - A map where the key is product ID and the value is the product object.
 *
 * @returns {Object} An object containing the total quantity and price of items in the cart.
 */
export function getTotals(
  cart: IndividualCartItem[],
  productsMap: Map<string, IndividualProduct>
) {
  let totalPrice = 0,
    totalQuantity = 0;
  for (const cartItem of cart) {
    totalQuantity += cartItem.productQuantity;
    const productMatch = productsMap.get(cartItem.productId);
    const cost = (productMatch?.price ?? 0) * cartItem.productQuantity;
    totalPrice += cost;
  }

  totalPrice = Math.round(totalPrice * 100) / 100;
  return {price: totalPrice, quantity: totalQuantity};
}

// ---------------- Local Storage ---------------- //

/**
 * Saves the current cart items into local storage.
 *
 * @param cart - An array of cart items.
 */
export function saveLocalCart(cart: IndividualCartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Updates the quantity of an item in a locally stored cart.
 *
 * @param cart - An array of cart items.
 * @param itemToEditId - The ID of the item to be updated.
 * @param newQuantity - The new quantity of the item.
 *
 * @returns An array of updated cart items.
 */
export function updateLocalCart(
  cart: IndividualCartItem[],
  itemToEditId: string,
  newQuantity: number
): IndividualCartItem[] {
  if (!cart.length && newQuantity === 0) return cart;
  // If the new quantity is 0, filter out the item and return the cart
  if (newQuantity === 0) {
    return cart.filter(cartItem => cartItem.productId !== itemToEditId);
  }

  // Check if the item exists in the cart
  const existingItemIndex = cart.findIndex(
    cartItem => cartItem.productId === itemToEditId
  );

  // If the item exists, update the quantity. Otherwise, add the item to the cart.
  if (existingItemIndex !== -1) {
    // Create a new copy of the cart for immutability
    return cart.with(existingItemIndex, {
      productId: itemToEditId,
      productQuantity: newQuantity,
    });
  } else {
    return [...cart, {productId: itemToEditId, productQuantity: newQuantity}];
  }
}

// ------------------ Database -------------------- //

/**
 * Updates the user's cart in the database with the given items.
 *
 * @param updateArray - An array of items to be updated in the cart.
 * @param userId - The ID of the user.
 */
export async function updateDatabaseCart(
  updateArray: IndividualCartItem[],
  userId: string
) {
  try {
    // send all pending updates as single request
    await axios.put(`/users/${userId}/cart`, updateArray);
  } catch (err) {
    console.error(err);
  }
}

// ----------------- Cart fetch ------------------- //

/**
 * Retrieves the user's cart from the database or from local storage if no user ID is provided.
 *
 * @param userId - The ID of the user. Optional parameter.
 *
 * @returns A Promise that resolves to an array of cart items or null in case of an error.
 */
export async function getCart(
  userId?: string
): Promise<IndividualCartItem[] | null> {
  if (userId) {
    try {
      const cart = (await axios.get(`/users/${userId}/cart`)).data.items;
      saveLocalCart(cart);
      return cart;
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
 * A reducer function to manage the cart and its totals state.
 *
 * @param state - The current state of the cart.
 * @param action - The dispatched action.
 *
 * @returns The new state of the cart after applying the action.
 */
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CART':
      return {...state, cart: action.cart};
    case 'SET_TOTALS':
      return {...state, totals: action.totals};
    case 'SET_CART_AND_TOTALS':
      return {...state, cart: action.cart, totals: action.totals};
    default:
      return state;
  }
}
