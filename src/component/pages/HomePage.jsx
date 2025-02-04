import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const appointments = [
  { id: 1, time: '09:00 AM', patient: 'John Doe', treatment: 'Dental Cleaning', mobile: '9944896292' },
  { id: 2, time: '10:00 AM', patient: 'Jane Smith', treatment: 'Tooth Extraction', mobile: '9944896292' },
  { id: 3, time: '11:00 AM', patient: 'Alex Johnson', treatment: 'Teeth Whitening', mobile: '8888888888' },
  { id: 4, time: '12:00 PM', patient: 'Emily Davis', treatment: 'Root Canal', mobile: '7777777777' },
  { id: 5, time: '12:00 PM', patient: 'Davis', treatment: 'Root Canal', mobile: '7777777777' },
  // Add more appointments here
];

export default function HomePage() {
  const [date, setDate] = useState(dayjs()); // Initialize with a dayjs object
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.mobile.includes(searchTerm)
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Edit appointment with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete appointment with ID: ${id}`);
  };
  const handleDateChange = (newDate) => {
    setDate(newDate); // Ensure newDate is a dayjs object
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              padding: 4,
              backgroundColor: '#f8f9fa'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Typography variant="h6" sx={{ color: '#343a40' }}>
                Calendar
              </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={date}
                onChange={handleDateChange}
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        {/* Today's Appointments Section */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ padding: 4, backgroundColor: '#f8f9fa'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Typography variant="h6" sx={{ color: '#343a40' }}>
                Today's Appointments
              </Typography>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                sx={{ width: '250px' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Box>
            {/* Table Container */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell>Treatment</TableCell>
                    <TableCell>Mobile No</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAppointments
                    .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                    .map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.patient}</TableCell>
                        <TableCell>{appointment.treatment}</TableCell>
                        <TableCell>{appointment.mobile}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleEdit(appointment.id)}>
                            <Edit/>
                          </IconButton>
                          <IconButton onClick={() => handleDelete(appointment.id)}>
                            <Delete color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={filteredAppointments.length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
