import React from "react";
import Grid from "@mui/material/Grid";
import CommonSelectInput from "components/core/CommonSelectInput";
import CommonTextInput from "components/core/CommonTextInput";

interface IHeaderForm {
  type: string;
  formik: any;
  mode?: "cash" | "bank"; // ✅ optional
}

/* OPTIONS */
const cashOptions = [
  { label: "Cash Account", value: "cash1" }
];

const bankOptions = [
  { label: "SBI Bank", value: "sbi" }
];

const staffOptions = [
  { label: "Accountant", value: "accountant" }
];
const voucherdebitcredit = [
  { label: 'Debit', value: 'debit' },
  { label: 'Credit', value: 'credit' }
];


const Header: React.FC<IHeaderForm> = ({ type, formik, mode }) => {
  const isPayment = type === "PY" || type === "PR";

  return (
    <Grid container spacing={1} alignItems="center">

      {/* COMMON */}
      <Grid size={{ xs: 12, md: 3 }}>
        <CommonTextInput
          name="voucherno"
          label="Voucher No"
          formik={formik}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <CommonTextInput
          name="date"
          label="Date"
          type="date"
          formik={formik}
        />
      </Grid>

      {/* 🔥 PAYMENT / RECEIPT MODE */}
      {isPayment && mode === "cash" && (
        <Grid size={{ xs: 12, md: 3 }}>
          <CommonSelectInput
            label={type === "PR"|| type === "PY"  ? "Cash Account" : "Cash Account"}
            name="cashaccount"
            formik={formik}
            options={cashOptions}
          />
        </Grid>
      )}

      {isPayment && mode === "bank" && (
        <Grid size={{ xs: 12, md: 3 }}>
          <CommonSelectInput
            label={type === "PR" || type === "PY" ?  "Bank Account" : "Bank Account"}
            name="bankaccount"
            formik={formik}
            options={bankOptions}
          />
        </Grid>
      )}

  {(type === "DN" || type === "CN" || type === "JV") && (
        <Grid size={{ xs: 12, lg: 6 }}>
          <CommonSelectInput
            label="Party Account"
            name="partyaccount"
            formik={formik}
            options={staffOptions}
          />
        </Grid>
      )}

      {type === "JV" &&
       <Grid size={{ xs: 12, lg: 3 }}>
              <CommonSelectInput
                label="Debit / Credit"
                name="debitcredit"
                formik={formik}
                options={voucherdebitcredit}
                placeholder="Select..."
              />
            </Grid>
            }
      {/* REF */}
      <Grid size={{ xs: 12, lg: 3 }}>
        <CommonTextInput name="refno" label="Ref No" formik={formik} />
      </Grid>

      <Grid size={{ xs: 12, lg: 3 }}>
        <CommonTextInput
          name="refdate"
          label="Ref Date"
          type="date"
          formik={formik}
        />
      </Grid>

    

        {/* STAFF */}
      <Grid size={{ xs: 12, lg: 3 }}>
        <CommonSelectInput
          label="Billing Staff"
          name="billingstaff"
          formik={formik}
          options={staffOptions}
        />
      </Grid>


    </Grid>
  );
};

export default Header;