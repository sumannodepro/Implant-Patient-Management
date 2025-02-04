import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Modal, IconButton, TextField, Button } from '@mui/material';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

const localizer = momentLocalizer(moment);

export default function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSlotSelect = (slotInfo) => {
    setSelectedDate(dayjs(slotInfo.start));  // Use dayjs for consistency
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
    setSelectedPatient(null);
    setComplaint('');
    setSearchQuery('');  // Reset the search query
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  // Simulating a list of patients (this could come from your database)
  const patients = [
    { patientID: '1', patientName: 'John Doe' },
    { patientID: '2', patientName: 'Jane Smith' },
    { patientID: '3', patientName: 'Michael Johnson' },
    { patientID: '4', patientName: 'Emily Davis' },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const events = [
    {
      title: 'Dental Checkup - John Doe',
      start: new Date(2025, 1, 5, 10, 0), // Feb 5, 10:00 AM
      end: new Date(2025, 1, 5, 11, 0),   // Feb 5, 11:00 AM
    },
    {
      title: 'Root Canal - Jane Smith',
      start: new Date(2025, 1, 6, 14, 0), // Feb 6, 2:00 PM
      end: new Date(2025, 1, 6, 15, 30),  // Feb 6, 3:30 PM
    },
  ];

  return (
    <Box sx={{ padding: 1 }}>
      <Grid container spacing={1}>
        {/* Right Panel: Full Calendar */}
        <Grid item xs={12} md={12}>
          <Paper sx={{ padding: 2, backgroundColor: '#f8f9fa', height: '100vh' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '95vh' }}
              views={{ month: true, week: true, day: true }}
              defaultView={Views.WEEK}
              step={30}
              timeslots={1}
              selectable
              min={new Date(2025, 1, 5, 7, 0)}
              max={new Date(2025, 1, 5, 18, 0)}
              onSelectSlot={handleSlotSelect}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: '#a3a8ac',
                  color: '#343a40',
                  borderRadius: '5px',
                  border: 'none',
                  padding: '5px',
                },
              })}
            />
          </Paper>
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Appointment</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Complaint Input */}
          <TextField
            fullWidth
            label="Enter Complaint"
            variant="outlined"
            size="medium"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Display Selected Date & Time */}
          <TextField
            fullWidth
            label="Selected Date and Time"
            variant="outlined"
            size="medium"
            value={selectedDate ? selectedDate.format('YYYY-MM-DD HH:mm') : ''}
            InputProps={{
              readOnly: true,
            }}
            sx={{ marginBottom: 2 }}
          />

          {/* Patient Search */}
          <TextField
            fullWidth
            label="Search for Patient"
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2 }}
          />

          {/* Display Filtered Patients */}
          <Box sx={{ marginBottom: 2 }}>
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <Button
                  key={patient.patientID}
                  variant="outlined"
                  fullWidth
                  onClick={() => handleSelectPatient(patient)}
                  sx={{ marginBottom: 1 }}
                >
                  {patient.patientName}
                </Button>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: '#6c757d' }}>
                No patients found.
              </Typography>
            )}
          </Box>

          {/* Display Selected Patient */}
          {selectedPatient ? (
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1">Selected Patient: {selectedPatient.patientName}</Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ marginBottom: 2, color: '#6c757d' }}>
              Please select a patient.
            </Typography>
          )}

          {/* Confirm Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClose}
            sx={{
              marginTop: 2,
              backgroundColor: '#343a40',
              '&:hover': { backgroundColor: '#495057' },
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
