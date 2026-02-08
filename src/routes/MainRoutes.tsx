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


//PMS/guests
const GuestPage = Loadable(lazy(() => import('pages/pms/guests/create')));
const GuestDetails = Loadable(lazy(() => import('pages/pms/guests/details')));
const GuestFeedback = Loadable(lazy(() => import('pages/pms/guests/feedback')));

//PMS/billing
const BillingPage = Loadable(lazy(() => import('pages/pms/billing/create')));
const PendingPaymentPage = Loadable(lazy(() => import('pages/pms/billing/pending')));
const InvoicePage = Loadable(lazy(() => import('pages/pms/billing/invoice')));

//PMS/housekeeping
const HousekeepingPage = Loadable(lazy(() => import('pages/pms/housekeeping/create')));

//PMS/amenities
const AmenitiesPage = Loadable(lazy(() => import('pages/pms/amenities/create')));

//PMS/overview
const OverviewPage = Loadable(lazy(() => import('pages/pms/overview/create')));

//PMS/amenities

//PMS/maiteanance requests
const MaintenanceRequestsPage = Loadable(lazy(() => import('pages/pms/maintenance/requests')));
const MaintenanceIssuesPage = Loadable(lazy(() => import('pages/pms/maintenance/issues')));
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
        },

        /*================================== Guest MANAGEMENT ==============================*/

 {
          path: 'guests/create',
          element: <GuestPage />
        },

        {
         
        path: '/pms/guests/details/:id',
        element: <GuestDetails />
},
 {
         
        path: '/pms/guests/feedback',
        element: <GuestFeedback />
},
 /*==================================  Billing MANAGEMENT ==============================*/

        {
         
        path: '/pms/billing/create',
        element: <BillingPage />
},
 {
         
        path: '/pms/billing/pending',
        element: <PendingPaymentPage />
},
{
         
        path: '/pms/billing/invoice',
        element: <InvoicePage />
},
/*==================================HOUSEKEEPING ==============================*/
        {
          path: '/pms/housekeeping/create',
          element: <HousekeepingPage />
        },
 /*==================================AMENITIES ==============================*/
        {
          path: '/pms/amenities/create',
          element: <AmenitiesPage />
        },
        /*==================================OVERVIEW ==============================*/
         {
          path: '/pms/overview/create',
          element: <OverviewPage />
        },
         /*==================================MAINTENANCE REQUESTS ==============================*/
         {
          path: '/pms/maintenance/requests',
          element: <MaintenanceRequestsPage />
        },
         {
          path: '/pms/maintenance/issues',
          element: <MaintenanceIssuesPage />
        },
      ]


    },

    { path: '*', element: <MaintenanceError /> }
  ]
};

export default MainRoutes;
