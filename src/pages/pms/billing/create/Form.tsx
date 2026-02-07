import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import { CommonTextInput, CommonSelectInput } from 'components/core';
import { paymentSchema } from './schema';

import { Eraser, SaveAdd } from 'iconsax-reactjs';

export default function AddPaymentForm() {
  const formik = useFormik({
    initialValues: {
      amount: '',
      paymentDate: '',
      paymentMode: '',
      referenceNo: '',
      remarks: ''
    },
    validationSchema: paymentSchema,
    onSubmit: (values) => {
      console.log('Payment Data:', values);
    }
  });

  return (
    
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          {/* ================= HEADER ================= */}
          <Typography variant="h5" fontWeight={600}>
            Add Payment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Record payment received for a booking
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* ================= BOOKING SUMMARY ================= */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'secondary.50',
              border: '1px solid',
              borderColor: 'divider',
              mb: 3
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Booking Information
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2">
                  <b>Booking ID:</b> BK2025-145
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2">
                  <b>Guest:</b> John Doe
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2">
                  <b>Room No:</b> 204
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* ================= PAYMENT FORM ================= */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="amount"
                label="Amount (₹)"
                type="number"
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
              <CommonSelectInput
                formik={formik}
                name="paymentMode"
                label="Payment Mode"
                options={[
                  { label: 'Cash', value: 'cash' },
                  { label: 'Card', value: 'card' },
                  { label: 'UPI', value: 'upi' },
                  { label: 'Bank Transfer', value: 'bank' }
                ]}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="referenceNo"
                label="Reference No (Optional)"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CommonTextInput
                formik={formik}
                name="remarks"
                label="Remarks"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </CardContent>

        {/* ================= ACTIONS ================= */}
        <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
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
              Save Payment
            </Button>
          </Stack>
        </CardActions>
      </form>
   
  );
}
