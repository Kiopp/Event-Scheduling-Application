import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

export default function StaticDateTimePickerLandscape({ value, onChange }) {
    const isValidValue = dayjs(value).isValid();
    const defaultValue = isValidValue ? value : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        orientation="landscape"
        value={defaultValue}
        onChange={onChange}
        ampm={false}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
