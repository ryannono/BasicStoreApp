import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home';
import ProductPage from '../pages/productPage';
import GlobalLayout from './globalLayout';
import Auth from '../pages/auth';
import StripePaymentGateway from '../pages/checkout';

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
