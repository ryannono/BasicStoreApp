import {Outlet, ScrollRestoration} from 'react-router-dom';
import Nav from '../components/nav/nav';
import CartProvider from './cartContext';
import UserProvider from './userContext';
import FilterProvider from './filterContext';
import ProductsProvider from './productContext';

/**
 * GlobalLayout is a top-level component that wraps all the other parts of the application. It is
 * responsible for providing the necessary contexts (Products, User, Cart, and Filter) to the rest
 * of the application and rendering the main layout.
 *
 * Inside the GlobalLayout, there is a <Nav /> component which represents the navigation bar,
 * a <ScrollRestoration /> component for managing scroll positions when navigating between pages,
 * and an <Outlet /> component where the child routes will get rendered.
 *
 * @returns {JSX.Element} A component that includes the main layout and provides the necessary contexts.
 */
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
