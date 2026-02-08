import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import Chip from '@mui/material/Chip';

interface MaintenanceRequest {
  id: string;
  date: string;
  room: string;
  category: string;
  status: string;
}

const data: MaintenanceRequest[] = [
  {
    id: 'REQ-001',
    date: '08-Aug-2025',
    room: '101',
    category: 'Plumbing',
    status: 'Pending'
  },
  {
    id: 'REQ-002',
    date: '08-Aug-2025',
    room: '102',
    category: 'Electrical',
    status: 'In Progress'
  }
];

const columns: ColumnDef<MaintenanceRequest>[] = [
  { header: 'Request ID', accessorKey: 'id' },
  { header: 'Date', accessorKey: 'date' },
  { header: 'Room', accessorKey: 'room' },
  { header: 'Category', accessorKey: 'category' },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => (
      <Chip
        label={getValue<string>()}
        size="small"
        color={
          getValue() === 'Pending'
            ? 'warning'
            : getValue() === 'In Progress'
            ? 'info'
            : 'success'
        }
      />
    )
  }
];

export default function MaintenanceRequestList() {
  return (
    <GenericTable<MaintenanceRequest>
      data={data}
      columns={columns}
      filename="maintenance-requests.csv"
    />
  );
}
