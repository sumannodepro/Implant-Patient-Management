import React from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Avatar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function DemographyPage({ selectedPatient }) {
  const handleView = (patient) => {
    console.log('Viewing patient:', patient);
    // Add your logic here, e.g., navigate to a detailed patient page or open a modal
  };
  
  return (
    <Box sx={{ padding: 1 }}>
      {selectedPatient ? (
        <Grid container spacing={1}>
          {/* Left Column: Patient Details */}
          <Grid item xs={12} sm={6} lg={4}>
  <Paper
    sx={{
      padding: 4,
      backgroundColor: '#f8f9fa',
      borderRadius: 3,
    }}>
    <Grid container spacing={1} alignItems="center">
      {/* Avatar Section */}
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto',
            backgroundColor: '#343a40',
            color: '#ffffff',
            fontSize: '2rem',
          }}
        >
          {selectedPatient.patientName ? selectedPatient.patientName[0] : 'P'}
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            marginTop: 2,
            fontWeight: 'bold',
            color: '#343a40',
          }}
        >
          {selectedPatient.patientName || 'N/A'}
        </Typography>
      </Grid>

      {/* Patient Details */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Patient ID */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              ID: {selectedPatient.patientID || 'N/A'}
            </Typography>
          </Grid>

          {/* Mobile Number */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Mobile: {selectedPatient.mobileNumber || 'N/A'}
            </Typography>
          </Grid>

          {/* Email Address */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Email Address: {selectedPatient.emailId || 'N/A'}
            </Typography>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Address: {selectedPatient.address || 'N/A'}
            </Typography>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              DOB: {selectedPatient.dateOfBirth || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Age: {selectedPatient.age || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Blood Group: {selectedPatient.bloodGroup || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Gender: {selectedPatient.gender || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Appointment Button */}
      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#343a40',
            '&:hover': { backgroundColor: '#495057' },
          }}
        >
          Appointment
        </Button>
      </Grid>
    </Grid>
  </Paper>
</Grid>



          {/* Right Column: Patient History */}
          <Grid item xs={12} sm={6} lg={8}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, color: '#343a40',backgroundColor: '#f8f9fa' }} aria-label="patient history table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Patient Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Mobile Number</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Appointment Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Example row, can be updated later with real history data */}
                    <TableRow>
                      <TableCell>{selectedPatient.patientName}</TableCell>
                      <TableCell>{selectedPatient.age}</TableCell>
                      <TableCell>{selectedPatient.mobileNumber}</TableCell>
                      <TableCell>{'N/A'}</TableCell>
                      <TableCell><IconButton size="small" onClick={() => handleView(selectedPatient)} color="primary">
                      <VisibilityIcon sx={{ color: '#343a40' }}/>
                      </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
           
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          Please select a patient to view details.
        </Typography>
      )}
    </Box>
  );
}
