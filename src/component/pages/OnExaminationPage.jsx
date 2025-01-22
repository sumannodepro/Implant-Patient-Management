import React from 'react';
import { Typography, Box } from '@mui/material';

export default function OnExaminationPage({ selectedPatient }){
  return (
    <Box sx={{ padding: 1 }}>
    {selectedPatient ? (
    <Typography>OnExaminationPage content goes here...</Typography>
    ) : (
   
    <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
      Please select a patient to view case photos.
    </Typography>
  )}
  </Box>
  );
};