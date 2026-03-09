import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import { useState } from 'react';

interface Cleaning {
  room: string;
  status: string;
  lastCleaned: string;
  assigned: string;
}

const data: Cleaning[] = [
  { room: '101', status: 'Clean', lastCleaned: '22-Aug-2025', assigned: 'John' },
  { room: '102', status: 'Dirty', lastCleaned: '21-Aug-2025', assigned: 'Unassigned' }
];

const columns: ColumnDef<Cleaning>[] = [
  { header: 'Room', accessorKey: 'room' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Last Cleaned', accessorKey: 'lastCleaned' },
  { header: 'Assigned To', accessorKey: 'assigned' }
];

export default function CleaningList() {
  const [rows, setRows] = useState<Cleaning[]>(data);
  
    /* ================= EDIT ================= */
  
    const handleEdit = (row: Cleaning) => {
      console.log("Edit Cleaning:", row);
      // Example: open edit form or navigate
    };
  
    /* ================= DELETE ================= */
  
    const handleDelete = (row: Cleaning) => {
      setRows(prev => prev.filter(r => r !== row));
    };
  
  return <GenericTable data={rows} 
  columns={columns}
  onEdit={handleEdit} 
  onDelete={handleDelete} />;
}

