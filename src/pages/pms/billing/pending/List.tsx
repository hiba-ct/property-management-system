import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import { useState } from 'react';

interface PendingPayment {
  bookingId: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  total: number;
  paid: number;
  balance: number;
}

const data: PendingPayment[] = [
  {
    bookingId: 'BK2025-145',
    guest: 'John Doe',
    room: '204',
    checkIn: '12-Aug-25',
    checkOut: '15-Aug-25',
    total: 15000,
    paid: 10000,
    balance: 5000
  },
  {
    bookingId: 'BK2025-162',
    guest: 'Priya Sharma',
    room: '310',
    checkIn: '14-Aug-25',
    checkOut: '16-Aug-25',
    total: 8500,
    paid: 0,
    balance: 8500
  }
];

const columns: ColumnDef<PendingPayment>[] = [
  { header: 'Booking ID', accessorKey: 'bookingId' },
  { header: 'Guest', accessorKey: 'guest' },
  { header: 'Room', accessorKey: 'room' },
  { header: 'Check-in', accessorKey: 'checkIn' },
  { header: 'Check-out', accessorKey: 'checkOut' },
  { header: 'Total (₹)', accessorKey: 'total' },
  { header: 'Paid (₹)', accessorKey: 'paid' },
  { header: 'Balance (₹)', accessorKey: 'balance' }
];

export default function PendingPaymentList() {
  const [rows,setRows] = useState<PendingPayment[]>(data)
  
  const handleEdit = (row:PendingPayment)=>{
   console.log("edit",row)
  }
  
  const handleDelete = (row:PendingPayment)=>{
   setRows(prev=>prev.filter(r=>r.bookingId!==row.bookingId))
  }
  return (
    <GenericTable<PendingPayment>
      data={data}
      columns={columns}
      filename="pending-payments.csv"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
