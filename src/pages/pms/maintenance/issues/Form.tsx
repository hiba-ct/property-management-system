import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import { CommonTextInput, CommonSelectInput } from 'components/core';
import { maintenanceIssueSchema } from './schema';

import { SaveAdd, Eraser } from 'iconsax-reactjs';

export default function MaintenanceIssueForm() {
  const formik = useFormik({
    initialValues: {
      room: '',
      description: '',
      priority: '',
      status: '',
      assignedTo: ''
    },
    validationSchema: maintenanceIssueSchema,
    onSubmit: (values) => {
      console.log('Maintenance Issue:', values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent>
       

        {/* ================= ISSUE FORM ================= */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CommonTextInput
              formik={formik}
              name="room"
              label="Room No"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CommonSelectInput
              formik={formik}
              name="priority"
              label="Priority"
              options={[
                { label: 'Low', value: 'Low' },
                { label: 'Medium', value: 'Medium' },
                { label: 'High', value: 'High' }
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CommonSelectInput
              formik={formik}
              name="status"
              label="Status"
              options={[
                { label: 'Pending', value: 'Pending' },
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Resolved', value: 'Resolved' }
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6  }}>
            <CommonTextInput
              formik={formik}
              name="description"
              label="Issue Description"
              multiline
              rows={3}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CommonTextInput
              formik={formik}
              name="assignedTo"
              label="Assign To (Optional)"
              placeholder="Technician / Staff name"
            />
          </Grid>
        </Grid>

        {/* ================= INFO BOX ================= */}
        
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
            Save Issue
          </Button>
        </Stack>
      </CardActions>
    </form>
  );
}
