import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { TextField, useMediaQuery } from '@mui/material';

export default function ResponsiveDateTimePicker({ value, onChange }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isValidValue = dayjs(value).isValid();
  const defaultValue = isValidValue ? value : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isDesktop ? (
        <DesktopDateTimePicker
          value={defaultValue}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
          ampm={false}  // 24-hour format
        />
      ) : (
        <MobileDateTimePicker
          value={defaultValue}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
          ampm={false}  // 24-hour format
        />
      )}
    </LocalizationProvider>
  );
}