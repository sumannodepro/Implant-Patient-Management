import React, { useState } from 'react';
import { Typography, Box, Grid, Paper, Tabs, Tab, TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, } from '@mui/material';
import { CSVLink } from 'react-csv';
export default function TreatmentDonePage({ selectedPatient, selectedTreatments, treatmentRecords }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const sortedRecords = [...(treatmentRecords || [])].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    const filteredRecords = sortedRecords.filter(record =>
      record.treatmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const csvData = [
      ["Patient ID", "Patient Name", "Mobile Number", "Treatment Name", "Date"],
      ...filteredRecords.map(record => [
        selectedPatient.patientID,
        selectedPatient.patientName,
        selectedPatient.mobileNumber,
        record.treatmentName,
        record.date,
      ])
    ];
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  return (
    <Box sx={{ padding: 1 }}>
      {selectedPatient ? (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8}>
            <Paper sx={{ padding: 2, backgroundColor: '#f8f9fa' }}>
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
            <Paper sx={{ padding: 0, backgroundColor: '#f8f9fa' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                  <TextField
                    label="Search Treatment"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CSVLink data={csvData} filename={`TreatmentRecords_${selectedPatient.patientID}.csv`}>
                  <Button variant="contained" size="small" sx={{
                  backgroundColor: '#343a40',
                }}>Export CSV</Button>
                  </CSVLink>
                </Box>
                <TableContainer component={Paper}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell onClick={() => handleSort('treatmentName')}><strong>Treatment Name</strong></TableCell>
                        <TableCell onClick={() => handleSort('date')}><strong>Date</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRecords.length > 0 ? (
                        filteredRecords.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.treatmentName}</TableCell>
                            <TableCell>${record.date}</TableCell>
                            <TableCell>
                              <Button variant="contained" size="small" color="primary">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            No treatment records available.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
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
