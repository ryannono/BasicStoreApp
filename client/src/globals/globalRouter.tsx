import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home';
import ProductPage from '../pages/productPage';
import GlobalLayout from './globalLayout';
import Auth from '../pages/auth';
import StripePaymentGateway from '../pages/checkout';

/**
 * This configuration object is used to construct the application's Router component.
 *
 * The `element` property specifies the layout for the Router's root.
 * The `children` property contains an array of route objects, each specifying the path and the element to render for that path.
 * Nested routes are also supported, where a route can contain its own `children` property.
 *
 * Routes:
 *
 * `/` - Home route
 * `/product/:productId` - Product page route, with a productId parameter
 * `/auth/signin` and `/auth/register` - Auth routes, for signing in and registering respectively
 * `/checkout` and `/checkout/complete` - Checkout routes, for handling payments
 */
const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {path: '/', element: <Home />},
      {path: 'product/:productId', element: <ProductPage />},
      {
        path: 'auth',
        element: <Auth />,
        children: [{path: 'signin'}, {path: 'register'}],
      },
      {
        path: 'checkout',
        element: <StripePaymentGateway />,
        children: [{path: 'complete'}],
      },
    ],
  },
]);

export default router;
