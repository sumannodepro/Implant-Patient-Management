import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Modal,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CSVLink } from 'react-csv';
export default function ComplaintPage({
  chiefComplaints,
  setChiefComplaints,
  findings,
  setFindings,
  diagnosis,
  setDiagnosis,
  selectedPatient,
  chiefRecords,
}) {
  const [mode, setMode] = useState('text');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentEntry, setCurrentEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const sortedRecords = [...(chiefRecords || [])].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    const filteredRecords = sortedRecords.filter(record =>
      record.chiefComplaints.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const csvData = [
    ["Patient ID", "Patient Name", "Mobile Number", "Chief Complaints","Findings","Dianosis", "Date"],
    ...filteredRecords.map(record => [
      selectedPatient.patientID,
      selectedPatient.patientName,
      selectedPatient.mobileNumber,
      record.chiefComplaints,
      record.findings,
      record.diagnosis,
      record.date,
    ])
  ];

  const handleToggle = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };
const handleRemoveFile = (fileName) => {
  setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
};
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleOpen = (title, initialEntries) => {
    setModalTitle(title);
    setEntries([...initialEntries]); // Pre-fill modal with existing entries
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEntry('');
  };

  const handleAddEntry = () => {
    if (currentEntry.trim() !== '') {
      setEntries((prev) => [...prev, currentEntry.trim()]);
      setCurrentEntry('');
    }
  };

  const handleRemoveEntry = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDone = () => {
    if (modalTitle === 'Chief Complaint') setChiefComplaints([...entries]);
    if (modalTitle === 'Findings') setFindings([...entries]);
    if (modalTitle === 'Diagnosis') setDiagnosis([...entries]);
    setOpen(false);
    setCurrentEntry('');
  };

  const renderSegment = (title, data, onAdd) => (
    <Grid item xs={12} md={3}>
      <Paper
        sx={{
          padding: 2,
          backgroundColor: '#f8f9fa',
         
        }}
      >
        <Typography variant="h6" sx={{ color: '#343a40' }}>
          {title}
        </Typography>
        <List>
          {data.length > 0 ? (
            data.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              {`${title} content goes here...`}
            </Typography>
          )}
        </List>
        <Button
          variant="contained"
          onClick={onAdd}
          sx={{
            backgroundColor: '#343a40',
            color: '#f8f9fa',
            '&:hover': {
              backgroundColor: '#23272b',
            },
          }}
        >
          Add
        </Button>
      </Paper>
    </Grid>
  );
  return (
    <Box sx={{ padding: 1 }}>
      {selectedPatient ? (
        <>
          <Grid container spacing={1}>
            {/* Left Segment - Displays either Text Mode or Upload Mode */}
            <Grid item xs={12} md={3} >
            <Box display="flex" justifyContent="flex-start" mb={1}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={handleToggle}
              aria-label="mode selection"
              size="small" // Reduce the size of the ToggleButtonGroup
              sx={{
                marginTop: '-8px',
                '& .MuiToggleButton-root': {
                  fontSize: '0.75rem', // Smaller font size
                  padding: '4px 8px', // Reduce padding
                  minWidth: '70px', // Reduce button width
                  backgroundColor: '#343a40', // Background color
                  color: '#f8f9fa', // Text color
                  transition: 'background-color 0.3s ease', // Smooth transition effect

                  '&:hover': {
                  backgroundColor: '#495057', // Slightly lighter color on hover
                  },  
                  '&.Mui-selected': {
                    backgroundColor: '#7f8c8d', // Darker color when selected
                    color: '#f8f9fa', // Ensure text remains visible
                    '&:hover': {
                      backgroundColor: '#5f6a6a', // Darker hover effect for selected state
                    },
                  },
                },
              }}>
              <ToggleButton value="text" aria-label="Text Mode">
                Text Mode
              </ToggleButton>
              <ToggleButton value="upload" aria-label="Upload Mode">
                Image Mode
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
              {mode === 'text' ? (
                <Grid container spacing={1} direction="column">
                  {renderSegment('Chief Complaint', chiefComplaints, () =>
                    handleOpen('Chief Complaint', chiefComplaints)
                  )}
                  {renderSegment('Findings', findings, () =>
                    handleOpen('Findings', findings)
                  )}
                  {renderSegment('Diagnosis', diagnosis, () =>
                    handleOpen('Diagnosis', diagnosis)
                  )}
                </Grid>
              ) : (
                <Paper
                  sx={{
                    padding: 2,
                    backgroundColor: '#f8f9fa',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ backgroundColor: '#343a40', color: '#f8f9fa' }}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <Box mt={2}>
                    {uploadedFiles.length > 0 && (
                      <Grid container spacing={2}>
                        {uploadedFiles.map((file, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box sx={{ position: 'relative' }}>
                              {file.type.startsWith('image/') ? (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 4,
                                  }}
                                />
                              ) : (
                                <Typography variant="body2" color="textSecondary">
                                  {file.name} (PDF)
                                </Typography>
                              )}
                              <IconButton
                                size="small"
                                onClick={() => handleRemoveFile(file.name)}
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  backgroundColor: 'white',
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                </Paper>
              )}
            </Grid>
  
            {/* Right Segment - Placeholder for Future Data */}
            <Grid item xs={12} md={9}>
              <Paper
                sx={{
                  padding: 0,
                  backgroundColor: '#f8f9fa',
                }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                  <TextField
                    label="Search Chief Complaint"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CSVLink data={csvData} filename={`ChiefRecords_${selectedPatient.patientID}.csv`}>
                    <Button variant="contained" size="small" sx={{
                  backgroundColor: '#343a40',
                }}>Export CSV</Button>
                  </CSVLink>
                </Box>
                <TableContainer component={Paper}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell onClick={() => handleSort('date')}><strong>Date</strong></TableCell>
                        <TableCell onClick={() => handleSort('chiefComplaint')}><strong>Chief Complaint</strong></TableCell>
                        <TableCell onClick={() => handleSort('findings')}><strong>Findings</strong></TableCell>
                        <TableCell onClick={() => handleSort('diagnosis')}><strong>Diagnosis</strong></TableCell>
                        
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
                          <TableCell colSpan={5} align="center">
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
        </>
      ) : (
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          Please select a patient to view details.
        </Typography>
      )}
  
      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {modalTitle}
            </Typography>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
  
          <List
            sx={{
              maxHeight: 150,
              overflowY: 'auto',
              marginBottom: 2,
              border: '1px solid #ddd',
              borderRadius: 1,
              padding: 1,
            }}
          >
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleRemoveEntry(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemText primary={`• ${entry}`} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ padding: 1 }}>
                No entries added yet.
              </Typography>
            )}
          </List>
  
          <TextField
            label={`Enter ${modalTitle}`}
            fullWidth
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
  
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              onClick={handleAddEntry}
              sx={{
                textTransform: 'none',
                backgroundColor: '#343a40',
                color: '#f8f9fa',
                '&:hover': {
                  backgroundColor: '#23272b',
                },
              }}
            >
              Add
            </Button>
            <Button
              variant="contained"
              onClick={handleDone}
              sx={{
                backgroundColor: '#343a40',
                color: '#f8f9fa',
                '&:hover': {
                  backgroundColor: '#23272b',
                },
              }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );  
}
