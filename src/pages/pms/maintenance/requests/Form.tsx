import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useFormik } from 'formik';
import { CommonTextInput, CommonSelectInput } from 'components/core';
import { maintenanceRequestSchema } from './schema';

import { SaveAdd, Eraser } from 'iconsax-reactjs';

export default function MaintenanceRequestForm() {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      priority: '',
      roomNo: ''
    },
    validationSchema: maintenanceRequestSchema,
    onSubmit: (values) => {
      console.log('Maintenance Request:', values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent>
       

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CommonTextInput
              formik={formik}
              name="title"
              label="Request Title"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CommonTextInput
              formik={formik}
              name="description"
              label="Description"
              multiline
              rows={3}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CommonSelectInput
              formik={formik}
              name="category"
              label="Category"
              options={[
                { label: 'Plumbing', value: 'plumbing' },
                { label: 'Electrical', value: 'electrical' },
                { label: 'HVAC', value: 'hvac' },
                { label: 'Cleaning', value: 'cleaning' }
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CommonSelectInput
              formik={formik}
              name="priority"
              label="Priority"
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' }
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CommonTextInput
              formik={formik}
              name="roomNo"
              label="Room Number"
            />
          </Grid>
        </Grid>
      </CardContent>

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
            Submit Request
          </Button>
        </Stack>
      </CardActions>
    </form>
  );
}
