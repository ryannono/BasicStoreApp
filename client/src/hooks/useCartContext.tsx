import {useContext} from 'react';
import {CartContext} from '../globals/cartContext';

export default function useCartContext() {
  return useContext(CartContext);
}
