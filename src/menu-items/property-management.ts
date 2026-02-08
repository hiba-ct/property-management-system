import {
  Element3,
  User,
  Profile2User,
  UserTick,
  Calendar,
  Home2,
  Buildings,
  People,
  ReceiptItem,
  Wallet2,
  Broom,
  Chart,
  Setting2,
  DocumentText,
  AddSquare
} from 'iconsax-reactjs';

import PendingActionsIcon from '@mui/icons-material/PendingActions';

import { NavItemType } from 'types/menu';

/* ================= ICON MAP ================= */

const icons = {
  dashboard: Element3,

  booking: Calendar,
  calendar: Calendar,
  create: AddSquare,
  details: DocumentText,

  rooms: Home2,
  property: Buildings,

  guests: People,
  profile: Profile2User,

  invoice: ReceiptItem,
  payment: Wallet2,
  pending: PendingActionsIcon,

  housekeeping: Broom,
  maintenance: DocumentText,

  reports: Chart,
  settings: Setting2
};

/* ================= PROPERTY MANAGEMENT ================= */

const propertyManagement: NavItemType = {
  id: 'pms',
  title: 'Property Management',
  type: 'group',
  children: [
    /* ================= BOOKING ================= */
    {
      id: 'booking',
      title: 'Booking Management',
      type: 'collapse',
      icon: icons.booking,
      children: [
        {
          id: 'booking-create',
          title: 'Create Booking',
          type: 'item',
          icon: icons.create,
          iconColor: '#2E7D32', // green
          url: '/pms/bookings/create'
        },
        {
          id: 'booking-calendar',
          title: 'Booking Calendar',
          type: 'item',
          icon: icons.calendar,
          iconColor: '#1565C0', // blue
          url: '/pms/bookings/calendar'
        },
        {
          id: 'booking-details',
          title: 'Booking Details',
          type: 'item',
          icon: icons.details,
          iconColor: '#8D3C4A', // maroon
          url: '/pms/bookings/details'
        }
      ]
    },

    /* ================= ROOM & INVENTORY ================= */
    {
      id: 'room-inventory',
      title: 'Room & Inventory',
      type: 'collapse',
      icon: icons.rooms,
      children: [
        {
          id: 'rooms-create',
          title: 'Create Rooms',
          type: 'item',
          icon: icons.create,
          iconColor: '#2E7D32',
          url: '/pms/rooms/create'
        },
        {
          id: 'room-types',
          title: 'Room Types',
          type: 'item',
          icon: icons.property,
          iconColor: '#8D3C4A',
          url: '/pms/rooms/types'
        },
        {
          id: 'rooms-cleaning',
          title: 'Cleaning Status',
          type: 'item',
          icon: icons.housekeeping,
          iconColor: '#F57C00', // orange
          url: '/pms/rooms/cleaning'
        }
      ]
    },

    /* ================= GUEST MANAGEMENT ================= */
    {
      id: 'guest-management',
      title: 'Guest Management',
      type: 'collapse',
      icon: icons.guests,
      children: [
        {
          id: 'guest-create',
          title: 'Create Guest',
          type: 'item',
          icon: icons.create,
          iconColor: '#2E7D32',
          url: '/pms/guests/create'
        },
        {
          id: 'guest-feedback',
          title: 'Guest Feedback',
          type: 'item',
          icon: icons.details,
          iconColor: '#1565C0', // blue
          url: '/pms/guests/feedback'
        }
      ]
    },

    /* ================= BILLING & PAYMENTS ================= */
    {
      id: 'billing',
      title: 'Billing & Payments',
      type: 'collapse',
      icon: icons.payment,
      children: [
        {
          id: 'payment-create',
          title: 'Add Payment',
          type: 'item',
          icon: icons.create,
          iconColor: '#2E7D32',
          url: '/pms/billing/create'
        },
        {
          id: 'pending-payments',
          title: 'Pending Payments',
          type: 'item',
          icon: icons.pending,
          iconColor: '#F57C00', // orange
          url: '/pms/billing/pending'
        },
        {
          id: 'invoice',
          title: 'Invoice',
          type: 'item',
          icon: icons.invoice,
          iconColor: '#1565C0', // blue
          url: '/pms/billing/invoice'
        }
      ]
    },

    /* ================= HOUSEKEEPING ================= */
    {
      id: 'housekeeping',
      title: 'Housekeeping',
      type: 'collapse',
      icon: icons.housekeeping,
      children: [
        {
          id: 'housekeeping-create',
          title: 'Create Task',
          type: 'item',
          icon: icons.create,
          iconColor: '#2E7D32',
          url: '/pms/housekeeping/create'
        }
      ]
    },

    /* ================= AMENITIES ================= */
    {
      id: 'amenities',
      title: 'Amenities Management',
      type: 'collapse',
      icon: icons.property,
      children: [
        {
          id: 'amenities-create',
          title: 'Create Amenity',
          type: 'item',
          icon: icons.create,
          iconColor: '#2E7D32',
          url: '/pms/amenities/create'
        }
      ]
    },

    /* ================= AVAILABILITY ================= */
    {
      id: 'availability',
      title: 'Availability Overview',
      type: 'collapse',
      icon: icons.calendar,
      children: [
        {
          id: 'availability-overview',
          title: 'Overview',
          type: 'item',
          icon: icons.details,
          iconColor: '#1565C0',
          url: '/pms/overview/create'
        }
      ]
    },

    /* ================= MAINTENANCE ================= */
    {
      id: 'maintenance',
      title: 'Maintenance overview',
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'maintenance-requests',
          title: 'Requests',
          type: 'item',
          icon: icons.details,
          iconColor: '#F57C00',
          url: '/pms/maintenance/requests'
        },
        {
          id: 'maintenance-issues',
          title: 'Issues',
          type: 'item',
          icon: icons.details,
          iconColor: '#D32F2F', // red (issues)
          url: '/pms/maintenance/issues'
        }
      ]
    }
  ]
};

export default propertyManagement;
