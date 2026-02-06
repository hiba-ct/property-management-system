import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';







// DASHBOARD
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));
const DashboardFinance = Loadable(lazy(() => import('pages/dashboard/finance')));
// PMS/bookig
const BookingPage = Loadable(lazy(() => import('pages/pms/booking/create')));
const BookingCalendar = Loadable(lazy(() => import('pages/pms/booking/calendar')));
const BookingDetails = Loadable(lazy(() => import('pages/pms/booking/details')));

//PMS/rooms
const RoomTypesPage = Loadable(lazy(() => import('pages/rooms/types')));
const RoomsPage = Loadable(lazy(() => import('pages/rooms/create')));
const RoomsCleaningPage = Loadable(lazy(() => import('pages/rooms/cleaning')));
// ERROR
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />
            },
            {
              path: 'analytics',
              element: <DashboardAnalytics />
            },
            {
              path: 'finance',
              element: <DashboardFinance />
            }
          ]
        },
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
        },
        {
          path: 'bookings/details',
          element: <BookingDetails />
        },
/*================================== ROOMS & INVENTORY MANAGEMENT ==============================*/
         {
          path: 'rooms/types',
          element: <RoomTypesPage/>
        },

         {
          path: 'rooms/create',
          element: <RoomsPage/>
        },

         {
          path: 'rooms/cleaning',
          element: <RoomsCleaningPage />
        }



      ]


    },

    { path: '*', element: <MaintenanceError /> }
  ]
};

export default MainRoutes;
