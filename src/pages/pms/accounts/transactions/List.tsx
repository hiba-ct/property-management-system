import CommonTable2 from "components/core/CommonTable2";
import { useState } from "react";

export default function List(){

  const [data,setData] = useState([
    {id:1,voucherno:"001",ledger:"Sales",amount:2000},
    {id:2,voucherno:"002",ledger:"Purchase",amount:1500}
  ]);

  const columns = [
    {header:"#",accessorKey:"id"},
    {header:"Voucher No",accessorKey:"voucherno"},
    {header:"Ledger",accessorKey:"ledger"},
    {header:"Amount",accessorKey:"amount"}
  ];

  return(
    <CommonTable2
      data={data}
      setData={setData}
      columns={columns}
      filename="payments.csv"
    />
  )
}