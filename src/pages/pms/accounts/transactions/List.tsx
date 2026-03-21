import CommonTable2 from "components/core/CommonTable2";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

/* ================= TYPES ================= */
type TransactionType =
  | "PY" | "PR"

  | "DN" | "CN"
  | "JV";

/* ================= COLUMN CONFIG ================= */

const columnConfig: Record<TransactionType, any[]> = {

  PY: [
    { header: '#', accessorKey: 'id' },
  { header: 'Voucher No', accessorKey: 'voucherno' },
  { header: 'Date', accessorKey: 'date' },
  { header: 'Cash Account', accessorKey: 'cashaccount' },
  { header: 'Ref. No', accessorKey: 'Ref. No' },
  { header: 'Ref. Date', accessorKey: 'rdate' },
  { header: 'Billing Staff', accessorKey: 'billingstaf' },
  { header: 'Ledger', accessorKey: 'ledger' },
  { header: 'Narration', accessorKey: 'narration' },
  { header: 'Amount', accessorKey: 'amount' },
  ],

  PR: [
    { header: '#', accessorKey: 'id' },
    { header: 'Voucher No', accessorKey: 'voucherno' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Bank Account', accessorKey: 'bankaccount' },
    { header: 'Ref. No', accessorKey: 'Ref. No' },
    { header: 'Ref. Date', accessorKey: 'rdate' },
    { header: 'Billing Staff', accessorKey: 'billingstaf' },
    { header: 'Ledger', accessorKey: 'ledger' },
    { header: 'Narration', accessorKey: 'narration' },
    { header: 'Amount', accessorKey: 'amount' },
  ],


  DN: [
    { header: '#', accessorKey: 'id' },
    { header: 'Voucher No', accessorKey: 'voucherno' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Party Account', accessorKey: 'partyaccount' },
    { header: 'Ref. No', accessorKey: 'Ref. No' },
    { header: 'Ref. Date', accessorKey: 'rdate' },
    { header: 'Billing Staff', accessorKey: 'billingstaf' },
    { header: 'Ledger', accessorKey: 'ledger' },
    { header: 'Narration', accessorKey: 'narration' },
    { header: 'Amount', accessorKey: 'amount' },
  ],
  CN: [
    { header: '#', accessorKey: 'id' },
    { header: 'Voucher No', accessorKey: 'voucherno' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Party Account', accessorKey: 'partyaccount' },
    { header: 'Ref. No', accessorKey: 'Ref. No' },
    { header: 'Ref. Date', accessorKey: 'rdate' },
    { header: 'Billing Staff', accessorKey: 'billingstaf' },
    { header: 'Ledger', accessorKey: 'ledger' },
    { header: 'Narration', accessorKey: 'narration' },
    { header: 'Amount', accessorKey: 'amount' },
  ],
  JV: [
    { header: '#', accessorKey: 'id' },
    { header: 'Voucher No', accessorKey: 'voucherno' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Party Account', accessorKey: 'partyaccount' },
    { header: 'Debit/Credit', accessorKey: 'debitcredit' },
    { header: 'Ref. No', accessorKey: 'Ref. No' },
    { header: 'Ref. Date', accessorKey: 'rdate' },
    { header: 'Billing Staff', accessorKey: 'billingstaf' },
    { header: 'Ledger', accessorKey: 'ledger' },
    { header: 'Narration', accessorKey: 'narration' },
    { header: 'Amount', accessorKey: 'amount' },
  ],
  

};

/* ================= COMPONENT ================= */

export default function List() {
  const { type } = useParams<{ type: TransactionType }>();

  const [data, setData] = useState([
    {
      id: 1,
      voucherno: "001",
      cashaccount: "Cash A",
      bankaccount: "SBI",
      partyaccount: "Customer A",
      debitcredit: "Debit",
      ledger: "Sales",
      amount: 2000
    },
    {
      id: 2,
      voucherno: "002",
      cashaccount: "Cash B",
      bankaccount: "HDFC",
      partyaccount: "Customer B",
      debitcredit: "Credit",
      ledger: "Purchase",
      amount: 1500
    }
  ]);

  const columns = useMemo(() => {
    return type && columnConfig[type] ? columnConfig[type] : [];
  }, [type]);

  if (!type || !columnConfig[type]) {
    return <p>Invalid Type</p>;
  }

  return (
    <CommonTable2
      data={data}
      setData={setData}
      columns={columns}
      filename={`${type}-list.csv`}
    />
  );
}