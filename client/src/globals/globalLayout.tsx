import {Outlet, ScrollRestoration} from 'react-router-dom';
import Nav from '../components/nav/nav';
import CartProvider from './cartContext';
import UserProvider from './userContext';
import FilterProvider from './filterContext';
import ProductsProvider from './productContext';

export default function GlobalLayout() {
  return (
    <>
      <ProductsProvider>
        <UserProvider>
          <CartProvider>
            <FilterProvider>
              <Nav />
              <ScrollRestoration />
              <Outlet />
            </FilterProvider>
          </CartProvider>
        </UserProvider>
      </ProductsProvider>
    </>
  );
}
