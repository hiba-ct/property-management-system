import * as Yup from 'yup';

export const ledgerSchema = Yup.object({

  ledgerName: Yup.string().required('Ledger Name is required'),

  parentLedger: Yup.string().required('Parent Ledger required'),

  accountGroup: Yup.string().required('Account Group required'),

  openingBalance: Yup.number().required('Opening balance required'),

  debitCredit: Yup.string().required('Select debit/credit'),

  date: Yup.string().required('Date required')

});