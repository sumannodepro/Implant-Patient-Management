import React, { useEffect, useRef, useState } from 'react';
import {Box,Button} from '@mui/material';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const DicomViewer = () => {
  const dicomContainerRef = useRef(null);
  const [dicomFiles, setDicomFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  

  const loadDicomSlice = (index) => {
    if (index < 0 || index >= dicomFiles.length) return;

    const file = dicomFiles[index];
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

    cornerstone
      .loadImage(imageId)
      .then((image) => {
        cornerstone.displayImage(dicomContainerRef.current, image);
        applyZoom();
      })
      .catch((error) => {
        console.error(`Error loading DICOM slice ${index}:`, error);
      });
  };

  const handleDicomFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    const dicomFiles = files.filter((file) => file.name.endsWith('.dcm'));

    if (dicomFiles.length > 0) {
      setDicomFiles(dicomFiles);
      setCurrentIndex(0);
      categorizeSlicesByOrientation(dicomFiles);
    } else {
      alert('Please select valid DICOM files.');
    }
  };

  const categorizeSlicesByOrientation = (files) => {
    const categorizedSlices = {
      AXIAL: [],
      SAGITTAL: [],
      CORONAL: [],
    };

    files.forEach((file, index) => {
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      cornerstone
        .loadImage(imageId)
        .then((image) => {
          const metadata = image.data;
          const orientation = metadata?.x00200037?.Value || metadata?.x00080008?.Value;

          if (orientation) {
            if (orientation.includes('AXIAL')) {
              categorizedSlices.AXIAL.push(index);
            } else if (orientation.includes('SAGITTAL')) {
              categorizedSlices.SAGITTAL.push(index);
            } else if (orientation.includes('CORONAL')) {
              categorizedSlices.CORONAL.push(index);
            }
          }
        })
        .catch((error) => {
          console.error('Error categorizing slice:', error);
        });
    });

    setCategorizedSlices(categorizedSlices);
  };

  const applyZoom = () => {
    if (dicomContainerRef.current) {
      const viewport = cornerstone.getViewport(dicomContainerRef.current);
      viewport.scale = scale;
      cornerstone.setViewport(dicomContainerRef.current, viewport);
      cornerstone.updateImage(dicomContainerRef.current);
    }
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, dicomFiles.length - 1));
    } else {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  useEffect(() => {
    if (dicomFiles.length > 0) {
      loadDicomSlice(currentIndex);
    }
  }, [currentIndex, dicomFiles, scale]);

  useEffect(() => {
    if (dicomContainerRef.current) {
      cornerstone.enable(dicomContainerRef.current);
      dicomContainerRef.current.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (dicomContainerRef.current) {
        dicomContainerRef.current.removeEventListener('wheel', handleWheel);
        cornerstone.disable(dicomContainerRef.current);
      }
    };
  }, [dicomFiles]);

  return (
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 1, 
        padding: 1, 
        backgroundColor: '#f1f3f5', 
        borderRadius: 2, 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}>
        <Button
    variant="contained"
    component="label"
    sx={{
      backgroundColor: '#343a40',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#5a6268',
      },
      textTransform: 'none',
    }}
  >
    Upload DICOM File
    <input type="file" accept=".dcm" hidden multiple onChange={handleDicomFilesChange} />
  </Button>
      <Box
        ref={dicomContainerRef}
        sx={{
            width: '100%',
            height: '90vh',
            border: '2px dashed #6c757d',
            backgroundColor: '#e0e0e0',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
      />
    </Box>
  );
};

export default DicomViewer;
