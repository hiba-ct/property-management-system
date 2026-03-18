import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';


/* ================= DASHBOARD ================= */

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));
const DashboardFinance = Loadable(lazy(() => import('pages/dashboard/finance')));

/* ================= PMS BOOKINGS ================= */

const BookingPage = Loadable(lazy(() => import('pages/pms/booking/create')));
const BookingCalendar = Loadable(lazy(() => import('pages/pms/booking/calendar')));
const BookingDetails = Loadable(lazy(() => import('pages/pms/booking/details')));

/* ================= PMS ACCOUNTS ================= */

const Ledger = Loadable(lazy(() => import('pages/pms/accounts/masters/ledger')));
const BankAccount = Loadable(lazy(() => import('pages/pms/accounts/masters/bankAccount')));

/* ================= TRANSACTIONS ================= */

const Payment = Loadable(lazy(() => import('pages/pms/accounts/transactions/Payment')));
const PaymentForm = Loadable(lazy(() => import('pages/pms/accounts/transactions/Form')));
const PaymentList = Loadable(lazy(() => import('pages/pms/accounts/transactions/List')));

/* ================= ROOMS ================= */

const RoomTypesPage = Loadable(lazy(() => import('pages/rooms/types')));
const RoomsPage = Loadable(lazy(() => import('pages/rooms/create')));
const RoomsCleaningPage = Loadable(lazy(() => import('pages/rooms/cleaning')));

/* ================= GUESTS ================= */

const GuestPage = Loadable(lazy(() => import('pages/pms/guests/create')));
const GuestDetails = Loadable(lazy(() => import('pages/pms/guests/details')));
const GuestFeedback = Loadable(lazy(() => import('pages/pms/guests/feedback')));

/* ================= BILLING ================= */

const BillingPage = Loadable(lazy(() => import('pages/pms/billing/create')));
const PendingPaymentPage = Loadable(lazy(() => import('pages/pms/billing/pending')));
const InvoicePage = Loadable(lazy(() => import('pages/pms/billing/invoice')));

/* ================= HOUSEKEEPING ================= */

const HousekeepingPage = Loadable(lazy(() => import('pages/pms/housekeeping/create')));

/* ================= AMENITIES ================= */

const AmenitiesPage = Loadable(lazy(() => import('pages/pms/amenities/create')));

/* ================= OVERVIEW ================= */

const OverviewPage = Loadable(lazy(() => import('pages/pms/overview/create')));

/* ================= MAINTENANCE ================= */

const MaintenanceRequestsPage = Loadable(lazy(() => import('pages/pms/maintenance/requests')));
const MaintenanceIssuesPage = Loadable(lazy(() => import('pages/pms/maintenance/issues')));

/* ================= ERROR ================= */

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: 'dashboard',
      children: [
        { path: 'default', element: <DashboardDefault /> },
        { path: 'analytics', element: <DashboardAnalytics /> },
        { path: 'finance', element: <DashboardFinance /> }
      ]
    },

    /* ================= PMS ================= */

    {
      path: 'pms',
      children: [

        /* BOOKINGS */

        { path: 'bookings/create', element: <BookingPage /> },
        { path: 'bookings/calendar', element: <BookingCalendar /> },
        { path: 'bookings/details', element: <BookingDetails /> },

        /* ACCOUNTS MASTERS */

        { path: 'accounts/masters/ledger', element: <Ledger /> },
        { path: 'accounts/masters/bankaccount', element: <BankAccount /> },

        /* ACCOUNTS TRANSACTIONS */

        {
          path: 'accounts/transactions/payment/:type',
          element: <Payment />,
          children: [
            { path: 'create', element: <PaymentForm /> },
            { path: 'edit/:id', element: <PaymentForm /> },
            { path: 'list', element: <PaymentList /> }
          ]
        },

        /* ROOMS */

        { path: 'rooms/types', element: <RoomTypesPage /> },
        { path: 'rooms/create', element: <RoomsPage /> },
        { path: 'rooms/cleaning', element: <RoomsCleaningPage /> },

        /* GUESTS */

        { path: 'guests/create', element: <GuestPage /> },
        { path: 'guests/details/:id', element: <GuestDetails /> },
        { path: 'guests/feedback', element: <GuestFeedback /> },

        /* BILLING */

        { path: 'billing/create', element: <BillingPage /> },
        { path: 'billing/pending', element: <PendingPaymentPage /> },
        { path: 'billing/invoice', element: <InvoicePage /> },

        /* HOUSEKEEPING */

        { path: 'housekeeping/create', element: <HousekeepingPage /> },

        /* AMENITIES */

        { path: 'amenities/create', element: <AmenitiesPage /> },

        /* OVERVIEW */

        { path: 'overview/create', element: <OverviewPage /> },

        /* MAINTENANCE */

        { path: 'maintenance/requests', element: <MaintenanceRequestsPage /> },
        { path: 'maintenance/issues', element: <MaintenanceIssuesPage /> }
      ]
    },

    { path: '*', element: <MaintenanceError /> }
  ]
};

export default MainRoutes;