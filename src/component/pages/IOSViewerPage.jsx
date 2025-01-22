import React, { useState } from 'react';
import { Typography, Box, IconButton, Modal, Paper } from '@mui/material';
import { Fullscreen, Close } from '@mui/icons-material';
import SplitPane from 'react-split-pane';
import './splitpane.css'; // Import custom styles
import STLViewer from './STLViewer'; // Import STLViewer component
export default function IOSViewerPage({ selectedPatient }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  // Function to open modal with selected content
  const handleOpenModal = (content) => {
    setSelectedContent(content);
    setOpenModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedContent(null);
  };

  return (
    <>
    {selectedPatient ? (
      <SplitPane split="vertical" minSize={200} maxSize={-400} defaultSize="50%" className="SplitPane">
        {/* Dicom Viewer Pane */}
        <Box sx={{ padding: 1, backgroundColor: '#f1f3f5', flexGrow: 1, borderRadius: 1, position: 'relative' }}>
          <Typography sx={{ padding: 2 }}>Dicom Viewer content goes here.</Typography>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,  // Change from left: 8 to right: 8
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: 1,
              '&:hover': { backgroundColor: '#ddd' },
            }}
            onClick={() => handleOpenModal('Dicom Viewer')}
          >
            <Fullscreen />
          </IconButton>
        </Box>

        {/* STL Viewer Pane */}
        <Box sx={{ padding: 0, backgroundColor: '#f1f3f5', flexGrow: 1, borderRadius: 1, position: 'relative' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,  // Change from left: 8 to right: 8
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: 1,
              '&:hover': { backgroundColor: '#ddd' },
            }}
            onClick={() => handleOpenModal('STL Viewer')}
          >
            <Fullscreen />
          </IconButton>
          <STLViewer />
        </Box>
      </SplitPane>
      ) : (
        <Box sx={{ padding: 1 }}>
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          Please select a patient to view CBCT files.
        </Typography>
        </Box>
      )}

      {/* Fullscreen Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            width: '95%',
            height: '95%',
            position: 'relative',
            padding: 2,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: 1,
              '&:hover': { backgroundColor: '#ddd' },
            }}
            onClick={handleCloseModal}
          >
            <Close />
          </IconButton>
          {selectedContent === 'Dicom Viewer' && (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Render your Dicom Viewer content */}
      <Typography sx={{ padding: 2 }}>Dicom Viewer in Fullscreen</Typography>
    </Box>
  )}
  {selectedContent === 'STL Viewer' && (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Render the STL Viewer component */}
      <STLViewer />
    </Box>
  )}
        </Paper>
      </Modal>
    </>
  );
}
