import React, { useState } from 'react';
import { Typography, Box, IconButton, Modal, Paper } from '@mui/material';
import { Fullscreen, Close } from '@mui/icons-material';
import SplitPane from 'react-split-pane';
import './splitpane.css'; // Import custom styles


export default function IOSViewerPage({ selectedPatient }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activePane, setActivePane] = useState(null); // 'dicom' or 'stl'

  const toggleFullScreen = (pane) => {
    setActivePane(pane);
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {selectedPatient ? (
        <SplitPane
          split="vertical"
          minSize={200}
          maxSize={-400}
          defaultSize="50%"
          className="SplitPane"
          style={isFullScreen ? { height: '100vh' } : {}}
        >
          {/* Dicom Viewer Pane */}
          <Box
            sx={{
              padding: 0,
              backgroundColor: '#f1f3f5',
              flexGrow: 1,
              borderRadius: 1,
              position: 'relative',
              height: isFullScreen && activePane === 'dicom' ? '100vh' : 'auto',
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
              onClick={() => toggleFullScreen('dicom')}
            >
              {isFullScreen && activePane === 'dicom' ? <Close /> : <Fullscreen />}
            </IconButton>
            
          </Box>

          {/* STL Viewer Pane */}
          <Box
            sx={{
              padding: 0,
              backgroundColor: '#f1f3f5',
              flexGrow: 1,
              borderRadius: 1,
              position: 'relative',
              height: isFullScreen && activePane === 'stl' ? '100vh' : 'auto',
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
              onClick={() => toggleFullScreen('stl')}
            >
              {isFullScreen && activePane === 'stl' ? <Close /> : <Fullscreen />}
            </IconButton>
            
          </Box>
        </SplitPane>
      ) : (
        <Box sx={{ padding: 1 }}>
          <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
            Please select a patient to view CBCT files.
          </Typography>
        </Box>
      )}
    </>
  );
}
