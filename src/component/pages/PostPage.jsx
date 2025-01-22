import React from 'react'
import { Typography,Box } from '@mui/material';

export default function PostPage({ selectedPatient }) {
  return (
    <Box sx={{ padding: 1 }}>
    {selectedPatient ? (
    <Typography>Post content goes here...</Typography>
    ) : (
   
    <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
      Please select a patient to view post.
    </Typography>
  )}
  </Box>
  )
};
