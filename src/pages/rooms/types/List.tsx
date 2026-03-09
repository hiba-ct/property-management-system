import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import { useState } from 'react';

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
  const [rows, setRows] = useState<RoomType[]>(data);
  
    /* ================= EDIT ================= */
  
    const handleEdit = (row: RoomType) => {
      console.log("Edit Room Type:", row);
      // Example: open edit form or navigate
    };
  
    /* ================= DELETE ================= */
  
    const handleDelete = (row: RoomType) => {
      setRows(prev => prev.filter(r => r !== row));
    };
  
  return (
    <GenericTable<RoomType>
      data={rows}
      columns={columns}
      filename="room-types.csv"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
