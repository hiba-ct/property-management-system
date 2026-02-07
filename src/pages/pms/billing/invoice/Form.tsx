import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useFormik } from 'formik';
import { SaveAdd, Eraser } from 'iconsax-reactjs';

import { CommonTextInput, CommonSelectInput } from 'components/core';
import { invoiceSchema } from './schema';

export default function InvoiceForm() {
  const formik = useFormik({
    initialValues: {
      bookingRef: '',
      guestName: '',
      amount: '',
      issueDate: '',
      dueDate: '',
      status: 'Pending'
    },
    validationSchema: invoiceSchema,
    onSubmit: (values) => {
      console.log('Invoice created:', values);
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
                name="bookingRef"
                label="Booking Ref"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="guestName"
                label="Guest Name"
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
                name="status"
                label="Status"
                options={[
                  { label: 'Pending', value: 'Pending' },
                  { label: 'Paid', value: 'Paid' },
                  { label: 'Overdue', value: 'Overdue' }
                ]}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="issueDate"
                label="Issue Date"
                type="date"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="dueDate"
                label="Due Date"
                type="date"
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
              variant="contained"
              type="submit"
              startIcon={<SaveAdd />}
            >
              Create Invoice
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
