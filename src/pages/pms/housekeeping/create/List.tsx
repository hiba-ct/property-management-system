import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import Chip from '@mui/material/Chip';

interface Task {
  roomNo: string;
  roomType: string;
  task: string;
  assignedTo: string;
  priority: string;
  status: string;
  dueDate: string;
}

const data: Task[] = [
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

export default function HousekeepingList() {
  return (
    <GenericTable<Task>
      data={data}
      columns={columns}
      filename="housekeeping-tasks.csv"
    />
  );
}
