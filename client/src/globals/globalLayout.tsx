import {Outlet, ScrollRestoration} from 'react-router-dom';
import Nav from '../components/nav';
import CartProvider from './cartContext';
import UserProvider from './userContext';

export default function GlobalLayout() {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <Nav />
          <ScrollRestoration />
          <Outlet />
        </CartProvider>
      </UserProvider>
    </>
  );
}
