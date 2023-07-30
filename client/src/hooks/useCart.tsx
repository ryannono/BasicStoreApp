// eslint-disable-next-line node/no-extraneous-import
import {CartItem, User} from '@prisma/client';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from '../axios';

export default function useCart(user?: User) {
  const [cart, setCart] = useState(getCartFromLocalstorage());

  localStorage.clear();

  async function addToCart(item: IndividualCartItem) {
    if (!user) {
      const currentCart = getCartFromLocalstorage();
      const updatedCart = findAndModifyProductInCart(
        currentCart,
        item,
        'increment'
      );
      saveCartToLocalstorage(updatedCart);
      console.log(updatedCart);
      setCart(updatedCart);
    } else {
      try {
        setCart(
          (
            await axios.post(`/users/${user.id}/cart`, item, {
              headers: {'Content-Type': 'application/JSON'},
              withCredentials: true,
            })
          ).data
        );
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function removeFromCart(item: IndividualCartItem) {
    if (!user) {
      const currentCart = getCartFromLocalstorage();
      const updatedCart = findAndModifyProductInCart(
        currentCart,
        item,
        'decrement'
      );
      saveCartToLocalstorage(updatedCart);
      console.log(updatedCart);
      setCart(updatedCart);
    } else {
      try {
        setCart(
          (
            await axios.post(`/users/${user.id}/cart/${item.productId}`, item, {
              headers: {'Content-Type': 'application/JSON'},
              withCredentials: true,
            })
          ).data
        );
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    // Read from local storage every time the hook runs
    const updatedCart = getCartFromLocalstorage();
    setCart(updatedCart);
  }, []); // Empty dependency array means the effect runs once on mount

  return {cart, addToCart, removeFromCart} as const;
}

export type IndividualCartItem = Omit<CartItem, 'id' | 'cartId'>;

function saveCartToLocalstorage(cart: IndividualCartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartFromLocalstorage(): IndividualCartItem[] {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

export function findAndModifyProductInCart(
  cart: IndividualCartItem[],
  item: IndividualCartItem,
  modification: 'increment' | 'decrement'
): IndividualCartItem[] {
  let foundMatch = false;

  const updatedCart = cart.map(cartItem => {
    const {productId, productQuantity} = cartItem;
    if (productId === item.productId) {
      foundMatch = true;
      return {
        productId,
        productQuantity:
          productQuantity + (modification === 'increment' ? 1 : -1),
      };
    }
    return cartItem;
  });

  if (!foundMatch && modification === 'increment') updatedCart.push(item);

  return updatedCart;
}
