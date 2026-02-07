import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';

interface Invoice {
  invoiceNo: string;
  guest: string;
  bookingRef: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: string;
}

const data: Invoice[] = [
  {
    invoiceNo: 'INV-1001',
    guest: 'John Doe',
    bookingRef: 'BK-2001',
    issueDate: '12-Aug-25',
    dueDate: '19-Aug-25',
    amount: 5000,
    status: 'Pending'
  },
  {
    invoiceNo: 'INV-1002',
    guest: 'Sarah Johnson',
    bookingRef: 'BK-2003',
    issueDate: '15-Aug-25',
    dueDate: '22-Aug-25',
    amount: 3500,
    status: 'Paid'
  },
  {
    invoiceNo: 'INV-1003',
    guest: 'Michael Brown',
    bookingRef: 'BK-2007',
    issueDate: '16-Aug-25',
    dueDate: '23-Aug-25',
    amount: 4200,
    status: 'Overdue'
  }
];

const columns: ColumnDef<Invoice>[] = [
  { header: 'Invoice #', accessorKey: 'invoiceNo' },
  { header: 'Guest Name', accessorKey: 'guest' },
  { header: 'Booking Ref', accessorKey: 'bookingRef' },
  { header: 'Date Issued', accessorKey: 'issueDate' },
  { header: 'Due Date', accessorKey: 'dueDate' },
  { header: 'Amount (₹)', accessorKey: 'amount' },
  { header: 'Status', accessorKey: 'status' }
];

export default function InvoiceList() {
  return (
    <GenericTable<Invoice>
      data={data}
      columns={columns}
      filename="invoice-list.csv"
    />
  );
}
