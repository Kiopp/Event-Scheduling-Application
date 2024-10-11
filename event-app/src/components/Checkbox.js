import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CustomCheckbox({ checked, onChange, label }) {
  return (
    <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked} // saves bollean value of checkbox
            onChange={onChange} // hanndle change to the checkbox
            // overrides mui values to change color
            sx={{
              color: 'blue',
              '&.Mui-checked': {
                color: 'blue',
              },
                '&.Mui-checked svg': {
                  fill: 'lightblue',
              },
            }}
          />
        }
        label={label}
        labelPlacement="top"
      />
    </FormGroup>
  );
}
