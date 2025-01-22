import React from 'react'
import { Typography, Box } from '@mui/material';

export default function PaymentRecordsPage({ selectedPatient }) {
  return (
    <Box sx={{ padding: 1 }}>
    {selectedPatient ? (
    <Typography>Payment/Records content goes here...</Typography>
    ) : (
   
    <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
      Please select a patient to view payment/records.
    </Typography>
  )}
  </Box>
  )
};
