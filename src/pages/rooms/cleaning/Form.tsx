import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useFormik } from 'formik';

import { CommonTextInput, CommonSelectInput } from 'components/core';
import { SaveAdd, Eraser } from 'iconsax-reactjs';
import { cleaningSchema } from './schema';

export default function CleaningForm() {
  const formik = useFormik({
    initialValues: {
      room: '',
      status: '',
      lastCleaned: '',
      assigned: ''
    },
    validationSchema: cleaningSchema,
    onSubmit: (values) => {
      console.log('Cleaning Details:', values);
      // 🔗 API call later
    }
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            {/* Room */}
            <Grid size={{ xs: 12 }}>
              <CommonTextInput
                formik={formik}
                name="room"
                label="Room Number"
              />
            </Grid>

            {/* Status */}
            <Grid size={{ xs: 12 }}>
              <CommonSelectInput
                formik={formik}
                name="status"
                label="Cleaning Status"
                options={[
                  { label: 'Clean', value: 'Clean' },
                  { label: 'Dirty', value: 'Dirty' },
                  { label: 'In Progress', value: 'In Progress' }
                ]}
              />
            </Grid>

            {/* Last Cleaned */}
            <Grid size={{ xs: 12 }}>
              <CommonTextInput
                formik={formik}
                name="lastCleaned"
                label="Last Cleaned Date"
                type="date"
              />
            </Grid>

            {/* Assigned To */}
            <Grid size={{ xs: 12 }}>
              <CommonTextInput
                formik={formik}
                name="assigned"
                label="Assigned To"
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
