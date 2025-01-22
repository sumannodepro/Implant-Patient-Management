import React from 'react'
import { Typography,Box } from '@mui/material';

export default function PrePage({ selectedPatient }) {
  return (
    <Box sx={{ padding: 1 }}>
    {selectedPatient ? (
    <Typography>Pre content goes here...</Typography>
    ) : (
   
    <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
      Please select a patient to view pre.
    </Typography>
  )}
  </Box>
  )
};
