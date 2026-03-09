import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Chip,
  Button
} from '@mui/material';

/* ================= TYPES ================= */

interface Booking {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

/* ================= DATA ================= */

const initialData: Booking[] = [
  {
    id: 'BK001',
    guest: 'John Doe',
    room: 'Deluxe',
    checkIn: '2025-01-01',
    checkOut: '2025-01-03',
    status: 'Confirmed'
  },
  {
    id: 'BK002',
    guest: 'Alice Smith',
    room: 'Suite',
    checkIn: '2025-02-05',
    checkOut: '2025-02-08',
    status: 'Pending'
  },
  {
    id: 'BK003',
    guest: 'Alice Smith',
    room: 'Suite',
    checkIn: '2025-02-05',
    checkOut: '2025-02-08',
    status: 'Cancelled'
  }
];

/* ================= STATUS COLOR ================= */

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Cancelled':
      return 'error';
    default:
      return 'default';
  }
};

/* ================= COMPONENT ================= */

export default function BookingList() {

  const [rows, setRows] = useState<Booking[]>(initialData);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [open, setOpen] = useState(false);

  /* ================= VIEW ================= */

  const handleView = (row: Booking) => {
    setSelected(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  /* ================= EDIT ================= */

  const handleEdit = (row: Booking) => {
    console.log('Edit booking', row);
  };

  /* ================= DELETE ================= */

  const handleDelete = (row: Booking) => {
    setRows(prev => prev.filter(r => r.id !== row.id));
  };

  /* ================= TABLE COLUMNS ================= */

  const columns: ColumnDef<Booking>[] = [
    {
      header: 'Booking ID',
      accessorKey: 'id'
    },
    {
      header: 'Guest',
      accessorKey: 'guest'
    },
    {
      header: 'Room',
      accessorKey: 'room'
    },
    {
      header: 'Check In',
      accessorKey: 'checkIn'
    },
    {
      header: 'Check Out',
      accessorKey: 'checkOut'
    },
    {
      header: 'Status',
      cell: ({ row }) => (
        <Chip
          label={row.original.status}
          color={getStatusColor(row.original.status) as any}
          size="small"
        />
      )
    }
  ];

  return (
    <>
      {/* ================= TABLE ================= */}

      <GenericTable<Booking>
        data={rows}
        columns={columns}
        filename="booking-list.csv"
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ================= BOOKING DETAILS MODAL ================= */}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>

        <DialogTitle
          sx={{
            backgroundColor: '#7b1e24',
            color: 'white',
            fontWeight: 600
          }}
        >
          Booking Details
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>

          {selected && (
            <Stack spacing={2}>

              <Typography variant="h6">Guest Information</Typography>
              <Typography>Name: {selected.guest}</Typography>
              <Typography>Email: john@example.com</Typography>
              <Typography>Phone: +91 9876543210</Typography>

              <Typography variant="h6">Booking Information</Typography>
              <Typography>Booking ID: {selected.id}</Typography>
              <Typography>Check-in: {selected.checkIn}</Typography>
              <Typography>Check-out: {selected.checkOut}</Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Status:</Typography>
                <Chip
                  label={selected.status}
                  color={getStatusColor(selected.status) as any}
                  size="small"
                />
              </Stack>

              <Typography variant="h6">Room Details</Typography>
              <Typography>Room Type: {selected.room}</Typography>
              <Typography>Room Number: 101</Typography>

              <Typography variant="h6">Payment</Typography>
              <Typography>Total Amount: ₹14,300</Typography>
              <Typography>Paid: ₹10,000</Typography>
              <Typography>Balance: ₹4,300</Typography>

              <Typography variant="h6">Notes</Typography>
              <Typography>- Guest requested early check-in</Typography>

              <Stack direction="row" spacing={2} mt={2}>
                <Button variant="contained">
                  Edit
                </Button>

                <Button color="error" variant="contained">
                  Cancel Booking
                </Button>

                <Button variant="outlined">
                  Print Invoice
                </Button>
              </Stack>

            </Stack>
          )}

        </DialogContent>

      </Dialog>
    </>
  );
}