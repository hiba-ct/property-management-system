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
  AddSquare,

} from 'iconsax-reactjs';

import { NavItemType } from 'types/menu';

const icons = {
  dashboard: Element3,
  users: User,
  roles: Profile2User,
  permissions: UserTick,
  booking: Calendar,
  rooms: Home2,
  property: Buildings,
  guests: People,
  invoice: ReceiptItem,
  payment: Wallet2,
  housekeeping: Broom,
  reports: Chart,
  chart: Chart,    
  calendar: Calendar,
  settings: Setting2,
  document: DocumentText,
  square:AddSquare
  
};
/*
const propertyManagement: NavItemType = {
  id: 'group-pms',
  title: 'MAIN NAVIGATION',
  type: 'group',
  children: [
    // ---------------- Dashboard ----------------
    {
      id: 'dashboard',
      title: 'Dashboard-Design',
      type: 'item',
      icon: icons.dashboard,
      url: '/dashboard',
      iconColor: '#1976d2'
    },

    // ---------------- User Management ----------------
    {
      id: 'user-management',
      title: 'User Management',
      type: 'collapse',
      icon: icons.users,
      children: [
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          icon: icons.users,
          url: '/users',
          iconColor: '#2E7D32'
        },
        {
          id: 'roles',
          title: 'Roles',
          type: 'item',
          icon: icons.roles,
          url: '/roles',
          iconColor: '#F57F17'
        },
        {
          id: 'permissions',
          title: 'Permissions',
          type: 'item',
          icon: icons.permissions,
          url: '/permissions',
          iconColor: '#D32F2F'
        }
      ]
    },

    // ---------------- Booking Management ----------------
    {
      id: 'booking',
      title: 'Booking Management',
      type: 'collapse',
      icon: icons.booking,
      children: [
        {
          id: 'booking-list',
          title: 'Booking List',
          type: 'item',
          icon: icons.document,
          url: '/bookings'
        },
        {
          id: 'create-booking',
          title: 'Create Booking',
          type: 'item',
          icon: icons.booking,
          url: '/bookings/create'
        },
        {
          id: 'booking-calendar',
          title: 'Booking Calendar',
          type: 'item',
          icon: icons.calendar,
          url: '/bookings/calendar'
        }
      ]
    },

    // ---------------- Room & Inventory ----------------
    {
      id: 'room-inventory',
      title: 'Room & Inventory',
      type: 'collapse',
      icon: icons.property,
      children: [
        {
          id: 'room-types',
          title: 'Room Types',
          type: 'item',
          icon: icons.rooms,
          url: '/room-types'
        },
        {
          id: 'rooms',
          title: 'Rooms',
          type: 'item',
          icon: icons.rooms,
          url: '/rooms'
        },
        {
          id: 'amenities',
          title: 'Amenities',
          type: 'item',
          icon: icons.document,
          url: '/amenities'
        },
        {
          id: 'availability',
          title: 'Availability Overview',
          type: 'item',
          icon: icons.chart,
          url: '/availability'
        }
      ]
    },

    // ---------------- Guest Management ----------------
    {
      id: 'guests',
      title: 'Guest Management',
      type: 'collapse',
      icon: icons.guests,
      children: [
        {
          id: 'guest-list',
          title: 'Guest List',
          type: 'item',
          icon: icons.guests,
          url: '/guests'
        },
        {
          id: 'add-guest',
          title: 'Add Guest',
          type: 'item',
          icon: icons.users,
          url: '/guests/add'
        }
      ]
    },

    // ---------------- Billing ----------------
    {
      id: 'billing',
      title: 'Billing & Payments',
      type: 'collapse',
      icon: icons.invoice,
      children: [
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          icon: icons.invoice,
          url: '/invoices'
        },
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          icon: icons.payment,
          url: '/payments'
        }
      ]
    },

    // ---------------- Housekeeping ----------------
    {
      id: 'housekeeping',
      title: 'Housekeeping',
      type: 'collapse',
      icon: icons.housekeeping,
      children: [
        {
          id: 'tasks',
          title: 'Tasks',
          type: 'item',
          icon: icons.housekeeping,
          url: '/housekeeping/tasks'
        },
        {
          id: 'maintenance',
          title: 'Maintenance',
          type: 'item',
          icon: icons.housekeeping,
          url: '/maintenance'
        }
      ]
    },

    // ---------------- Reports ----------------
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      icon: icons.reports,
      url: '/reports'
    },

    // ---------------- Settings ----------------
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      icon: icons.settings,
      url: '/settings'
    }
  ]
};

export default propertyManagement;
 */


const propertyManagement: NavItemType = {
  id: 'pms',
  title: 'Property Management',
  type: 'group',
  children: [
    {
      id: 'booking',
      title: 'Booking Management',
      type: 'collapse',
      icon: icons.booking,
      children: [
     /*  {
          id: 'booking-list',
          title: 'Booking List',
          type: 'item',
          url: '/pms/bookings/list'
        },  */
        {
          id: 'booking-create',
          title: 'Create Booking',
          type: 'item',
          icon: icons.square,
          url: '/pms/bookings/create'
        },
        {
          id: 'booking-calendar',
          title: 'Booking Calendar',
          type: 'item',
          icon: icons.calendar,
          url: '/pms/bookings/calendar'
        }
      ]
    }
  ]
};

export default propertyManagement;
