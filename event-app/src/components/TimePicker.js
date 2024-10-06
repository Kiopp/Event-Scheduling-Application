import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { TextField, useMediaQuery } from '@mui/material';

export default function ResponsiveTimePicker({ value, onChange }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isValidValue = dayjs(value).isValid();
  const defaultValue = isValidValue ? value : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isDesktop ? (
        <DesktopTimePicker
          value={defaultValue}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
          ampm={false}
        />
      ) : (
        <MobileTimePicker
          value={defaultValue}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
          ampm={false}
        />
      )}
    </LocalizationProvider>
  );
}
