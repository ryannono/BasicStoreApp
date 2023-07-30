import {Outlet, ScrollRestoration} from 'react-router-dom';
import Nav from '../components/nav';
import CartProvider from './cartContext';

export default function GlobalLayout() {
  return (
    <>
      <CartProvider>
        <Nav />
        <ScrollRestoration />
        <Outlet />
      </CartProvider>
    </>
  );
}
