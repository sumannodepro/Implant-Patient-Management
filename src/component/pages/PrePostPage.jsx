import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

export default function PrePostPage({ selectedPatient }) {
  return (
    <Grid container spacing={1} sx={{ padding: 1 }}>
      {/* Pre Section */}
      <Grid item xs={12} md={6}>
        <Paper  sx={{
          padding: 2,
          backgroundColor: '#f8f9fa'
        }}>
          {selectedPatient ? (
            <Typography>Pre content goes here...</Typography>
          ) : (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
              Please select a patient to view pre.
            </Typography>
          )}
        </Paper>
      </Grid>

      {/* Post Section */}
      <Grid item xs={12} md={6}>
        <Paper sx={{
          padding: 2,
          backgroundColor: '#f8f9fa'
        }}>
          {selectedPatient ? (
            <Typography>Post content goes here...</Typography>
          ) : (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
              Please select a patient to view post.
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
