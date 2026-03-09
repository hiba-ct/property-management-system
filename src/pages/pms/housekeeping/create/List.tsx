import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

interface Task {
  roomNo: string;
  roomType: string;
  task: string;
  assignedTo: string;
  priority: string;
  status: string;
  dueDate: string;
}

/* ================= INITIAL DATA ================= */

const initialData: Task[] = [
  {
    roomNo: '101',
    roomType: 'Deluxe',
    task: 'Clean & Change Linen',
    assignedTo: 'John Doe',
    priority: 'High',
    status: 'Pending',
    dueDate: '22-Aug-2025'
  }
];

export default function HousekeepingList() {

  const [rows, setRows] = useState<Task[]>(initialData);

  /* ================= EDIT ================= */

  const handleEdit = (row: Task) => {
    console.log("Edit Task:", row);
    // Example: open edit form or navigate
  };

  /* ================= DELETE ================= */

  const handleDelete = (row: Task) => {
    setRows(prev => prev.filter(r => r !== row));
  };

  /* ================= COLUMNS ================= */

  const columns: ColumnDef<Task>[] = [
    { header: 'Room No', accessorKey: 'roomNo' },
    { header: 'Room Type', accessorKey: 'roomType' },
    { header: 'Task', accessorKey: 'task' },
    { header: 'Assigned To', accessorKey: 'assignedTo' },

    {
      header: 'Priority',
      accessorKey: 'priority',
      cell: ({ getValue }) => (
        <Chip label={getValue<string>()} size="small" color="warning" />
      )
    },

    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }) => (
        <Chip label={getValue<string>()} size="small" color="info" />
      )
    },

    { header: 'Due Date', accessorKey: 'dueDate' }
  ];

  return (
    <GenericTable<Task>
      data={rows}
      columns={columns}
      filename="housekeeping-tasks.csv"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}