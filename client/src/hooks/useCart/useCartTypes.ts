// eslint-disable-next-line node/no-extraneous-import
import {CartItem} from '@prisma/client';

export type State = {
  cart: IndividualCartItem[];
  totals: {quantity: number; price: number};
};

export type Action =
  | {type: 'SET_CART'; cart: IndividualCartItem[]}
  | {type: 'SET_TOTALS'; totals: {quantity: number; price: number}}
  | {
      type: 'SET_CART_AND_TOTALS';
      cart: IndividualCartItem[];
      totals: {quantity: number; price: number};
    };

export type IndividualCartItem = Omit<CartItem, 'id' | 'cartId'>;
