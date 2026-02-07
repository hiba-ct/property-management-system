import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useFormik } from 'formik';
import { SaveAdd, Eraser } from 'iconsax-reactjs';

import { CommonTextInput, CommonSelectInput } from 'components/core';
import { pendingPaymentSchema } from './schema';

export default function PendingPaymentForm() {
  const formik = useFormik({
    initialValues: {
      bookingId: '',
      amount: '',
      paymentMode: '',
      paymentDate: '',
      reference: ''
    },
    validationSchema: pendingPaymentSchema,
    onSubmit: (values) => {
      console.log('Pending payment paid:', values);
    }
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="bookingId"
                label="Booking ID"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="amount"
                label="Amount (₹)"
                type="number"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonSelectInput
                formik={formik}
                name="paymentMode"
                label="Payment Mode"
                options={[
                  { label: 'Cash', value: 'cash' },
                  { label: 'UPI', value: 'upi' },
                  { label: 'Card', value: 'card' },
                  { label: 'Bank Transfer', value: 'bank' }
                ]}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="paymentDate"
                label="Payment Date"
                type="date"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="reference"
                label="Reference No (optional)"
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
              Pay Now
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
