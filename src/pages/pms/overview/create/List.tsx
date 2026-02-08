import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/* ================= TYPES ================= */

interface AvailabilityRow {
  room: string;
  '08-Aug': string;
  '09-Aug': string;
  '10-Aug': string;
  '11-Aug': string;
}

/* ================= DATA ================= */

const data: AvailabilityRow[] = [
  {
    room: '101 Deluxe',
    '08-Aug': 'GREEN',
    '09-Aug': 'GREEN',
    '10-Aug': 'RED',
    '11-Aug': 'RED'
  },
  {
    room: '102 Standard',
    '08-Aug': 'RED',
    '09-Aug': 'RED',
    '10-Aug': 'GREEN',
    '11-Aug': 'GREEN'
  },
  {
    room: '201 Suite',
    '08-Aug': 'GREEN',
    '09-Aug': 'YELLOW',
    '10-Aug': 'GREEN',
    '11-Aug': 'GREEN'
  }
];

/* ================= STATUS CHIP ================= */

const StatusChip = ({ value }: { value: string }) => {
  const color =
    value === 'GREEN'
      ? 'success'
      : value === 'RED'
      ? 'error'
      : value === 'YELLOW'
      ? 'warning'
      : 'default';

  return <Chip label={value} size="small" color={color} />;
};

/* ================= COLUMNS ================= */

const columns: ColumnDef<AvailabilityRow>[] = [
  { header: 'Room', accessorKey: 'room' },
  { header: '08-Aug', accessorKey: '08-Aug', cell: ({ getValue }) => <StatusChip value={getValue<string>()} /> },
  { header: '09-Aug', accessorKey: '09-Aug', cell: ({ getValue }) => <StatusChip value={getValue<string>()} /> },
  { header: '10-Aug', accessorKey: '10-Aug', cell: ({ getValue }) => <StatusChip value={getValue<string>()} /> },
  { header: '11-Aug', accessorKey: '11-Aug', cell: ({ getValue }) => <StatusChip value={getValue<string>()} /> }
];

/* ================= COMPONENT ================= */

export default function AvailabilityList() {
  return (
    <GenericTable<AvailabilityRow>
      data={data}
      columns={columns}
      filename="availability-overview.csv"
      meta={{
        extraContent: (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Legend
            </Typography>

            <Stack direction="row" spacing={2}>
              <Chip label="Available" color="success" size="small" />
              <Chip label="Booked" color="error" size="small" />
              <Chip label="Maintenance / Blocked" color="warning" size="small" />
            </Stack>
          </>
        )
      }}
    />
  );
}
