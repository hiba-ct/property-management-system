import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';

interface Room {
  number: string;
  name: string;
  type: string;
  floor: number;
  status: string;
}

const data: Room[] = [
  { number: '101', name: 'Deluxe Room', type: 'Deluxe', floor: 1, status: 'Active' },
  { number: '201', name: 'Suite', type: 'Suite', floor: 2, status: 'Inactive' }
];

const columns: ColumnDef<Room>[] = [
  { header: 'Room No', accessorKey: 'number' },
  { header: 'Room Name', accessorKey: 'name' },
  { header: 'Type', accessorKey: 'type' },
  { header: 'Floor', accessorKey: 'floor' },
  { header: 'Status', accessorKey: 'status' }
];

export default function RoomList() {
  return <GenericTable data={data} columns={columns} />;
}
