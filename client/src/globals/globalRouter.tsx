import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home';
import ProductPage from '../pages/productPage';
import GlobalLayout from './globalLayout';
import Auth from '../pages/auth';

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {path: '/', element: <Home />},
      {path: 'product/:productId', element: <ProductPage />},
      {path: 'auth/:signinOrRegister', element: <Auth />},
    ],
  },
]);

export default router;
