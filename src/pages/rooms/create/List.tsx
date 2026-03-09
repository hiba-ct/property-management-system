import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import { useState } from 'react';

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
  const [rows, setRows] = useState<Room[]>(data);
  
    /* ================= EDIT ================= */
  
    const handleEdit = (row: Room) => {
      console.log("Edit Task:", row);
      // Example: open edit form or navigate
    };
  
    /* ================= DELETE ================= */
  
    const handleDelete = (row: Room) => {
      setRows(prev => prev.filter(r => r !== row));
    };
  
  return <GenericTable data={rows} columns={columns}
  onEdit={handleEdit} 
   onDelete={handleDelete} />;
}
