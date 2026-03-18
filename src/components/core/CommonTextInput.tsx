import React from 'react';
import { Stack, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { FormikProps } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import get from 'lodash/get'; // ✅ IMPORTANT

type InputTypes =
  | 'text'
  | 'password'
  | 'number'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'monthpicker';

type CommonTextInputProps<FormValues> = {
  formik: FormikProps<FormValues>;
  type?: InputTypes;
  name: string; // ✅ FIXED
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
} & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'>;

function CommonTextInput<FormValues>({
  formik,
  type,
  name,
  label,
  placeholder,
  fullWidth,
  ...rest
}: CommonTextInputProps<FormValues>) {

  const fieldName = name;

  // ✅ SAFE ACCESS (important for dynamic fields)
  const value = get(formik.values, fieldName);
  const error = get(formik.errors, fieldName);
  const touched = get(formik.touched, fieldName);

  return (
    <Stack sx={{ gap: 1 }}>
      <InputLabel htmlFor={fieldName}>{label}</InputLabel>

      {/* TIME PICKER */}
      {type === 'time' ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            ampm
            value={value ? new Date(value) : null}
            onChange={(newValue) =>
              formik.setFieldValue(
                fieldName,
                newValue ? newValue.toISOString() : ''
              )
            }
            slotProps={{
              textField: {
                fullWidth,
                size: 'small',
                error: Boolean(touched && error),
                helperText: touched && error,
              }
            }}
          />
        </LocalizationProvider>

      ) : type === 'date' ? (

        /* DATE PICKER */
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            format="dd/MM/yyyy"
            value={value ? new Date(value) : null}
            onChange={(newValue) =>
              formik.setFieldValue(
                fieldName,
                newValue
                  ? newValue.toISOString().split('T')[0]
                  : ''
              )
            }
            slotProps={{
              textField: {
                fullWidth,
                size: 'small',
                error: Boolean(touched && error),
                helperText: touched && error,
              }
            }}
          />
        </LocalizationProvider>

      ) : type === 'monthpicker' ? (

        /* MONTH PICKER */
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year', 'month']}
            openTo="month"
            format="MM/yyyy"
            value={value ? new Date(value) : null}
            onChange={(newValue) =>
              formik.setFieldValue(
                fieldName,
                newValue
                  ? new Date(
                      newValue.getFullYear(),
                      newValue.getMonth(),
                      1
                    ).toISOString()
                  : ''
              )
            }
            slotProps={{
              textField: {
                fullWidth,
                size: 'small',
                error: Boolean(touched && error),
                helperText: touched && error,
              }
            }}
          />
        </LocalizationProvider>

      ) : (

        /* NORMAL INPUT */
        <TextField
          id={fieldName}
          type={type || 'text'}
          name={fieldName}
          placeholder={placeholder || label}
          value={value ?? ''}
          onChange={(e) => {
            let val: any = e.target.value;

            if (type === 'number') {
              val = val === '' ? '' : Number(val);
            }

            formik.setFieldValue(fieldName, val);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(touched && error)}
          helperText={touched && error}
          fullWidth={fullWidth}
          size="small"
          variant="outlined"
          InputLabelProps={
            type === 'datetime-local' ? { shrink: true } : undefined
          }
          {...rest}
        />

      )}
    </Stack>
  );
}

export default CommonTextInput;