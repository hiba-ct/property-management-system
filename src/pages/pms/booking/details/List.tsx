import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import { Edit, Trash, Printer, Sms } from 'iconsax-reactjs';

export default function BookingDetails() {
  // 🔹 Dummy data (replace with API later)
  const booking = {
    id: 'BKG-2025-001',
    guestName: 'John Doe',
    email: 'john@example.com',
    mobile: '+91 9876543210',
    address: '123 MG Road, Bangalore',

    checkIn: '22 Aug 2025',
    checkOut: '25 Aug 2025',
    status: 'Confirmed',
    source: 'Website',
    createdOn: '20 Aug 2025, 2:30 PM',

    roomType: 'Deluxe Room',
    roomNo: '101',
    guests: '2 Adults, 1 Child',
    rate: 4000,
    nights: 3,

    services: [
      { name: 'Breakfast', price: 1500 },
      { name: 'Extra Bed', price: 800 }
    ],

    totalAmount: 14300,
    paid: 10000,
    paymentMode: 'UPI',
    paymentStatus: 'Partially Paid',

    notes: [
      'Guest requested early check-in at 10 AM',
      'Needs vegetarian breakfast'
    ]
  };

  const servicesTotal = booking.services.reduce((a, b) => a + b.price, 0);
  const roomTotal = booking.rate * booking.nights;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          {/* ================= GUEST INFO ================= */}
          <Grid size={12}>
            <Typography variant="h6">Guest Information</Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Name:</b> {booking.guestName}</Typography>
            <Typography><b>Email:</b> {booking.email}</Typography>
            <Typography><b>Mobile:</b> {booking.mobile}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Address:</b></Typography>
            <Typography color="text.secondary">{booking.address}</Typography>
          </Grid>

          {/* ================= BOOKING INFO ================= */}
          <Grid size={12}>
            <Typography variant="h6">Booking Information</Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Booking ID:</b> {booking.id}</Typography>
            <Typography><b>Check-in:</b> {booking.checkIn}</Typography>
            <Typography><b>Check-out:</b> {booking.checkOut}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <b>Status:</b>{' '}
              <Chip label={booking.status} color="primary" size="small" />
            </Typography>
            <Typography><b>Source:</b> {booking.source}</Typography>
            <Typography><b>Created On:</b> {booking.createdOn}</Typography>
          </Grid>

          {/* ================= ROOM INFO ================= */}
          <Grid size={12}>
            <Typography variant="h6">Room Details</Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Room Type:</b> {booking.roomType}</Typography>
            <Typography><b>Room No:</b> {booking.roomNo}</Typography>
            <Typography><b>Guests:</b> {booking.guests}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Rate/Night:</b> ₹ {booking.rate}</Typography>
            <Typography><b>Nights:</b> {booking.nights}</Typography>
            <Typography><b>Room Cost:</b> ₹ {roomTotal}</Typography>
          </Grid>

          {/* ================= SERVICES ================= */}
          <Grid size={12}>
            <Typography variant="h6">Additional Services</Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid size={12}>
            {booking.services.map((s) => (
              <Typography key={s.name}>
                ✓ {s.name} – ₹ {s.price}
              </Typography>
            ))}
            <Typography mt={1}>
              <b>Total Services:</b> ₹ {servicesTotal}
            </Typography>
          </Grid>

          {/* ================= PAYMENT ================= */}
          <Grid size={12}>
            <Typography variant="h6">Payment Information</Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Total Amount:</b> ₹ {booking.totalAmount}</Typography>
            <Typography><b>Paid:</b> ₹ {booking.paid}</Typography>
            <Typography><b>Balance:</b> ₹ {booking.totalAmount - booking.paid}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography><b>Payment Mode:</b> {booking.paymentMode}</Typography>
            <Typography>
              <b>Status:</b>{' '}
              <Chip label={booking.paymentStatus} color="warning" size="small" />
            </Typography>
          </Grid>

          {/* ================= NOTES ================= */}
          <Grid size={12}>
            <Typography variant="h6">Notes / Special Requests</Typography>
            <Divider sx={{ my: 1 }} />
            {booking.notes.map((note, i) => (
              <Typography key={i}>• {note}</Typography>
            ))}
          </Grid>
        </Grid>
      </CardContent>

      {/* ================= ACTIONS ================= */}
      <CardActions sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<Edit />}>Edit</Button>
          <Button color="error" variant="outlined" startIcon={<Trash />}>Cancel</Button>
          <Button variant="outlined" startIcon={<Printer />}>Print</Button>
          <Button variant="outlined" startIcon={<Sms />}>Email</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
