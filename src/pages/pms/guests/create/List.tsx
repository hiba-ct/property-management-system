import { ColumnDef } from '@tanstack/react-table';
import { GenericTable } from 'components/core';
import { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Avatar,
  Box,
  Divider,
  Button,
  Chip,
  Grid,
  IconButton
} from '@mui/material';

import CameraAltIcon from '@mui/icons-material/CameraAlt';

/* ================= TYPES ================= */

interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  nationality: string;
  gender?: string;
  dob?: string;
  preferences?: string[];
  photo?: string;
}

/* ================= DATA ================= */

const initialData: Guest[] = [
  {
    id: 'G001',
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john@gmail.com',
    nationality: 'Indian',
    gender: 'Male',
    dob: '15/07/1990',
    preferences: ['Vegetarian meals', 'Airport pickup']
  }
];

/* ================= COMPONENT ================= */

export default function GuestList() {

  const [rows, setRows] = useState<Guest[]>(initialData);
  const [selected, setSelected] = useState<Guest | null>(null);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<string | undefined>();

  /* ================= VIEW ================= */

  const handleView = (row: Guest) => {
    setSelected(row);
    setPhoto(row.photo);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  /* ================= PHOTO UPLOAD ================= */

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  };

  /* ================= EDIT ================= */

  const handleEdit = (row: Guest) => {
    console.log("Edit Guest:", row);
  };

  /* ================= DELETE ================= */

  const handleDelete = (row: Guest) => {
    setRows(prev => prev.filter(r => r.id !== row.id));
  };

  /* ================= TABLE COLUMNS ================= */

  const columns: ColumnDef<Guest>[] = [
    { header: 'Guest ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Nationality', accessorKey: 'nationality' }
  ];

  return (
    <>
      {/* ================= TABLE ================= */}

      <GenericTable<Guest>
        data={rows}
        columns={columns}
        filename="guest-list.csv"
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ================= PROFILE MODAL ================= */}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>

        <DialogTitle
          sx={{
            backgroundColor: '#7b1e24',
            color: 'white',
            fontWeight: 600
          }}
        >
          Guest Profile
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>

          {selected && (
            <Stack spacing={4}>

              {/* PROFILE HEADER */}

              <Stack spacing={2} alignItems="center" textAlign="center">

                <Box position="relative">

                  <Avatar
                    src={photo}
                    sx={{
                      width: 110,
                      height: 110,
                      fontSize: 40,
                      bgcolor: '#8a3944'
                    }}
                  >
                    {!photo && selected.name.charAt(0)}
                  </Avatar>

                  <IconButton
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: -10,
                      bgcolor: 'white',
                      boxShadow: 2
                    }}
                  >
                    <CameraAltIcon fontSize="small" />
                    <input hidden type="file" onChange={handlePhotoUpload} />
                  </IconButton>

                </Box>

                <Typography variant="h6" fontWeight={600}>
                  {selected.name}
                </Typography>

                <Typography color="text.secondary">
                  Guest ID: {selected.id}
                </Typography>

                <Chip
                  label={selected.nationality}
                  size="small"
                  sx={{
                    bgcolor: '#8a3944',
                    color: 'white'
                  }}
                />

              </Stack>

              <Divider />

              {/* PERSONAL INFORMATION */}

              <Box>

                <Typography variant="subtitle1" mb={2}>
                  Personal Information
                </Typography>

                <Grid container spacing={2}>

                  <Grid size={{xs: 6}}>
                    <Typography>
                      <b>Gender:</b> {selected.gender}
                    </Typography>

                    <Typography>
                      <b>Date of Birth:</b> {selected.dob}
                    </Typography>
                  </Grid>

                  <Grid size={{xs: 6}}>
                    <Typography>
                      <b>Phone:</b> {selected.phone}
                    </Typography>

                    <Typography>
                      <b>Email:</b> {selected.email}
                    </Typography>
                  </Grid>

                </Grid>

              </Box>

              <Divider />

              {/* PREFERENCES */}

              <Box>

                <Typography variant="subtitle1" mb={2}>
                  Preferences
                </Typography>

                <Stack spacing={1}>
                  {selected.preferences?.map((pref, index) => (
                    <Typography key={index}>
                      • {pref}
                    </Typography>
                  ))}
                </Stack>

              </Box>

              <Divider />

              {/* ACTION BUTTONS */}

              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
              >

                <Button variant="outlined">
                  Edit Profile
                </Button>

                <Button variant="outlined">
                  Add Booking
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#8a3944'
                  }}
                  onClick={handleClose}
                >
                  Back
                </Button>

              </Stack>

            </Stack>
          )}

        </DialogContent>

      </Dialog>
    </>
  );
}