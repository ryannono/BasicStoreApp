import {RouterProvider} from 'react-router-dom';
import globalRouter from './globals/globalRouter';

/**
 * `App` is the root component of the React application.
 * It wraps the entire application in a RouterProvider component, passing in a global router.
 */
function App() {
  return <RouterProvider router={globalRouter} />;
}

export default App;
