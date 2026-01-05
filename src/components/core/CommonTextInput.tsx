import React from 'react';
import { Stack, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { FormikProps } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';

type InputTypes = 'text' | 'password' | 'number' | 'date' | 'datetime-local' | 'time' | 'monthpicker' ;

type CommonTextInputProps<FormValues> = {
  formik: FormikProps<FormValues>;
  type?: InputTypes;
  name: keyof FormValues & string ;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  [key: string]: any;
  
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
  const fieldName = String(name);

  return (
    <Stack sx={{ gap: 1 }}>
      <InputLabel htmlFor={fieldName}>{label}</InputLabel>

      

{type === 'time' ? (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <TimePicker
      ampm                              // 👈 shows AM/PM
      value={
        formik.values[name]
          ? new Date(formik.values[name] as any)
          : null
      }
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
          error: Boolean(formik.touched[name]) && Boolean(formik.errors[name]),
          helperText: formik.touched[name] && (formik.errors[name] as string),
          sx: {
            '& .MuiOutlinedInput-input': { padding: '8px 12px' },
            '& .MuiIconButton-root': { padding: 4, marginLeft: -2 },
            '& .MuiInputAdornment-root': { maxWidth: '23px' },
          }
        }
      }}
    />
  </LocalizationProvider>
) : type === 'date' ? (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      format="dd/MM/yyyy"
      value={
        formik.values[name]
          ? new Date(formik.values[name] as any)
          : null
      }
      onChange={(newValue) =>
        formik.setFieldValue(
          fieldName,
          newValue ? newValue.toISOString().split('T')[0] : ''
        )
      }
      slotProps={{
        textField: {
          fullWidth,
          size: 'small',
          error: Boolean(formik.touched[name]) && Boolean(formik.errors[name]),
          helperText: formik.touched[name] && (formik.errors[name] as string),
          sx: {
            '& .MuiOutlinedInput-input': { padding: '8px 12px' },
            '& .MuiIconButton-root': { padding: 4, marginLeft: -2 },
            '& .MuiInputAdornment-root': { maxWidth: '23px' },
          }
        }
      }}
    />
  </LocalizationProvider>
      ) :
      type === 'monthpicker' ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year', 'month']}
            openTo="month"
            format="MM/yyyy"
            value={
              formik.values[name]
                ? new Date(formik.values[name] as any)
                : null
            }
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
                error: Boolean(formik.touched[name]) && Boolean(formik.errors[name]),
                helperText: formik.touched[name] && (formik.errors[name] as string),
                sx: {
                  '& .MuiOutlinedInput-input': { padding: '8px 12px' },
                  '& .MuiIconButton-root': { padding: 4, marginLeft: -2 },
                  '& .MuiInputAdornment-root': { maxWidth: '23px' },
                },
              },
            }}
          />
        </LocalizationProvider>
      ) : (
        <TextField
          id={fieldName}
          type={type || 'text'}
          name={fieldName}
          placeholder={placeholder || label}
          value={formik.values[name] ?? ''}
          onChange={(e) => {
            let val: any = e.target.value;
            if (type === 'number') {
              val = val === '' ? '' : Number(val);
            }
            formik.setFieldValue(fieldName, val);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched[name]) && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && (formik.errors[name] as string)}
          fullWidth={fullWidth}
          size="small"                 // 👈 matches ~40px height
          variant="outlined"
          InputLabelProps={type === 'datetime-local' ? { shrink: true } : undefined}
          // No need to force height here; size="small" handles it
          {...rest}
        />
      )}
    </Stack>
  );
}

export default CommonTextInput;
