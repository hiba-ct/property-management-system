import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

interface BookingEvent {
  date: number;
  bookingId?: string;
  status?: 'confirmed' | 'checkedin' | 'cancelled';
}

const calendarData: BookingEvent[] = [
  { date: 2, bookingId: 'BK001', status: 'confirmed' },
  { date: 4, bookingId: 'BK002', status: 'confirmed' },
  { date: 7, bookingId: 'BK003', status: 'checkedin' },
  { date: 9, bookingId: 'BK004', status: 'confirmed' },
  { date: 11, bookingId: 'BK005', status: 'cancelled' }
];

const statusColor = (status?: string) => {
  switch (status) {
    case 'confirmed':
      return 'primary';
    case 'checkedin':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

export default function CalendarList() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Booking Calendar – August 2025
      </Typography>

      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid key={day} size={12 / 7}>
            <Typography align="center" fontWeight={600}>
              {day}
            </Typography>
          </Grid>
        ))}

        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          const booking = calendarData.find((b) => b.date === day);

          return (
            <Grid key={day} size={12 / 7}>
              <Paper variant="outlined" sx={{ height: 90, p: 1, borderRadius: 2 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption">{day}</Typography>
                  {booking && (
                    <Chip
                      size="small"
                      label={booking.bookingId}
                      color={statusColor(booking.status) as any}
                    />
                  )}
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Box mt={3}>
        <Stack direction="row" spacing={2}>
          <Chip label="Confirmed" color="primary" size="small" />
          <Chip label="Checked-In" color="success" size="small" />
          <Chip label="Cancelled" color="error" size="small" />
        </Stack>
      </Box>
    </Paper>
  );
}
