import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // allows date and time pickers to use the dayjs
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useMediaQuery } from '@mui/material';
import { TextField } from '@mui/material';

export default function ResponsiveDatePicker({ value, onChange }) {
  const isDesktop = useMediaQuery('(min-width: 768px)'); // chekcs screen width
  const isValidValue = dayjs(value).isValid();
  const defaultValue = isValidValue ? value : null;

  if (isDesktop) {
    // if screen is bigger than 768 pixels render the desktop date picker
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={defaultValue} // The current selected date
          onChange={onChange} // Callback when the date changes
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  } else {
    // if screen is 768 pixels or smaller render the mobile date picker
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