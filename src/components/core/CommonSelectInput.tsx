import React from "react";
import { Stack, InputLabel, TextField, Autocomplete } from "@mui/material";
import { FormikProps } from "formik";
import get from "lodash/get";

type OptionType = {
  label: string;
  value: any;
};

type Props<FormValues> = {
  formik: FormikProps<FormValues>;
  name: string; // ✅ FIXED
  label?: string;
  options: OptionType[];
  placeholder?: string;
  fullWidth?: boolean;
};

function CommonSelectInput<FormValues>({
  formik,
  name,
  label,
  options,
  placeholder,
  fullWidth
}: Props<FormValues>) {

  const fieldName = name;

  const value = get(formik.values, fieldName);
  const error = get(formik.errors, fieldName);
  const touched = get(formik.touched, fieldName);

  const selected =
    options.find((opt) => opt.value === value) || null;

  return (
    <Stack sx={{ gap: 1 }}>

      <InputLabel htmlFor={fieldName}>{label}</InputLabel>

      <Autocomplete
        fullWidth={fullWidth}
        size="small"
        options={options}
        value={selected}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          formik.setFieldValue(fieldName, newValue ? newValue.value : "");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder || label}
            error={Boolean(touched && error)}
            helperText={touched && error}
            size="small"
          />
        )}
      />
    </Stack>
  );
}

export default CommonSelectInput;