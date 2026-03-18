import Grid from "@mui/material/Grid";
import {
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  IconButton
} from "@mui/material";
import { FieldArray } from "formik";
import { Add, Trash } from "iconsax-reactjs";
import { useTheme } from "@mui/material/styles";

import CommonSelectInput from "components/core/CommonSelectInput";
import CommonTextInput from "components/core/CommonTextInput";
import CommonDesBox from "components/core/CommonDesBox";
import FileUpload from "components/core/FileUpload";
import SignatureModal from "components/modal/signature/SignatureModal";

const ledgerOptions = [
  { label: "Sales", value: "sales" },
  { label: "Purchase", value: "purchase" }
];

export default function Content({ formik }: any) {
  const theme = useTheme(); // 🔥 IMPORTANT

  return (
    <div>
      <Divider sx={{ mt: 2 }} />

      {/* SINGLE / MULTIPLE */}
      <Box sx={{ mt: 2 }}>
        <ToggleButtonGroup
          value={formik.values.mode}
          exclusive
          onChange={(e, val) => val && formik.setFieldValue("mode", val)}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              borderColor: theme.palette.primary.main
            },
            "& .MuiToggleButton-root.Mui-selected": {
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                bgcolor: theme.palette.primary.dark
              }
            }
          }}
        >
          <ToggleButton value="single">Single</ToggleButton>
          <ToggleButton value="multiple">Multiple</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* SINGLE MODE */}
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

      {/* MULTIPLE MODE */}
      {formik.values.mode === "multiple" && (
        <FieldArray name="LedgerRows">
          {({ push, remove }) => (
            <Box sx={{ mt: 2 }}>
              {/* HEADER */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "50px 1fr 200px 50px",
                  bgcolor: theme.palette.primary.main, // ✅ FIXED
                  color: theme.palette.primary.contrastText,
                  p: 1,
                  borderRadius: 1
                }}
              >
                <div>SL</div>
                <div>Ledger</div>
                <div>Amount</div>
                <div></div>
              </Box>

              {/* ROWS */}
              {formik.values.LedgerRows.map((row: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "50px 1fr 200px 50px",
                    gap: 1,
                    alignItems: "center",
                    borderBottom: "1px solid #eee",
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

                  <IconButton
                    sx={{ color: theme.palette.error.main }}
                    onClick={() => {
                      if (formik.values.LedgerRows.length > 1) {
                        remove(index);
                      }
                    }}
                  >
                    <Trash size={18} />
                  </IconButton>
                </Box>
              ))}

              {/* ADD BUTTON */}
              <Box sx={{ mt: 1 }}>
                <IconButton
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "#fff",
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark
                    }
                  }}
                  onClick={() => push({ ledger: "", amount: "" })}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>
          )}
        </FieldArray>
      )}

      {/* BOTTOM SECTION */}
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CommonDesBox
            name="narration"
            label="Narration"
            formik={formik}
            multiline
            rows={3}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FileUpload name="file" label="Upload File" />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
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