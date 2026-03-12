import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SaveAdd, Eraser } from 'iconsax-reactjs';

// project imports
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import CommonTextInput from 'components/core/CommonTextInput';
import CommonDesBox from 'components/core/CommonDesBox';
import { validationSchemaUserType } from './schema';

export default function BankAccountForm() {
 

  const formik = useFormik({
    initialValues: {
      accountName: '',
      bankName: '',
      accountNo: '',
      ifsc: '',
      branch: '',
      upiId: '',
      remarks: ''
    },
    validationSchema:validationSchemaUserType,
    onSubmit: (values, { resetForm }) => {
      console.log('Bank Account Saved:', values);
      openSnackbar({
        open: true,
        message: 'Bank Account details saved successfully',
        variant: 'alert',
        alert: { color: 'success' }
      } as SnackbarProps);
      resetForm();
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <CardContent sx={{ p: 1 }}>
          <Grid container spacing={1} sx={{ alignItems: 'center' }}>
            {/* Account Name */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <CommonTextInput formik={formik} name="accountName" label="Account Name" />
            </Grid>

            {/* Bank Name */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <CommonTextInput formik={formik} name="bankName" label="Bank Name" />
            </Grid>

            {/* Account No */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <CommonTextInput
                formik={formik}
                name="accountNo"
                label="Account No"
                type="number"
              />
            </Grid>

            {/* IFSC */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <CommonTextInput formik={formik} name="ifsc" label="IFSC" />
            </Grid>

            {/* Branch */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <CommonTextInput formik={formik} name="branch" label="Branch" />
            </Grid>

            {/* UPI No / ID */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <CommonTextInput formik={formik} name="upiId" label="UPI No / ID" />
            </Grid>

            {/* Remarks */}
            <Grid size={{ xs: 12 }}>
              <CommonDesBox formik={formik} name="remarks" label="Remarks" multiline rows={4} />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ pt: 0 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, justifyContent: 'center', width: 1, px: 1.5, py: 0.75 }}
          >
            <Button
              color="error"
              type="reset"
              onClick={() => formik.resetForm()}
              startIcon={<Eraser />}
              size="small"
            >
              Clear
            </Button>
            <Button
              variant="contained"
              type="submit"
              startIcon={<SaveAdd />}
              size="small"
            >
              Save
            </Button>
          </Stack>
        </CardActions>
      </form>
    </>
  );
}
