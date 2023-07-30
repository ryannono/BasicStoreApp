import {Outlet, ScrollRestoration} from 'react-router-dom';
import Nav from '../components/nav';
import CartProvider from './cartContext';
import UserProvider from './userContext';
import FilterProvider from './filterContext';

export default function GlobalLayout() {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <FilterProvider>
            <Nav />
            <ScrollRestoration />
            <Outlet />
          </FilterProvider>
        </CartProvider>
      </UserProvider>
    </>
  );
}
