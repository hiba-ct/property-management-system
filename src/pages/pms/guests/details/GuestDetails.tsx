import { useState, ChangeEvent } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import { Camera } from 'iconsax-reactjs';
import { useParams, useNavigate } from 'react-router-dom';

export default function GuestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 Profile image state
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const guest = {
    name: 'John Doe',
    gender: 'Male',
    dob: '15/07/1990',
    phone: '+91 9876543210',
    email: 'john@gmail.com',
    nationality: 'Indian',
    preferences: ['Vegetarian meals', 'Airport pickup']
  };

  // 🔹 Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);

    // 👉 Later: upload `file` to backend
  };

  return (
    <Card>
      <CardContent>
        {/* ================= HEADER ================= */}
        <Stack direction="row" spacing={3} alignItems="center">
          {/* AVATAR WITH UPLOAD */}
          <Box position="relative">
            <Avatar
              src={profileImage || undefined}
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'primary.main',
                fontSize: 28
              }}
            >
              {!profileImage && 'JD'}
            </Avatar>

            {/* CAMERA ICON */}
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'background.paper',
                boxShadow: 1
              }}
            >
              <Camera size={18} />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </IconButton>
          </Box>

          <Stack>
            <Typography variant="h5">{guest.name}</Typography>
            <Typography color="text.secondary">
              Guest ID: {id}
            </Typography>
            <Chip
              label={guest.nationality}
              size="small"
              color="primary"
              sx={{ mt: 0.5, width: 'fit-content' }}
            />
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ================= BASIC INFO ================= */}
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Gender:</b> {guest.gender}</Typography>
            <Typography><b>Date of Birth:</b> {guest.dob}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Phone:</b> {guest.phone}</Typography>
            <Typography><b>Email:</b> {guest.email}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* ================= PREFERENCES ================= */}
        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>

        <Stack spacing={0.5}>
          {guest.preferences.map((pref) => (
            <Typography key={pref}>• {pref}</Typography>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ================= ACTIONS ================= */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => navigate(`/pms/guests/edit/${id}`)}
          >
            Edit Profile
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(`/pms/bookings/create?guest=${id}`)}
          >
            Add Booking
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
