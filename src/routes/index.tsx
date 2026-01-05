import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ComponentsRoutes from './ComponentsRoutes';

import Loadable from 'components/Loadable';
import SimpleLayout from 'layout/Simple';
import { SimpleLayoutType } from 'config';

const Landing = Loadable(lazy(() => import('pages/landing')));

const router = createBrowserRouter(
  [
   
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME
  }
);

export default router;
