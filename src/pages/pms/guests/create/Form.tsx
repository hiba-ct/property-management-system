import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { SaveAdd, Eraser } from 'iconsax-reactjs';
import { useFormik } from 'formik';

import { CommonTextInput, CommonSelectInput } from 'components/core';
import { guestSchema } from './schema';


export default function GuestForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      phone: '',
      email: '',
      idType: '',
      idNumber: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      postalCode: '',
      nationality: '',
      notes: ''
    },
    validationSchema: guestSchema,
    onSubmit: (values) => {
      console.log('Guest Data:', values);
    }
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="firstName" label="First Name" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="lastName" label="Last Name" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonSelectInput
                formik={formik}
                name="gender"
                label="Gender"
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' }
                ]}
              />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput
                formik={formik}
                name="dob"
                label="Date of Birth"
                type="date"
              />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="phone" label="Contact Number" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="email" label="Email Address" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonSelectInput
                formik={formik}
                name="idType"
                label="ID Proof Type"
                options={[
                  { label: 'Passport', value: 'passport' },
                  { label: 'Aadhar', value: 'aadhar' },
                  { label: 'Driving License', value: 'dl' }
                ]}
              />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="idNumber" label="ID Proof Number" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="address1" label="Address Line 1" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="address2" label="Address Line 2" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="city" label="City" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="country" label="Country" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="postalCode" label="Postal Code" />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <CommonTextInput formik={formik} name="nationality" label="Nationality" />
            </Grid>

            <Grid size={12}>
              <CommonTextInput
                formik={formik}
                name="notes"
                label="Special Notes / Preferences"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={2}>
            <Button color="error" startIcon={<Eraser />} onClick={() => formik.resetForm()}>
              Clear
            </Button>
            <Button variant="contained" type="submit" startIcon={<SaveAdd />}>
              Save Guest
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
