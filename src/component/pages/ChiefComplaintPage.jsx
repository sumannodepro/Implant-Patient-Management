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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ComplaintPage({
  chiefComplaints,
  setChiefComplaints,
  findings,
  setFindings,
  diagnosis,
  setDiagnosis,
  selectedPatient
}) {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentEntry, setCurrentEntry] = useState('');
  const [entries, setEntries] = useState([]);

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
    <Grid item xs={12} md={4}>
      <Paper
        sx={{
          padding: 4,
          backgroundColor: '#f8f9fa',
          borderRadius: 3,
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
      <Grid container spacing={1}>
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
  <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
    Please select a patient to view chief complaint.
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
            sx={{ marginBottom: 2 }}/>

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
