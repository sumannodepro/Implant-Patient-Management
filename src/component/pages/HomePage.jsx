import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const appointments = [
  { id: 1, time: '09:00 AM', patient: 'John Doe', treatment: 'Dental Cleaning',mobile: '9944896292' },
  { id: 2, time: '10:00 AM', patient: 'Jane Smith', treatment: 'Tooth Extraction',mobile: '9944896292' },
  // Add more appointments here
];

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date()); // State for selected date

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Update events based on the selected date
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Paper  sx={{
      padding: 4,
      backgroundColor: '#f8f9fa',
      borderRadius: 3,
    }}>
            <Typography variant="h6" sx={{ color: '#343a40', marginBottom: 2 }}>
              Calendar
            </Typography>
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileClassName="calendar-tile" // Optional, for styling tiles
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
        <Paper  sx={{padding: 4,backgroundColor: '#f8f9fa',borderRadius: 3,}}>
            <Typography variant="h6" sx={{color: '#343a40', marginBottom: 2 }}>
              Today's Appointments
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell>Treatment</TableCell>
                    <TableCell>Mobile No</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.patient}</TableCell>
                      <TableCell>{appointment.treatment}</TableCell>
                      <TableCell>{appointment.mobile}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
