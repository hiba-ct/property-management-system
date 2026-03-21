import Grid from "@mui/material/Grid";
import {
  Box,
  Divider,
  Tabs,
  Tab,
  IconButton
} from "@mui/material";
import { FieldArray } from "formik";
import {
  Add,
  Trash,
  DocumentText,
  Chart
} from "iconsax-reactjs";
import { useTheme } from "@mui/material/styles";

import CommonSelectInput from "components/core/CommonSelectInput";
import CommonTextInput from "components/core/CommonTextInput";
import CommonDesBox from "components/core/CommonDesBox";
import FileUpload from "components/core/FileUpload";
import SignatureModal from "components/modal/signature/SignatureModal";

/* OPTIONS */
const ledgerOptions = [
  { label: "Sales", value: "sales" },
  { label: "Purchase", value: "purchase" }
];

export default function Content({ formik }: any) {
  const theme = useTheme();

  return (
    <div>

      <Divider sx={{ mt: 2 }} />

      {/* 🔥 SINGLE / MULTIPLE WITH ICON */}
      <Box sx={{ mt: 2, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={formik.values.mode}
          onChange={(e, val) => {
            formik.setFieldValue("mode", val);

            if (val === "single") {
              formik.setFieldValue("LedgerRows", [
                { ledger: "", amount: "" }
              ]);
            }
          }}
        >
          <Tab
            icon={<DocumentText size={18} />}
            iconPosition="start"
            label="Single"
            value="single"
          />
          <Tab
            icon={<Chart size={18} />}
            iconPosition="start"
            label="Multiple"
            value="multiple"
          />
        </Tabs>
      </Box>

      {/* ===== SINGLE ===== */}
      {formik.values.mode === "single" && (
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <CommonSelectInput
              label="Ledger"
              name="ledger"
              formik={formik}
              options={ledgerOptions}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CommonTextInput
              label="Amount"
              name="amount"
              formik={formik}
              type="number"
            />
          </Grid>
        </Grid>
      )}

      {/* ===== MULTIPLE ===== */}
      {formik.values.mode === "multiple" && (
        <FieldArray name="LedgerRows">
          {({ push, remove }) => (
            <Box sx={{ mt: 2 }}>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "50px 1fr 200px 50px",
                  bgcolor: theme.palette.primary.main,
                  color: "#fff",
                  p: 1,
                  borderRadius: 1
                }}
              >
                <div>SL</div>
                <div>Ledger</div>
                <div>Amount</div>
                <div></div>
              </Box>

              {formik.values.LedgerRows.map((row: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "50px 1fr 200px 50px",
                    gap: 1,
                    p: 1
                  }}
                >
                  <div>{index + 1}</div>

                  <CommonSelectInput
                    name={`LedgerRows.${index}.ledger`}
                    formik={formik}
                    options={ledgerOptions}
                  />

                  <CommonTextInput
                    name={`LedgerRows.${index}.amount`}
                    formik={formik}
                    type="number"
                  />

                  <IconButton onClick={() => remove(index)}>
                    <Trash size={18} />
                  </IconButton>
                </Box>
              ))}

              <IconButton onClick={() => push({ ledger: "", amount: "" })}>
                <Add />
              </IconButton>

            </Box>
          )}
        </FieldArray>
      )}

      {/* ===== FOOTER ===== */}
      <Grid container spacing={1} sx={{ mt: 2 }}>

        <Grid size={{ xs: 12, lg: 6 }}>
          <CommonDesBox name="narration" label="Narration" formik={formik}multiline rows={3} />
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <FileUpload name="file" label="Upload File" />
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <SignatureModal
            value={formik.values.signatureImage}
            onChange={(val) =>
              formik.setFieldValue("signatureImage", val)
            }
          />
        </Grid>

      </Grid>

    </div>
  );
}