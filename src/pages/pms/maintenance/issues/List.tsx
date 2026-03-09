import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

interface MaintenanceIssue {
  id: string;
  room: string;
  description: string;
  priority: string;
  status: string;
  assignedTo: string;
}

const data: MaintenanceIssue[] = [
  {
    id: 'ISS-001',
    room: '101',
    description: 'AC not working',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'John Doe'
  },
  {
    id: 'ISS-002',
    room: '202',
    description: 'Leaking faucet',
    priority: 'Medium',
    status: 'Pending',
    assignedTo: 'Unassigned'
  }
];

const columns: ColumnDef<MaintenanceIssue>[] = [
  { header: 'Issue ID', accessorKey: 'id' },
  { header: 'Room', accessorKey: 'room' },
  { header: 'Description', accessorKey: 'description' },
  {
    header: 'Priority',
    accessorKey: 'priority',
    cell: ({ getValue }) => (
      <Chip
        label={getValue<string>()}
        size="small"
        color={
          getValue() === 'High'
            ? 'error'
            : getValue() === 'Medium'
            ? 'warning'
            : 'default'
        }
      />
    )
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => (
      <Chip
        label={getValue<string>()}
        size="small"
        color={getValue() === 'In Progress' ? 'info' : 'warning'}
      />
    )
  },
  { header: 'Assigned To', accessorKey: 'assignedTo' }
];

export default function MaintenanceIssueList() {
   const [rows, setRows] = useState<MaintenanceIssue[]>(data);
    
      /* ================= EDIT ================= */
    
      const handleEdit = (row: MaintenanceIssue) => {
        console.log("Edit Task:", row);
        // Example: open edit form or navigate
      };
    
      /* ================= DELETE ================= */
    
      const handleDelete = (row: MaintenanceIssue) => {
        setRows(prev => prev.filter(r => r !== row));
      };
    
  return (
    <GenericTable<MaintenanceIssue>
      data={rows}
      columns={columns}
      filename="maintenance-issues.csv"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
