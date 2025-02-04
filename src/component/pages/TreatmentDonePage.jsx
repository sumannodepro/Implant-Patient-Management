import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

export default function TreatmentDonePage({ selectedPatient }) {
  return (
    <Box sx={{ padding: 1 }}>
      {selectedPatient ? (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8}>
          <Paper
        sx={{
          padding: 4,
          backgroundColor: '#f8f9fa'
        }}>
            <Typography variant="body1" color="textSecondary">
              (e.g. Treatment Details)
            </Typography>
            </Paper>
            {/* You can add more content for the left segment here */}
          </Grid>
          <Grid item xs={12} sm={4}>
          <Paper
        sx={{
          padding: 4,
          backgroundColor: '#f8f9fa'
        }}>
         <Typography variant="body1" color="textSecondary">
              (e.g. Patient History Info)
            </Typography>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          Please select a patient to view treatment finish.
        </Typography>
      )}
    </Box>
  );
}
