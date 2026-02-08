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
import { housekeepingSchema } from './schema';

import { Eraser, SaveAdd } from 'iconsax-reactjs';

export default function HousekeepingForm() {
  const formik = useFormik({
    initialValues: {
      roomNo: '',
      roomType: '',
      task: '',
      assignedTo: '',
      priority: '',
      dueDate: '',
      notes: ''
    },
    validationSchema: housekeepingSchema,
    onSubmit: (values) => {
      console.log('Housekeeping Task:', values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent>
       

        {/* ROOM INFO */}
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
         

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="roomNo"
                label="Room No"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTextInput
                formik={formik}
                name="roomType"
                label="Room Type"
              />
            </Grid>
          </Grid>
        </Box>

        {/* TASK DETAILS */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CommonTextInput
              formik={formik}
              name="task"
              label="Task Description"
              multiline
              rows={2}
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
            <CommonTextInput
              formik={formik}
              name="dueDate"
              label="Due Date"
              type="date"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CommonSelectInput
              formik={formik}
              name="assignedTo"
              label="Assign To"
              options={[
                { label: 'John Doe', value: 'John Doe' },
                { label: 'Jane Smith', value: 'Jane Smith' }
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CommonTextInput
              formik={formik}
              name="notes"
              label="Notes"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </CardContent>

      {/* ACTIONS */}
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
            Save Task
          </Button>
        </Stack>
      </CardActions>
    </form>
  );
}
