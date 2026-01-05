import { lazy } from 'react';
import Loadable from 'components/Loadable';
import AuthLayout from 'layout/Auth';

const AuthLogin = Loadable(lazy(() => import('pages/auth/auth1/login')));

const LoginRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <AuthLogin />
    },
    {
      path: 'login',
      element: <AuthLogin />
    }
  ]
};

export default LoginRoutes; 
