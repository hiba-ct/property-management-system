import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useFormik } from 'formik';
import { roomTypeSchema } from './schema';
import { CommonTextInput } from 'components/core';
import { SaveAdd, Eraser } from 'iconsax-reactjs';

export default function RoomTypeForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      description: '',
      price: ''
    },
    validationSchema: roomTypeSchema,
    onSubmit: (values) => {
      console.log('Room Type:', values);
    }
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput formik={formik} name="name" label="Room Type Name" />
            </Grid>

            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput formik={formik} name="code" label="Code" />
            </Grid>

            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput
                formik={formik}
                name="description"
                label="Description"
                multiline
                rows={3}
              />
            </Grid>

            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput
                formik={formik}
                name="price"
                label="Base Rate (₹)"
                type="number"
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

            <Button type="submit" variant="contained" startIcon={<SaveAdd />}>
              Save
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
