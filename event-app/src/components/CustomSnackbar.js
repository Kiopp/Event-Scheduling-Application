import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const CustomSnackbar = ({ open, onClose, message }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const timeoutId = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [open, onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      left: 16,
      right: 16,
      backgroundColor: 'white',
      padding: 8,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s',
      borderRadius: 4,
      maxWidth: 400,
    }}>
      <Alert severity="error" onClose={() => setVisible(false)} sx={{
        padding: 0,
        margin: 0,
        backgroundColor: 'white',
        color: 'black',
        '& .MuiAlert-icon': {
          color: 'red',
        },
        '& .MuiAlert-icon svg': {
          fill: 'red',
        },
        '& .MuiAlert-message': {
          color: 'black',
        },
        '& .MuiAlert-action button': {
          color: 'black',
        },
        '& .MuiAlert-action button svg': {
          fill: 'black',
        },
      }}>
        {message}
      </Alert>
    </div>
  );
};

export default CustomSnackbar;