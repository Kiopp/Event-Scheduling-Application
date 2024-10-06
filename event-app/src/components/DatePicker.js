import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useMediaQuery } from '@mui/material';
import { TextField } from '@mui/material';

export default function ResponsiveDatePicker({ value, onChange }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isValidValue = dayjs(value).isValid();
  const defaultValue = isValidValue ? value : null;

  if (isDesktop) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={defaultValue}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  } else {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          value={defaultValue}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }
}