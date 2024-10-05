import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

export default function StaticTimePickerLandscape({ value, onChange }) {
    const isValidValue = dayjs(value).isValid();
    const defaultValue = isValidValue ? value : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticTimePicker
        orientation="landscape"
        ampm={false}
        value={defaultValue}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}