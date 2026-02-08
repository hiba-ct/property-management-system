import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import { CommonTextInput, CommonSelectInput } from 'components/core';
import { availabilitySchema } from './schema';
import { SaveAdd, Eraser } from 'iconsax-reactjs';

export default function AvailabilityForm() {
  const formik = useFormik({
    initialValues: {
      fromDate: '',
      toDate: '',
      roomType: '',
      status: '',
      occupancy: ''
    },
    validationSchema: availabilitySchema,
    onSubmit: (values) => {
      console.log('Availability Filter:', values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent>
        

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'secondary.50',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="fromDate"
                label="From Date"
                type="date"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="toDate"
                label="To Date"
                type="date"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <CommonSelectInput
                formik={formik}
                name="roomType"
                label="Room Type"
                options={[
                  { label: 'Deluxe', value: 'Deluxe' },
                  { label: 'Standard', value: 'Standard' },
                  { label: 'Suite', value: 'Suite' }
                ]}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <CommonSelectInput
                formik={formik}
                name="occupancy"
                label="Occupancy"
                options={[
                  { label: 'Single', value: 'Single' },
                  { label: 'Double', value: 'Double' }
                ]}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <CommonSelectInput
                formik={formik}
                name="status"
                label="Status"
                options={[
                  { label: 'Available', value: 'available' },
                  { label: 'Booked', value: 'booked' },
                  { label: 'Maintenance', value: 'blocked' }
                ]}
              />
            </Grid>
          </Grid>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <Button
            variant="outlined"
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
            Apply
          </Button>
        </Stack>
      </CardContent>
    </form>
  );
}
