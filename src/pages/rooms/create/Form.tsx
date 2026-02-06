import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { useFormik } from 'formik';
import { roomSchema } from './schema';
import { CommonTextInput, CommonSelectInput } from 'components/core';
import { Eraser, SaveAdd } from 'iconsax-reactjs';
import { Stack } from '@mui/system';

export default function RoomForm() {
  const formik = useFormik({
    initialValues: {
      number: '',
      name: '',
      type: '',
      floor: '',
      status: 'Active'
    },
    validationSchema: roomSchema,
    onSubmit: (values) => console.log(values)
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput formik={formik} name="number" label="Room Number" />
            </Grid>
            <Grid size={{ xs: 12,md:6 }}>
              <CommonTextInput formik={formik} name="name" label="Room Name" />
            </Grid>
            <Grid size={{ xs: 12,md:6 }}>
              <CommonSelectInput
                formik={formik}
                name="type"
                label="Room Type"
                options={[
                  { label: 'Deluxe', value: 'deluxe' },
                  { label: 'Standard', value: 'standard' }
                ]}
              />
            </Grid>
            <Grid size={{ xs: 12 ,md:6}}>
              <CommonTextInput formik={formik} name="floor" label="Floor" />
            </Grid>
            <Grid size={{ xs: 12,md:6 }}>
              <CommonSelectInput
                formik={formik}
                name="status"
                label="Status"
                options={[
                  { label: 'Active', value: 'Active' },
                  { label: 'Inactive', value: 'Inactive' }
                ]}
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
