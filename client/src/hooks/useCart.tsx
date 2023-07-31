// eslint-disable-next-line node/no-extraneous-import
import {CartItem} from '@prisma/client';
import {useState, useEffect, useReducer, useMemo} from 'react';
import axios from '../axios';

import {ClientUser} from './useUser';
import {useProductsContext} from '../globals/productContext';
import {IndividualProduct} from './useProducts';

type State = {
  cart: IndividualCartItem[];
  totals: {quantity: number; price: number};
};

type Action =
  | {type: 'SET_CART'; cart: IndividualCartItem[]}
  | {type: 'SET_TOTALS'; totals: {quantity: number; price: number}};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CART':
      return {...state, cart: action.cart};
    case 'SET_TOTALS':
      return {...state, totals: action.totals};
    default:
      return state;
  }
}

export default function useCart(user: ClientUser | null) {
  const {productsMap} = useProductsContext()!;
  // const [cart, setCart] = useState<IndividualCartItem[]>([]);
  // const [totals, setTotals] = useState<{quantity: number; price: number}>({
  //   quantity: 0,
  //   price: 0,
  // });
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    totals: {quantity: 0, price: 0},
  });

  async function editCart(
    itemToEditId: string,
    newQuantity: number,
    operation?: 'increment' | 'decrement'
  ) {
    if (!user) {
      const currentCart = await getCart('localStorage');
      const updatedCart = findAndModifyProductInCart(
        currentCart,
        itemToEditId,
        newQuantity,
        operation
      );
      saveCartToLocalstorage(updatedCart);
      dispatch({type: 'SET_CART', cart: updatedCart});
      return;
    }

    try {
      const updatedCart = await findAndModifyProductInDatabase(
        user.id,
        itemToEditId,
        newQuantity,
        operation
      );
      dispatch({type: 'SET_CART', cart: updatedCart});
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const totals = {
      quantity: getTotalQuantity(state.cart),
      price: getTotalPrice(state.cart, productsMap),
    };
    dispatch({type: 'SET_TOTALS', totals});
  }, [state.cart, productsMap]);

  useEffect(() => {
    async function getAndSetCart() {
      const cart = await getCart(user ? 'database' : 'localStorage');
      dispatch({type: 'SET_CART', cart});
      dispatch({
        type: 'SET_TOTALS',
        totals: {
          quantity: getTotalQuantity(cart),
          price: getTotalPrice(cart, productsMap),
        },
      });
    }
    getAndSetCart();
  }, [user, productsMap]);

  return {
    cart: state.cart,
    totalQuantity: state.totals.quantity,
    totalPrice: state.totals.price,
    editCart,
  } as const;
}

export type IndividualCartItem = Omit<CartItem, 'id' | 'cartId'>;

function getTotalPrice(
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

function getTotalQuantity(cart: IndividualCartItem[]) {
  return cart.reduce((runningTotal, cartItem) => {
    return runningTotal + cartItem.productQuantity;
  }, 0);
}

function saveCartToLocalstorage(cart: IndividualCartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

async function getCart(
  cartOrigin: 'localStorage' | 'database'
): Promise<IndividualCartItem[]> {
  if (cartOrigin === 'database') {
    return (
      await axios.get('/users/cart', {
        headers: {'Content-Type': 'application/JSON'},
        withCredentials: true,
      })
    ).data;
  } else {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
}

export function findAndModifyProductInCart(
  cart: IndividualCartItem[],
  itemToEditId: string,
  newQuantity: number,
  operation?: 'increment' | 'decrement'
): IndividualCartItem[] {
  let foundMatch = false;
  if (newQuantity === 0) {
    return cart.filter(cartItem => cartItem.productId !== itemToEditId);
  }

  const updatedCart = cart.map(cartItem => {
    const {productId, productQuantity} = cartItem;
    if (productId === itemToEditId) {
      foundMatch = true;
      return {
        productId,
        productQuantity:
          productQuantity +
          (!operation
            ? newQuantity - productQuantity
            : operation === 'increment'
            ? 1
            : -1),
      };
    }
    return cartItem;
  });

  if (!foundMatch && operation !== 'decrement') {
    updatedCart.push({productId: itemToEditId, productQuantity: newQuantity});
  }

  return updatedCart;
}

export async function findAndModifyProductInDatabase(
  userId: string,
  itemToEditId: string,
  newQuantity: number,
  operation?: 'increment' | 'decrement'
) {
  if (newQuantity === 0) {
    return await axios.delete(`/users/${userId}/cart/${itemToEditId}`, {
      headers: {'Content-Type': 'application/JSON'},
      withCredentials: true,
    });
  }

  let updatedItem;
  if (!operation) {
    updatedItem = {
      productId: itemToEditId,
      productQuantity: newQuantity,
    };
    return (
      await axios.put(`/users/${userId}/cart`, updatedItem, {
        headers: {'Content-Type': 'application/JSON'},
        withCredentials: true,
      })
    ).data;
  }

  const cart = await getCart('database');

  const currentQuantity = cart.find(
    product => product.productId === itemToEditId
  )?.productQuantity;

  const operatedQuantity =
    (Number(currentQuantity) ?? 0) + (operation === 'increment' ? 1 : -1);

  updatedItem = {productId: itemToEditId, productQuantity: operatedQuantity};

  return (
    await axios.put(`/users/${userId}/cart`, updatedItem, {
      headers: {'Content-Type': 'application/JSON'},
      withCredentials: true,
    })
  ).data;
}
