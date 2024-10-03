import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CustomCheckbox({ checked, onChange }) {
  return (
    <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            sx={{
              color: 'blue',
              '&.Mui-checked': {
                color: 'blue',
              },
            }}
          />
        }
        label="Single Day Event"
        labelPlacement="top"
      />
    </FormGroup>
  );
}