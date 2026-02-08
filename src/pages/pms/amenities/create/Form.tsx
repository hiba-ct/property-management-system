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
import { amenitySchema } from './schema';

import { Eraser, SaveAdd } from 'iconsax-reactjs';

export default function AmenityForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      description: '',
      status: 'active'
    },
    validationSchema: amenitySchema,
    onSubmit: (values) => {
      console.log('Amenity Data:', values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent>
       

        {/* FORM */}
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
                name="name"
                label="Amenity Name"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonSelectInput
                formik={formik}
                name="category"
                label="Category"
                options={[
                  { label: 'Technology', value: 'Technology' },
                  { label: 'Comfort', value: 'Comfort' },
                  { label: 'Recreation', value: 'Recreation' },
                  { label: 'Safety', value: 'Safety' }
                ]}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
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
                name="status"
                label="Status"
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' }
                ]}
              />
            </Grid>
          </Grid>
        </Box>
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
            Save Amenity
          </Button>
        </Stack>
      </CardActions>
    </form>
  );
}
