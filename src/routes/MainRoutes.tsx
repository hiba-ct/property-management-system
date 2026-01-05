import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// DASHBOARD

// PMS
const BookingPage = Loadable(lazy(() => import('pages/pms/booking/create')));
const BookingCalendar = Loadable(lazy(() => import('pages/pms/booking/calendar')));

// ERROR
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
   
    /* ================= PMS ================= */
    {
      path: 'pms',
      children: [
        {
          path: 'bookings/create',
          element: <BookingPage />       // ✅ Form + List toggle
        },
        {
          path: 'bookings/calendar',
          element: <BookingCalendar />
        }
      ]
    },

    { path: '*', element: <MaintenanceError /> }
  ]
};

export default MainRoutes;
