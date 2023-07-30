// eslint-disable-next-line node/no-extraneous-import
import {CartItem} from '@prisma/client';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from '../axios';
import {ClientUser} from './useUser';

export default function useCart(user: ClientUser | null) {
  const [cart, setCart] = useState<IndividualCartItem[]>([]);

  localStorage.clear();

  async function editCart(
    item: IndividualCartItem,
    operation: 'increment' | 'decrement'
  ) {
    if (!user) {
      const currentCart = getCartFromLocalstorage();
      const updatedCart = findAndModifyProductInCart(
        currentCart,
        item,
        operation
      );
      saveCartToLocalstorage(updatedCart);
      console.log(updatedCart);
      setCart(updatedCart);
    } else {
      try {
        const updatedCart = await findAndModifyProductInDatabase(
          user.id,
          item,
          operation
        );
        console.log(updatedCart);
        setCart(updatedCart);
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    async function setUserCart() {
      setCart(await getCartFromDatabase());
    }

    // Read from local storage every time the hook runs
    if (user) setUserCart();
    else setCart(getCartFromLocalstorage());
  }, [user]);

  return {cart, editCart} as const;
}

export type IndividualCartItem = Omit<CartItem, 'id' | 'cartId'>;

function saveCartToLocalstorage(cart: IndividualCartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

async function getCartFromDatabase() {
  return (
    await axios.get('/users/cart', {
      headers: {'Content-Type': 'application/JSON'},
      withCredentials: true,
    })
  ).data;
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

export async function findAndModifyProductInDatabase(
  userId: string,
  item: IndividualCartItem,
  modification: 'increment' | 'decrement'
) {
  const {productId, productQuantity} = item;
  const updatedItem = {
    productId,
    productQuantity: productQuantity + (modification === 'increment' ? 1 : -1),
  };
  if (updatedItem.productQuantity > 0) {
    return (
      await axios.put(
        `/users/${userId}/cart`,
        {updatedItem},
        {
          headers: {'Content-Type': 'application/JSON'},
          withCredentials: true,
        }
      )
    ).data;
  } else {
    return (
      await axios.delete(`/users/${userId}/cart/${updatedItem.productId}`, {
        headers: {'Content-Type': 'application/JSON'},
        withCredentials: true,
      })
    ).data;
  }
}
