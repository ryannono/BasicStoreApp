import {RouterProvider} from 'react-router-dom';
import globalRouter from './globals/globalRouter';

function App() {
  return <RouterProvider router={globalRouter} />;
}

export default App;
