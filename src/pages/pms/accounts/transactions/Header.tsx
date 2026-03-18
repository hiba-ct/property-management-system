import Grid from "@mui/material/Grid";
import CommonTextInput from "components/core/CommonTextInput";
import CommonSelectInput from "components/core/CommonSelectInput";

const cashOptions = [
  { label: "Cash Account", value: "cash" }
];

export default function Header({ formik }: any) {

  return (
    <Grid container spacing={1}>

      <Grid size={{ xs: 12, md: 4 }}>
        <CommonTextInput formik={formik} name="voucherno" label="Voucher No" />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <CommonTextInput type="date" formik={formik} name="date" label="Date" />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <CommonSelectInput
          formik={formik}
          name="cashaccount"
          label="Cash Account"
          options={cashOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <CommonTextInput formik={formik} name="refno" label="Ref No" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <CommonTextInput type="date" formik={formik} name="refdate" label="Ref Date" />
      </Grid>

    </Grid>
  );
}