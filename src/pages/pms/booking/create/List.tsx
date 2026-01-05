import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';

/* ================= TYPES ================= */

interface Booking {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
}

/* ================= DATA ================= */

const bookingData: Booking[] = [
  {
    id: 'BK001',
    guest: 'John Doe',
    room: 'Deluxe',
    checkIn: '2025-01-01',
    checkOut: '2025-01-03'
  }
];

/* ================= COLUMNS ================= */

const columns: ColumnDef<Booking>[] = [
  {
    header: 'Booking ID',
    accessorKey: 'id'
  },
  {
    header: 'Guest',
    accessorKey: 'guest'
  },
  {
    header: 'Room',
    accessorKey: 'room'
  },
  {
    header: 'Check In',
    accessorKey: 'checkIn'
  },
  {
    header: 'Check Out',
    accessorKey: 'checkOut'
  }
];

/* ================= COMPONENT ================= */

export default function BookingList() {
  return (
    <GenericTable<Booking>
      data={bookingData}
      columns={columns}
      filename="booking-list.csv"
    />
  );
}
