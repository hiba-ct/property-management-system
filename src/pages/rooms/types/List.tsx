import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';

interface RoomType {
  code: string;
  name: string;
  capacity: string;
  price: number;
}

const data: RoomType[] = [
  {
    code: 'DLX',
    name: 'Deluxe Suite',
    capacity: '2 Adults, 1 Child',
    price: 4000
  },
  {
    code: 'STD',
    name: 'Standard Room',
    capacity: '2 Adults',
    price: 3500
  }
];

const columns: ColumnDef<RoomType>[] = [
  { header: 'Code', accessorKey: 'code' },
  { header: 'Room Type', accessorKey: 'name' },
  { header: 'Capacity', accessorKey: 'capacity' },
  { header: 'Base Rate (₹)', accessorKey: 'price' }
];

export default function RoomTypeList() {
  return (
    <GenericTable<RoomType>
      data={data}
      columns={columns}
      filename="room-types.csv"
    />
  );
}
