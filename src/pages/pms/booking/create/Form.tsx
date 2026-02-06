import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { SaveAdd, Eraser } from 'iconsax-reactjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CommonTextInput, CommonSelectInput } from 'components/core';
import { validationSchemaUserType } from './schema';

/* ==================== Validation Schema ==================== */


/* ==================== Booking Form ==================== */
export default function BookingForm() {
  const formik = useFormik({
    initialValues: {
      guestName: '',
      mobile: '',
      checkIn: '',
      checkOut: '',
      roomType: '',
      roomNo: '',
      paymentMode: ''
    },
    validationSchema: validationSchemaUserType,
    onSubmit: (values) => {
      console.log('Booking Data:', values);
      // 🔗 API call will go here later
    }
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            {/* Guest Name */}
            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput
                formik={formik}
                name="guestName"
                label="Guest Name"
              />
            </Grid>

            {/* Mobile */}
            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput
                formik={formik}
                name="mobile"
                label="Mobile Number"
              />
            </Grid>

            {/* Check In */}
            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput
                formik={formik}
                name="checkIn"
                label="Check In"
                type="date"
              />
            </Grid>

            {/* Check Out */}
            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput
                formik={formik}
                name="checkOut"
                label="Check Out"
                type="date"
              />
            </Grid>

            {/* Room Type */}
            <Grid size={{ xs: 12,md:6 }}>
              <CommonSelectInput
                formik={formik}
                name="roomType"
                label="Room Type"
                options={[
                  { label: 'Deluxe', value: 'deluxe' },
                  { label: 'Suite', value: 'suite' },
                  { label: 'Standard', value: 'standard' }
                ]}
              />
            </Grid>

            {/* Room No */}
            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput
                formik={formik}
                name="roomNo"
                label="Room Number"
              />
            </Grid>

            {/* Payment Mode */}
            <Grid size={{ xs: 12,md:6 }}>
              <CommonSelectInput
                formik={formik}
                name="paymentMode"
                label="Payment Mode"
                options={[
                  { label: 'Cash', value: 'cash' },
                  { label: 'Card', value: 'card' },
                  { label: 'UPI', value: 'upi' }
                ]}
              />
            </Grid>
          </Grid>
        </CardContent>

        {/* ACTION BUTTONS */}
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
