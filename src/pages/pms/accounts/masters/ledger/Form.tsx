import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useFormik } from 'formik';

import { SaveAdd, Eraser } from 'iconsax-reactjs';

import CommonTextInput from 'components/core/CommonTextInput';
import CommonSelectInput from 'components/core/CommonSelectInput';
import CommonDesBox from 'components/core/CommonDesBox';

import { ledgerSchema } from './schema';

/* ================= OPTIONS ================= */

const parentLedgerOptions = [
  { label: 'Cash Account', value: 'cash' },
  { label: 'Bank Account', value: 'bank' }
];

const accountGroupOptions = [
  { label: 'Assets', value: 'assets' },
  { label: 'Liabilities', value: 'liabilities' },
  { label: 'Income', value: 'income' },
  { label: 'Expenses', value: 'expenses' }
];

/* ================= COMPONENT ================= */

export default function Form() {

  const formik = useFormik({

    initialValues: {
      name: '',
      parentLedger: '',
      accountGroup: '',
      openingBalance: '',
      remarks: ''
    },

    validationSchema: ledgerSchema,

    onSubmit: (values) => {
      console.log("Ledger Data:", values);
    }

  });

  return (

    <Card >

      {/* HEADER */}

     
      <form onSubmit={formik.handleSubmit}>

        <CardContent>

          <Grid container spacing={2}>

            {/* NAME */}

            <Grid size={{ xs: 12 }}>
              <CommonTextInput
                formik={formik}
                name="name"
                label="Name"
              />
            </Grid>

            {/* PARENT LEDGER */}

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonSelectInput
                formik={formik}
                name="parentLedger"
                label="Parent Ledger"
                options={parentLedgerOptions}
                placeholder="Select..."
              />
            </Grid>

            {/* ACCOUNT GROUP */}

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonSelectInput
                formik={formik}
                name="accountGroup"
                label="Account Group"
                options={accountGroupOptions}
                placeholder="Select..."
              />
            </Grid>

            {/* OPENING BALANCE */}

            <Grid size={{ xs: 12 }}>
              <CommonTextInput
                formik={formik}
                name="openingBalance"
                label="Opening Balance"
                type="number"
              />
            </Grid>

            {/* REMARKS */}

            <Grid size={{ xs: 12 }}>
              <CommonDesBox
                formik={formik}
                  multiline
                name="remarks"
                label="Remarks"
                rows={4}
              />
            </Grid>

          </Grid>

        </CardContent>

        {/* ACTION BUTTONS */}

        <CardActions sx={{ justifyContent: 'center', pb: 3 }}>

          <Stack direction="row" spacing={2}>

            <Button
              color="error"
              variant="outlined"
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