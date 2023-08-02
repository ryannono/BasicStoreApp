// eslint-disable-next-line node/no-extraneous-import
import {CartItem} from '@prisma/client';

/**
 * Represents the state of the shopping cart, which consists of
 * an array of cart items and totals (quantity and price).
 */
export type State = {
  cart: IndividualCartItem[];
  totals: {quantity: number; price: number};
};

/**
 * Defines the possible actions that can be dispatched to modify the cart's state.
 * This can be either setting the cart, setting the totals, or setting both the cart and totals at once.
 */
export type Action =
  | {type: 'SET_CART'; cart: IndividualCartItem[]}
  | {type: 'SET_TOTALS'; totals: {quantity: number; price: number}}
  | {
      type: 'SET_CART_AND_TOTALS';
      cart: IndividualCartItem[];
      totals: {quantity: number; price: number};
    };

/**
 * Represents an item in the shopping cart.
 * It's derived from the CartItem type from the Prisma client,
 * but omits the 'id' and 'cartId' properties.
 */
export type IndividualCartItem = Omit<CartItem, 'id' | 'cartId'>;
