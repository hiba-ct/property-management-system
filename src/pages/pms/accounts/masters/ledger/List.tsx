import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button, CardContent, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';


import CommonTextInput from 'components/core/CommonTextInput';
import CommonSelectInput from 'components/core/CommonSelectInput';
import CommonTransactionTable from 'components/core/CommonTransactionTable';

/* ================= TYPES ================= */

interface LedgerRow {
  SlNo: number;
  LedgerID: number;
  LedgerName: string;
  Address: string;
  Phone: string;
  AccGroupName: string;
  OpeningBalance: number;
  OBDate?: string;
}

/* ================= DEMO DATA ================= */

const initialData: LedgerRow[] = [
  {
    SlNo: 1,
    LedgerID: 1,
    LedgerName: 'Bank Account',
    Address: '',
    Phone: '',
    AccGroupName: '55',
    OpeningBalance: 0,
    OBDate: ''
  },
  {
    SlNo: 2,
    LedgerID: 2,
    LedgerName: 'Cash Account',
    Address: '',
    Phone: '',
    AccGroupName: '54',
    OpeningBalance: 0,
    OBDate: '10/17/2024'
  }
];

/* ================= TABLE COLUMNS ================= */

const columns: ColumnDef<LedgerRow>[] = [
  { header: 'SL NO', accessorKey: 'SlNo' },
  { header: 'LEDGER NAME', accessorKey: 'LedgerName' },
  { header: 'ADDRESS', accessorKey: 'Address' },
  { header: 'PHONE', accessorKey: 'Phone' },
  { header: 'ACC GROUP', accessorKey: 'AccGroupName' },
  { header: 'OPENING BALANCE', accessorKey: 'OpeningBalance' },
  { header: 'OB DATE', accessorKey: 'OBDate' }
];

/* ================= COMPONENT ================= */

export default function LedgerList() {

  const navigate = useNavigate();
  const [rows, setRows] = useState(initialData);

  /* ================= ACCOUNT GROUP OPTIONS ================= */

  const AccountGroup = [
    { label: 'All', value: '' },
    { label: 'Assets', value: 'assets' },
    { label: 'Revenue', value: 'revenue' },
    { label: 'Expenses', value: 'expenses' }
  ];

  /* ================= SEARCH FORM ================= */

  const formik = useFormik({
    initialValues: {
      ledgerName: '',
      accountgroup: ''
    },
    onSubmit: (values) => {
      console.log('Search filters:', values);
    }
  });

  /* ================= ACTION HANDLERS ================= */

  const handleEdit = (row: LedgerRow) => {
    console.log('Edit ledger', row);
    navigate(`/pms/accounts/masters/ledger/edit/${row.LedgerID}`);
  };

  const handleDelete = (row: LedgerRow) => {
    console.log('Delete ledger', row);
    setRows(prev => prev.filter(r => r.LedgerID !== row.LedgerID));
  };

  /* ================= UI ================= */

  return (
    <>
      {/* FILTER SECTION */}

      <CardContent sx={{ pb: 1 }}>
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} alignItems="center">

  <Grid size={{ xs: 12, md: 3 }}>
    <CommonTextInput
      formik={formik}
      name="ledgerName"
      label="Ledger Name"
    />
  </Grid>

  <Grid  size={{ xs: 12, md: 3 }}>
    <CommonSelectInput
      formik={formik}
      name="accountgroup"
      label="Account Group"
      options={AccountGroup}
      placeholder="Select..."
    />
  </Grid>

  <Grid size={{ xs: 12, md: 2 }}>
    <Stack sx={{ mt: 3 }}>
      <Button variant="contained" type="submit">
        Search
      </Button>
    </Stack>
  </Grid>

</Grid>
        </form>
      </CardContent>

      <Divider />

      {/* TABLE */}

      <CardContent sx={{ py: 0 }}>
        <CommonTransactionTable
          data={rows}
          setData={setRows}
          columns={columns}
          filename="ledger-list.csv"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </>
  );
}