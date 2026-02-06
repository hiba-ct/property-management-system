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
  settings: Setting2
};

/* ================= PROPERTY MANAGEMENT ================= */

const propertyManagement: NavItemType = {
  id: 'pms',
  title: 'Property Management',
  type: 'group',
  children: [
    /* ================= BOOKING MANAGEMENT ================= */
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
    iconColor: '#2E7D32',   // ✅ Green (Create / Add)
    url: '/pms/bookings/create'
  },
  {
    id: 'booking-calendar',
    title: 'Booking Calendar',
    type: 'item',
    icon: icons.calendar,
    iconColor: '#1565C0',   // 📅 Blue (Calendar / Schedule)
    url: '/pms/bookings/calendar'
  },
  {
    id: 'booking-details',
    title: 'Booking Details',
    type: 'item',
    icon: icons.document,
    iconColor: '#8D3C4A',   // 📄 Maroon (Details / Record)
    url: '/pms/bookings/details'
  }
]

    },

    /* ================= ROOM & INVENTORY ================= */
    {
      id: 'room-inventory',
      title: 'Room & Inventory Management',
      type: 'collapse',
      icon: icons.rooms,
      children: [
        {
          id: 'room-types',
          title: 'Room Types',
          type: 'item',
          icon: icons.property,
          iconColor: '#8D3C4A', // maroon

          url: '/pms/rooms/types'
        },
        {
          id: 'rooms-list',
          title: 'Create Rooms',
          type: 'item',
          icon: icons.create,
          iconColor: '#2E7D32', // green
          url: '/pms/rooms/create'
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
    }
  ]
};

export default propertyManagement;
