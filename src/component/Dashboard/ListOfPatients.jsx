import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField'; // Import TextField for search
import AddPatientModal from '../AddPatientModal'; // Make sure to import the modal component

const ListOfPatients = ({ selectedPatient, setSelectedPatient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);

  // Open the modal
  const handleOpenModal = () => {
    console.log('Opening Modal...');
    setOpenModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const patients = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Diabetes' },
    { id: 2, name: 'Jane Smith', age: 37, condition: 'Hypertension' },
    { id: 3, name: 'Alice Johnson', age: 29, condition: 'Asthma' },
  ];

  // Filter patients based on search query
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 1,
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#6c757d',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search Patients"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2, // Rounded corners
              padding: '0px 8px', // Minimal padding for compactness
              height: '36px', // Reduce the height of the input
              borderColor: '#e0e0e0', // Subtle border color
              '&:hover': {
                borderColor: '#bdbdbd', // Slightly darker border on hover
              },
              '&.Mui-focused': {
                borderColor: '#6c757d', // Highlight border when focused
              },
            },
            '& .MuiOutlinedInput-input': {
              color: '#6c757d',
              fontSize: '14px', // Compact font size
              padding: '8px 0px', // Inner padding for text alignment
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0', // Outline color
            },
          }}
        />

        {/* Add Patient Modal */}
        <AddPatientModal open={openModal} onClose={handleCloseModal} />
      </Box>

      <List sx={{ marginTop: 2 }}>
        {filteredPatients.map((patient) => (
          <ListItem key={patient.id} disablePadding>
            <ListItemButton
              onClick={() => setSelectedPatient(patient)}
              selected={selectedPatient?.id === patient.id}
              sx={{
                borderRadius: 1,
                color: '#ffffff',
                '&.Mui-selected': {
                  backgroundColor: '#5a6268',
                  '&:hover': {
                    backgroundColor: '#495057',
                  },
                },
                '&:hover': {
                  backgroundColor: '#6c757d',
                },
              }}
            >
              <PersonIcon sx={{ marginRight: 1, color: '#ffffff' }} />
              <ListItemText primary={patient.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ListOfPatients;