import { TextField, MenuItem } from '@mui/material';
import { FormikProps, getIn } from 'formik';

interface Option {
  label: string;
  value: string | number;
}

interface CommonSelectInputProps {
  formik: FormikProps<any>;
  name: string;
  label: string;
  options: Option[];
}

export default function CommonSelectInput({
  formik,
  name,
  label,
  options
}: CommonSelectInputProps) {
  const errorText =
    getIn(formik.touched, name) && getIn(formik.errors, name)
      ? String(getIn(formik.errors, name))
      : '';

  return (
    <TextField
      select
      fullWidth
      label={label}
      name={name}
      value={getIn(formik.values, name)}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={Boolean(errorText)}
      helperText={errorText}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
