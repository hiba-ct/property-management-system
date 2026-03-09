import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import { useState } from 'react';

interface Payment {
  bookingId: string;
  guest: string;
  room: string;
  total: number;
  paid: number;
  balance: number;
}

const data: Payment[] = [
  {
    bookingId: 'BK2025-145',
    guest: 'John Doe',
    room: '204',
    total: 15000,
    paid: 10000,
    balance: 5000
  }
];

const columns: ColumnDef<Payment>[] = [
  { header: 'Booking ID', accessorKey: 'bookingId' },
  { header: 'Guest', accessorKey: 'guest' },
  { header: 'Room', accessorKey: 'room' },
  { header: 'Total (₹)', accessorKey: 'total' },
  { header: 'Paid (₹)', accessorKey: 'paid' },
  { header: 'Balance (₹)', accessorKey: 'balance' }
];

export default function PaymentList() {
  const [rows,setRows] = useState(data)

const handleEdit = (row:Payment)=>{
 console.log("edit",row)
}

const handleDelete = (row:Payment)=>{
 setRows(prev=>prev.filter(r=>r.bookingId!==row.bookingId))
}

  return (
    <GenericTable<Payment>
      data={data}
      columns={columns}
      filename="pending-payments.csv"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
