import { Navigate, RouteObject } from 'react-router-dom';

import { LoginPage, RegistrationPage } from '~pages';

export const privateRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
];

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>home page</div>,
    errorElement: <Navigate to="/" />,
  },
];
