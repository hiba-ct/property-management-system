import React from "react";
import { Stack, InputLabel, TextField, Autocomplete } from "@mui/material";
import { FormikProps } from "formik";

type OptionType = {
  label: string;
  value: any;
};

type Props<FormValues> = {
  formik: FormikProps<FormValues>;
  name: keyof FormValues & string;
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

  const fieldName = String(name);

  const selected =
    options.find((opt) => opt.value === formik.values[name]) || null;

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
            error={Boolean(formik.touched[name]) && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && (formik.errors[name] as string)}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 38,                 // ✅ same height as text input
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px 12px",        // ✅ same padding
              }
            }}
          />
        )}
      />
    </Stack>
  );
}

export default CommonSelectInput;