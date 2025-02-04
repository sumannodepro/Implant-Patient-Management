import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const DicomViewer = () => {
  const dicomContainerRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [dicomFiles, setDicomFiles] = useState([]);
  const [categorizedSlices, setCategorizedSlices] = useState({
    AXIAL: [],
    SAGITTAL: [],
    CORONAL: [],
  });
  const [currentIndices, setCurrentIndices] = useState([0, 0, 0, 0]);

  const categorizeSlicesByOrientation = async (files) => {
    const categories = {
      AXIAL: [],
      SAGITTAL: [],
      CORONAL: [],
    };

    await Promise.all(
      files.map(async (file) => {
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
        try {
          const image = await cornerstone.loadImage(imageId);
          const orientation = image.data.string('x00200037'); // ImageOrientationPatient
          const position = image.data.string('x00200032');   // ImagePositionPatient
          const imageType = image.data.string('x00080008');  // ImageType
          
          if (orientation) {
            const [rowX, rowY, rowZ, colX, colY, colZ] = orientation.split('\\').map(parseFloat);
            if (Math.abs(rowX) === 1 || Math.abs(colX) === 1) {
              categories.AXIAL.push(file);
            } else if (Math.abs(rowY) === 1 || Math.abs(colY) === 1) {
              categories.SAGITTAL.push(file);
            } else if (Math.abs(rowZ) === 1 || Math.abs(colZ) === 1) {
              categories.CORONAL.push(file);
            } else {
              console.warn(`Unrecognized orientation for file: ${file.name}`);
            }
          } else {
            console.warn(`Missing orientation tag for file: ${file.name}`);
          }
        } catch (error) {
          console.error('Error categorizing slice:', error);
        }
      })
    );

    console.log('Categorized Slices:', categories);

    return categories;
  };

  const loadView = (containerRef, file) => {
    if (file) {
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      cornerstone
        .loadImage(imageId)
        .then((image) => {
          cornerstone.displayImage(containerRef.current, image);
        })
        .catch((error) => {
          console.error('Error loading DICOM slice:', error);
        });
    }
  };

  const handleDicomFilesChange = async (event) => {
    const files = Array.from(event.target.files || []).filter((file) => file.name.endsWith('.dcm'));
    if (files.length > 0) {
      setDicomFiles(files);
      const slices = await categorizeSlicesByOrientation(files);
      const missingViews = [];
      if (slices.AXIAL.length === 0) missingViews.push('Axial');
      if (slices.SAGITTAL.length === 0) missingViews.push('Sagittal');
      if (slices.CORONAL.length === 0) missingViews.push('Coronal');

      if (missingViews.length > 0) {
        alert(`The following views are not available in the DICOM file: ${missingViews.join(', ')}`);
      }

      setCategorizedSlices(slices);
    } else {
      alert('Please select valid DICOM files.');
    }
  };

  const handleWheel = (event, index) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      if (event.deltaY > 0) {
        newIndices[index] = Math.min(newIndices[index] + 1, dicomFiles.length - 1);
      } else {
        newIndices[index] = Math.max(newIndices[index] - 1, 0);
      }
      return newIndices;
    });
  };

  useEffect(() => {
    
    if (dicomFiles.length > 0) {
      loadView(dicomContainerRefs[0], categorizedSlices.AXIAL[currentIndices[0]]);
      loadView(dicomContainerRefs[1], categorizedSlices.SAGITTAL[currentIndices[1]]);
      loadView(dicomContainerRefs[2], categorizedSlices.CORONAL[currentIndices[2]]);
      loadView(dicomContainerRefs[3], dicomFiles[currentIndices[3]]); // Fallback view
    }
  }, [categorizedSlices, dicomFiles, currentIndices]);

  useEffect(() => {
    const wheelHandlers = dicomContainerRefs.map((ref, index) => {
      if (ref.current) {
        cornerstone.enable(ref.current);

        const wheelHandler = (event) => handleWheel(event, index);

        ref.current.addEventListener('wheel', wheelHandler);

        return { ref: ref.current, wheelHandler };
      }
      return null;
    });
    return () => {
      wheelHandlers.forEach((handlerObj) => {
        if (handlerObj?.ref) {
          handlerObj.ref.removeEventListener('wheel', handlerObj.wheelHandler);
          cornerstone.disable(handlerObj.ref);
        }
      });
    };
  }, [dicomFiles]);

  return (
    <Box
      sx={{
        padding: 1,
        backgroundColor: '#f1f3f5',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        height: '100vh',
      }}
    >
      <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: '#343a40',
          color: '#fff',
          '&:hover': { backgroundColor: '#5a6268' },
          textTransform: 'none',
        }}
      >
        Upload DICOM Folder
        <input type="file" accept=".dcm" hidden multiple onChange={handleDicomFilesChange}/>
      </Button>

      <Grid container spacing={1} sx={{ width: '100%', height: '93.5%' }}>
        {dicomContainerRefs.map((ref, index) => (
          <Grid item xs={6} key={index} sx={{ height: '50%' }}>
            <Box
              ref={ref}
              sx={{
                width: '100%',
                height: '100%',
                border: '2px dashed #6c757d',
                backgroundColor: '#e0e0e0',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DicomViewer;
