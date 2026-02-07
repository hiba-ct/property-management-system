import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';

interface Feedback {
  guest: string;
  room: string;
  rating: string;
  clean:string;
  service:string;
  food:string;
  comfirt:string;
  date: string;
}

const data: Feedback[] = [
  {
    guest: 'John Doe',
    room: '204',
    rating: 'Excellent',
    clean:'average',
    service:'good',
    food:'good',
    comfirt:'good',
    date: '15-Aug-2025'
  }
];

const columns: ColumnDef<Feedback>[] = [
  { header: 'Guest', accessorKey: 'guest' },
  { header: 'Room', accessorKey: 'room' },
  { header: 'Overall Rating', accessorKey: 'rating' },
  { header: 'Cleanliness', accessorKey: 'clean' },
   { header: 'Staff Service', accessorKey: 'service' },
    { header: 'Food and Dining', accessorKey: 'food' },
     { header: 'Comfirt and ameities', accessorKey: 'comfirt' },
  { header: 'Date', accessorKey: 'date' }
];

export default function FeedbackList() {
  return (
    <GenericTable
      data={data}
      columns={columns}
      filename="guest-feedback.csv"
    />
  );
}
