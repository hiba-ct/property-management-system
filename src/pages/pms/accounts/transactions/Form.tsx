import { useFormik, FormikProvider } from "formik";
import { useEffect, useState } from "react";
import {
  CardContent,
  CardActions,
  Stack,
  Button,
  Tabs,
  Tab,
  Box
} from "@mui/material";
import { Eraser, SaveAdd, Wallet, Bank } from "iconsax-reactjs";

import Header from "./Header";
import Content from "./Content";
import { initialValues } from "./helper";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  type: string;
}

export default function Form() {
  const { type } = useOutletContext<OutletContext>();

  // ✅ MODE ONLY FOR PAYMENT / RECEIPT
  const isPaymentOrReceipt = type === "PY" || type === "PR";

  const [mode, setMode] = useState<"cash" | "bank">("cash");

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("DATA 👉", { ...values, mode, type });
    }
  });

  const handleChange = (event: any, newValue: any) => {
    setMode(newValue);
    formik.resetForm();
  };
 

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>

          {/* 🔥 SHOW ONLY FOR PAYMENT / RECEIPT */}
          {isPaymentOrReceipt && (
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs value={mode} onChange={handleChange}>
                <Tab
                  icon={<Wallet size={18} />}
                  iconPosition="start"
                  label={type === "PR" ? "Cash Receipt" : "Cash Payment"}
                  value="cash"
                />
                <Tab
                  icon={<Bank size={18} />}
                  iconPosition="start"
                  label={type === "PY"  ? "Bank Payment" : "Bank Receipt"}
                  value="bank"
                />
              </Tabs>
            </Box>
          )}

          {/* HEADER */}
          <Header
            formik={formik}
            type={type}
            mode={isPaymentOrReceipt ? mode : undefined}
          />

          {/* CONTENT */}
          <Content formik={formik} type={type} />

        </CardContent>

        <CardActions>
          <Stack direction="row" justifyContent="center" spacing={1} width={1}>
            <Button
              color="error"
              onClick={() => formik.resetForm()}
              startIcon={<Eraser />}
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
    </FormikProvider>
  );
}