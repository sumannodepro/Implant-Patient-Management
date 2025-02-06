  import React, { useState } from 'react';
  import { Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material';
  import { CSVLink } from 'react-csv';
  import InvoicePage from './InvoicePage';
  export default function PaymentRecordsPage({ selectedPatient, selectedTreatments, paymentRecords }) {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const sortedRecords = [...(paymentRecords || [])].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    const filteredRecords = sortedRecords.filter(record =>
      record.invoiceDate.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const csvData = [
      ["Patient ID", "Patient Name", "Mobile Number", "Invoice Date", "Amount", "Due"],
      ...filteredRecords.map(record => [
        selectedPatient.patientID,
        selectedPatient.patientName,
        selectedPatient.mobileNumber,
        record.invoiceDate,
        record.amount,
        record.due
      ])
    ];

    return (
      <Box sx={{ padding: 1 }}>
        {selectedPatient ? (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
              <Paper sx={{ padding: 1, backgroundColor: '#f8f9fa' }}>
               <InvoicePage/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 0, backgroundColor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                  <TextField
                    label="Search Invoice"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CSVLink data={csvData} filename={`PaymentRecords_${selectedPatient.patientID}.csv`}>
                  <Button variant="contained" size="small" sx={{
                  backgroundColor: '#343a40',
                }}>Export CSV</Button>
                  </CSVLink>
                </Box>
                <TableContainer component={Paper}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell onClick={() => handleSort('invoiceDate')}><strong>Invoice/Date</strong></TableCell>
                        <TableCell onClick={() => handleSort('amount')}><strong>Amount</strong></TableCell>
                        <TableCell onClick={() => handleSort('due')}><strong>Due</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRecords.length > 0 ? (
                        filteredRecords.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.invoiceDate}</TableCell>
                            <TableCell>${record.amount}</TableCell>
                            <TableCell>${record.due}</TableCell>
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
                            No payment records available.
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
            Please select a patient to view payment/records.
          </Typography>
        )}
      </Box>
    );
  }
