import React from 'react';
import { Stack, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { FormikProps } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type InputTypes = 'text' | 'password' | 'number' | 'date' | 'datetime-local';

type CommonTextInputProps<FormValues> = {
  formik: FormikProps<FormValues>;
  type?: InputTypes;
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  fullWidth?: boolean;
  [key: string]: any;
} & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'>;

function CommonDesBox<FormValues>({ formik, type, name, label , placeholder, fullWidth, ...rest }: CommonTextInputProps<FormValues>) {
  return (
    <Stack sx={{ gap: 0 }}>
      <InputLabel htmlFor={String(name)}>{label}</InputLabel>

      {type === 'date' ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={
              formik.values[name]
                ? new Date(formik.values[name] as any) // ✅ ensures Date type
                : null
            }
            onChange={(newValue) => formik.setFieldValue(name as string, newValue ? newValue.toISOString().split('T')[0] : '')}
            slotProps={{
              textField: {
                fullWidth,
                error: Boolean(formik.touched[name]) && Boolean(formik.errors[name]),
                helperText: formik.touched[name] && (formik.errors[name] as string),
                
              }
            }}
          />
        </LocalizationProvider>
      ) : (
        <TextField
          id={String(name)}
          type={type || 'text'}
          name={String(name)}
          placeholder={placeholder || label}
          value={formik.values[name] ?? ''}
          onChange={(e) => {
            let val: any = e.target.value;
            if (type === 'number') {
              val = val === '' ? '' : Number(val);
            }
            formik.setFieldValue(name as string, val);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched[name]) && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && (formik.errors[name] as string)}
          fullWidth={fullWidth}
          InputLabelProps={type === 'datetime-local' ? { shrink: true } : undefined}
          
          {...rest}
        />
      )}
    </Stack>
  );
}

export default CommonDesBox;
