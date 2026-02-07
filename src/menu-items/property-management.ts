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
  users: User,
  roles: Profile2User,
  permissions: UserTick,

  booking: Calendar,
  calendar: Calendar,
  create: AddSquare,
  document: DocumentText,

  rooms: Home2,
  property: Buildings,
  guests: People,

  invoice: ReceiptItem,
  payment: Wallet2,
  housekeeping: Broom,

  reports: Chart,
  settings: Setting2,

  guestDetails: Profile2User,

  pending: PendingActionsIcon // ✅ MUI icon
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
          iconColor: '#2E7D32',
          url: '/pms/bookings/create'
        },
        {
          id: 'booking-calendar',
          title: 'Booking Calendar',
          type: 'item',
          icon: icons.calendar,
          iconColor: '#1565C0',
          url: '/pms/bookings/calendar'
        },
        {
          id: 'booking-details',
          title: 'Booking Details',
          type: 'item',
          icon: icons.document,
          iconColor: '#8D3C4A',
          url: '/pms/bookings/details'
        }
      ]
    },

    /* ================= ROOM & INVENTORY ================= */
    {
      id: 'room-inventory',
      title: 'Room & Inventory ',
      type: 'collapse',
      icon: icons.rooms,
      children: [
         {
          id: 'rooms-list',
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
          iconColor: '#F57C00',
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
          icon: icons.document,
          iconColor: '#1565C0',
          url: '/pms/guests/feedback'
        }
      ]
    },

    /* ================= BILLING & PAYMENT ================= */
    {
      id: 'payment',
      title: 'Billing & Payment ',
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
          icon: icons.pending, // ✅ MUI icon
          iconColor: '#F57C00', // 🟠 Pending
          url: '/pms/billing/pending'
        },
         {
          id: 'invoice',
          title: 'Invoice',
          type: 'item',
          icon: icons.invoice, // ✅ MUI icon
          iconColor: '#1565C0', 
          url: '/pms/billing/invoice'
        }
      ]
    }
  ]
};

export default propertyManagement;
