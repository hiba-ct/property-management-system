import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useFormik } from 'formik';
import { calendarSchema } from './schema';
import { CommonTextInput, CommonSelectInput } from 'components/core';
import { SaveAdd, Eraser } from 'iconsax-reactjs';

export default function CalendarForm() {
  const formik = useFormik({
    initialValues: {
      bookingId: '',
      date: '',
      status: ''
    },
    validationSchema: calendarSchema,
    onSubmit: (values) => {
      console.log('Calendar Booking:', values);
      // 🔗 API call later
    }
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            {/* Booking ID */}
            <Grid size={{ xs: 12}}>
              <CommonTextInput
                formik={formik}
                name="bookingId"
                label="Booking ID"
              />
            </Grid>

            {/* Date */}
            <Grid size={{ xs: 12 }}>
              <CommonTextInput
                formik={formik}
                name="date"
                label="Booking Date"
                type="date"
              />
            </Grid>

            {/* Status */}
            <Grid size={{ xs: 12 }}>
              <CommonSelectInput
                formik={formik}
                name="status"
                label="Booking Status"
                options={[
                  { label: 'Confirmed', value: 'confirmed' },
                  { label: 'Checked-In', value: 'checkedin' },
                  { label: 'Cancelled', value: 'cancelled' }
                ]}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={2}>
            <Button
              color="error"
              startIcon={<Eraser />}
              onClick={() => formik.resetForm()}
            >
              Clear
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveAdd />}
            >
              Save
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
