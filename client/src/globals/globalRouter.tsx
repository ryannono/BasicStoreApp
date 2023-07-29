import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home';
import ProductPage from '../pages/productPage';
import GlobalLayout from './globalLayout';

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {path: '/', element: <Home />},
      {path: 'product/:productId', element: <ProductPage />},
    ],
  },
]);

export default router;
