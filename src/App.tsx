import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~router';

const App = () => {
  const isAuth = false;
  const router = createBrowserRouter(isAuth ? publicRoutes : privateRoutes);

  return <RouterProvider router={router} />;
};

export default App;
