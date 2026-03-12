import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import CommonTransactionTable from 'components/core/CommonTransactionTable';
import {  useNavigate } from 'react-router';

interface BankAccount {
  id: number;
  accountName: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  branch: string;
  upi: string;
  remarks: string;
}

const columns: ColumnDef<BankAccount>[] = [
  { header: 'Account Name', accessorKey: 'accountName' },
  { header: 'Bank Name', accessorKey: 'bankName' },
  { header: 'Account No', accessorKey: 'accountNo' },
  { header: 'IFSC', accessorKey: 'ifsc' },
  { header: 'Branch', accessorKey: 'branch' },
  { header: 'UPI No / ID', accessorKey: 'upi' },
  { header: 'Remarks', accessorKey: 'remarks' }
];

export default function BankAccountList() {
     const navigate = useNavigate();

  const [rows, setRows] = useState<BankAccount[]>([
    {
      id: 1,
      accountName: 'Business Account',
      bankName: 'HDFC Bank',
      accountNo: '1234567890',
      ifsc: 'HDFC0001234',
      branch: 'Chennai Main',
      upi: 'business@hdfcbank',
        remarks: 'Primary business account'
    },
    {
      id: 2,
      accountName: 'Personal Savings',
      bankName: 'SBI',
      accountNo: '9876543210',
      ifsc: 'SBIN0004567',
      branch: 'Bangalore MG Road',
      upi: 'me@sbi',
        remarks: 'My personal savings account'
    }
  ]);

  const handleEdit = (row: BankAccount) => {
    navigate(`/accounts/masters/bankaccount/edit/${row.id}`);
  };

  const handleDelete = (row: BankAccount) => {
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  return (
    <CommonTransactionTable
      data={rows}
      setData={setRows}
      columns={columns}
      filename="bank-accounts.csv"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
