import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useFormik } from 'formik';
import { bookingDetailsSchema } from './schema';
import { CommonTextInput, CommonSelectInput } from 'components/core';
import { SaveAdd, Eraser } from 'iconsax-reactjs';

export default function BookingDetailsForm() {
  const formik = useFormik({
    initialValues: {
      guestName: '',
      email: '',
      mobile: '',
      address: '',

      checkIn: '',
      checkOut: '',
      status: '',
      source: '',

      roomType: '',
      roomNo: '',
      guests: '',

      rate: '',
      nights: '',

      totalAmount: '',
      paid: '',
      paymentMode: '',
      paymentStatus: ''
    },
    validationSchema: bookingDetailsSchema,
    onSubmit: (values) => {
      console.log('Booking Details:', values);
    }
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            {/* Guest Info */}
            <Grid size={12}><b>Guest Information</b></Grid>
            <Grid size={{xs:12,md:6}}><CommonTextInput formik={formik} name="guestName" label="Guest Name" /></Grid>
            <Grid size={{xs:12,md:6}}><CommonTextInput formik={formik} name="email" label="Email" /></Grid>
            <Grid size={{xs:12,md:6}}><CommonTextInput formik={formik} name="mobile" label="Mobile" /></Grid>
            <Grid size={{xs:12,md:6}}><CommonTextInput formik={formik} name="address" label="Address" /></Grid>

            {/* Booking Info */}
            <Grid size={12}><b>Booking Information</b></Grid>
            <Grid size={{xs:12,md:6}}><CommonTextInput type="date" formik={formik} name="checkIn" label="Check In" /></Grid>
            <Grid size={{xs:12,md:6}}><CommonTextInput type="date" formik={formik} name="checkOut" label="Check Out" /></Grid>
            <Grid size={{xs:12,md:6}}>
              <CommonSelectInput
                formik={formik}
                name="status"
                label="Status"
                options={[
                  { label: 'Confirmed', value: 'Confirmed' },
                  { label: 'Cancelled', value: 'Cancelled' },
                  { label: 'Checked-In', value: 'Checked-In' }
                ]}
              />
            </Grid>
            <Grid size={{xs:12,md:6}}><CommonTextInput formik={formik} name="source" label="Source" /></Grid>

            {/* Room Info */}
            <Grid size={12}><b>Room Details</b></Grid>
            <Grid size={{xs:12,md:4}}><CommonTextInput formik={formik} name="roomType" label="Room Type" /></Grid>
            <Grid size={{xs:12,md:4}}><CommonTextInput formik={formik} name="roomNo" label="Room Number" /></Grid>
            <Grid size={{xs:12,md:4}}><CommonTextInput formik={formik} name="guests" label="Guests" /></Grid>

            {/* Pricing */}
            <Grid size={{xs:12,md:4}}><CommonTextInput type="number" formik={formik} name="rate" label="Rate / Night" /></Grid>
            <Grid size={{xs:12,md:4}}><CommonTextInput type="number" formik={formik} name="nights" label="Nights" /></Grid>
            <Grid size={{xs:12,md:4}}><CommonTextInput type="number" formik={formik} name="totalAmount" label="Total Amount" /></Grid>
            <Grid size={{xs:12,md:4}}><CommonTextInput type="number" formik={formik} name="paid" label="Paid Amount" /></Grid>

            {/* Payment */}
            <Grid size={{xs:12,md:4}}><CommonTextInput formik={formik} name="paymentMode" label="Payment Mode" /></Grid>
            <Grid size={{xs:12,md:4}}><CommonTextInput formik={formik} name="paymentStatus" label="Payment Status" /></Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={2}>
            <Button color="error" startIcon={<Eraser />} onClick={() => formik.resetForm()}>
              Clear
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveAdd />}>
              Save
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
