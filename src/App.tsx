import { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoadingPage } from '~pages';
import { getCookie } from '~utils/helpers';

import { publicRoutes, privateRoutes } from '~router';
import { deleteCookie } from './utils/helpers/cookies/deleteCookie';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = createBrowserRouter(isAuth ? publicRoutes : privateRoutes);

  useEffect(() => {
    const authToken = getCookie('doggee-auth-token');
    const isNotMyDevice = getCookie('doggee-not-my-device');

    const deviceExpire = isNotMyDevice && Date.now() > new Date(+isNotMyDevice).getTime();

    if (authToken && deviceExpire) {
      deleteCookie('doggee-auth-token');
      deleteCookie('doggee-not-my-device');
    }

    if (authToken && !deviceExpire) {
      setIsAuth(true);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingPage />;

  return <RouterProvider router={router} />;
};

export default App;
