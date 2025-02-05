import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Modal, IconButton, TextField, Button,Popper,MenuItem } from '@mui/material';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { API, graphqlOperation } from 'aws-amplify';
import { listPatients } from '../../graphql/queries';

const localizer = momentLocalizer(moment);

export default function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [anchorElq, setAnchorElq] = useState(null);  // Anchor for the Popper
  
  useEffect(() => {
    setCurrentDate(new Date()); // Update currentDate on mount
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setOpenEventModal(true);
  };
  
  const handleSlotSelect = (slotInfo) => {
    setSelectedDate(dayjs(slotInfo.start));  // Use dayjs for consistency
    setOpenAppointmentModal(true);
  };

  const handleClose = () => {
    setOpenAppointmentModal(false);
    setOpenEventModal(false);
    setSelectedDate(null);
    setSelectedPatient(null);
    setComplaint('');
    setSearchQuery('');  // Reset the search query
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
  
    try {
      const response = await API.graphql(
        graphqlOperation(listPatients, {
          filter: {
            or: [
              { patientName: { contains: query.trim() } },
              { patientID: { contains: query.trim() } },
              { mobileNumber: { contains: query.trim() } },
            ],
          },
        })
      );
  
      const results = response.data.listPatients.items;
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  const handleSearchFocus = (event) => {
    setAnchorElq(event.target);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery(patient.patientName); // Optionally show the selected patient's name in the search box
    setSearchResults([]);  // Clear search results after selection
    setAnchorElq(null); 
  };
  

  // Simulating a list of patients (this could come from your database)

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
              onSelectEvent={handleEventSelect}
              // Disable past dates entirely
              min={new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 7, 0)} // Clinic working hours start at 7:00 AM
              max={new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0)} // Clinic working hours end at 6:00 PM
              // Disable past times for the current day, making sure only future slots are selectable
              onSelectSlot={(slotInfo) => {
                if (slotInfo.start < new Date()) {
                  return; // Do nothing if it's a past date
                }
                handleSlotSelect(slotInfo);
              }}
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

      {/* Appointment Modal */}
      <Modal open={openAppointmentModal} onClose={handleClose}>
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
    
    {/* Display Selected Date */}
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
      onChange={handleSearchChange}  // Trigger GraphQL search
      onFocus={handleSearchFocus}
      sx={{ marginBottom: 2 }}
    />

    {/* Popper for displaying search results */}
    <Popper
      open={Boolean(anchorElq) && searchResults.length > 0}  // Show only when results exist
      anchorEl={anchorElq}  // Anchor to the TextField
      placement="bottom-start"  // Position below TextField
      sx={{
        marginTop: '8px',
        zIndex: 2000,
      }}
    >
      <Paper
        sx={{
          maxHeight: 200,
          overflowY: 'auto',
          width: anchorElq ? `${anchorElq.offsetWidth}px` : 'auto',
          boxShadow: 3,
          backgroundColor: '#fff',
          borderRadius: 1,
        }}
      >
        {searchResults.map((patient) => (
          <MenuItem key={patient.patientID} onClick={() => handleSelectPatient(patient)}>
            {patient.patientName}
          </MenuItem>
        ))}
      </Paper>
    </Popper>

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


      {/* Event Modal */}
      <Modal open={openEventModal} onClose={handleClose}>
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
            <Typography variant="h6">Event Details</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Display Event Title */}
          {selectedEvent && (
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1"><strong>Title:</strong> {selectedEvent.title}</Typography>
              <Typography variant="body1"><strong>Start:</strong> {selectedEvent.start.toLocaleString()}</Typography>
              <Typography variant="body1"><strong>End:</strong> {selectedEvent.end.toLocaleString()}</Typography>
            </Box>
          )}

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
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
