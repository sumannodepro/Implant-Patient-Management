import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import AddPatientModal from '../AddPatientModal';
import { listPatients } from '../../graphql/queries';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const ListOfPatients = ({ selectedPatient, setSelectedPatient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(listPatients, {
            filter: {
              or: [
                { patientName: { contains: searchQuery.trim() } },
                { patientID: { contains: searchQuery.trim() } },
                { mobileNumber: { contains: searchQuery.trim() } },
              ],
            },
          })
        );

        const results = response.data.listPatients.items;
        setPatients(results);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [searchQuery]);

  // Group patients by the first letter of their name
  const groupedPatients = patients.reduce((acc, patient) => {
    const firstLetter = patient.patientName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(patient);
    return acc;
  }, {});
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 1,
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#f8f9fa',
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
              borderRadius: 2,
              padding: '0px 8px',
              height: '36px',
              borderColor: '#e0e0e0',
              '&:hover': { borderColor: '#bdbdbd' },
              '&.Mui-focused': { borderColor: '#6c757d' },
            },
            '& .MuiOutlinedInput-input': {
              color: '#6c757d',
              fontSize: '14px',
              padding: '8px 0px',
            },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
          }}
        />
        {/* Add Patient Button */}
  <IconButton
    sx={{
      backgroundColor: '#6c757d',
      borderRadius: '15px',
      color: '#ffffff',
      padding: '6px',
      marginLeft: 1, // Adjust spacing
      height: '30px', // Match TextField height
      width: '30px',
      '&:hover': {
        backgroundColor: '#6c757d',
      },
    }}
    onClick={handleOpenModal} // Opens the modal
  >
    <AddIcon />
  </IconButton>
        {/* Add Patient Modal */}
        <AddPatientModal open={openModal} handleClose={handleCloseModal} />
      </Box>

      <List sx={{ marginTop: 2 }}>
        {Object.keys(groupedPatients)
          .sort()
          .map((letter) => (
            <React.Fragment key={letter}>
              {/* Group Letter Header */}
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#6c757d',
                  paddingLeft: 1,
                  marginTop: 1,
                }}
              >
                {letter}
              </Typography>
              {groupedPatients[letter].map((patient) => (
                <ListItem key={patient.patientID} disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedPatient(patient)}
                    selected={selectedPatient?.patientID === patient.patientID}
                    sx={{
                      borderRadius: 1,
                      color: '#343a40',
                      '&.Mui-selected': {
                        backgroundColor: '#a3a8ac',
                        '&:hover': { backgroundColor: '#a3a8ac' },
                      },
                      '&:hover': { backgroundColor: '#a3a8ac' },
                    }}
                  >
                    <PersonIcon sx={{ marginRight: 1, color: '#343a40' }} />
                    <ListItemText primary={patient.patientName} />
                  </ListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
      </List>
    </Paper>
  );
};

export default ListOfPatients;
