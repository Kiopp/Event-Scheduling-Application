import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // allows date and time pickers to use the dayjs
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { TextField, useMediaQuery } from '@mui/material';

export default function ResponsiveTimePicker({ value, onChange }) {
  const isDesktop = useMediaQuery('(min-width: 768px)'); // chekcs screen width
  const isValidValue = dayjs(value).isValid();
  const defaultValue = isValidValue ? value : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isDesktop ? (
        // if screen is bigger than 768 pixels render the desktop time picker
        <DesktopTimePicker
          value={defaultValue} // The current selected time
          onChange={onChange} // Callback when the time changes
          renderInput={(params) => <TextField {...params} />}
          ampm={false} // 24-hour format
        />
      ) : (
        // if screen is 768 pixels or smaller render the mobile time picker
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
