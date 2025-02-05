import React, { useState } from 'react';
import { Typography, Box, Grid, Paper, Tabs, Tab, TextField } from '@mui/material';

export default function TreatmentDonePage({ selectedPatient, selectedTreatments, setSelectedTreatments }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ padding: 1 }}>
      {selectedPatient ? (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8}>
            <Paper sx={{ padding: 0, backgroundColor: '#f8f9fa' }}>
              {selectedTreatments.length > 0 ? (
                <>
                  <Tabs value={tabIndex} onChange={handleChange} variant="scrollable"  scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
            backgroundColor: '#6c757d',},}}>
                    {selectedTreatments.map((treatment, index) => (
                      <Tab key={index} sx={{'&.Mui-selected': {color: '#343a40',},}} label={
                        <>
                          {treatment.treatmentName || "Unknown"} <Typography variant="body2" sx={{ fontWeight: "bold" }}>₹ {treatment.price !== undefined ? treatment.price : "N/A"}</Typography>
                        </>
                      } />
                    ))}
                  </Tabs>
                  {selectedTreatments.map((treatment, index) => (
                    tabIndex === index && (
                      <Box key={index} sx={{ padding: 2 }}>
                        <TextField
                          multiline
                          fullWidth
                          rows={18}
                          variant="outlined"
                          placeholder="Add notes..."
                        />
                      </Box>
                    )
                  ))}
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No treatments selected.
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 2, backgroundColor: '#f8f9fa' }}>
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
