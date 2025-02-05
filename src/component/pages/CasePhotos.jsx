import React, { useState } from 'react';
import { Typography, Box, Button, IconButton, Dialog,Grid,Paper } from '@mui/material';
import { PhotoCamera, Delete, Visibility } from '@mui/icons-material';

export default function CasePhotos({ selectedPatient }) {
  const [prePhotos, setPrePhotos] = useState([]);
  const [postPhotos, setPostPhotos] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.includes('pdf') ? 'pdf' : 'image',
    }));

    if (type === 'pre') {
      setPrePhotos((prev) => [...prev, ...newFiles]);
    } else if (type === 'post') {
      setPostPhotos((prev) => [...prev, ...newFiles]);
    } else {
      setLabReports((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (type, index) => {
    if (type === 'pre') {
      setPrePhotos((prev) => prev.filter((_, i) => i !== index));
    } else if (type === 'post') {
      setPostPhotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      setLabReports((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <Box sx={{ padding: 1 }}>
      {selectedPatient ? (
        <>
         <Grid container spacing={1}>
         <Grid item xs={12} md={3} >
         <Grid container spacing={1} direction="column">
         <Grid item xs={12} md={4}>
            <Paper
               sx={{
               padding: 2,
               backgroundColor: '#f8f9fa',
              }}>
             <Typography variant="h6" sx={{ color: '#343a40' }}>Pre-Treatment Photos</Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', marginTop: 1 }}>
              {prePhotos.length > 0 ? (
                prePhotos.map((file, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <img src={file.url} alt={`Pre-Treatment ${index + 1}`} width={120} height={120} onClick={() => setPreviewFile(file)} />
                    <IconButton sx={{ position: 'absolute', top: 0, right: 0, background: 'rgba(255,255,255,0.7)' }} size="small" onClick={() => handleRemoveFile('pre', index)}>
                      <Delete color="error" fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Pre-Treatment Photos goes here...
                </Typography>
              )}
              </Box>
              <Button variant="contained" component="label" startIcon={<PhotoCamera />} sx={{ marginTop: 2, backgroundColor: '#343a40',
            color: '#f8f9fa',
            '&:hover': {
              backgroundColor: '#23272b',
            }, }}>
                Upload Pre-Treatment
                <input type="file" hidden accept="image/*" multiple onChange={(e) => handleFileChange(e, 'pre')} />
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
               sx={{
               padding: 2,
               backgroundColor: '#f8f9fa',
              }}>
               <Typography variant="h6" sx={{ color: '#343a40' }}>Post-Treatment Photos</Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', marginTop: 1 }}>
              {prePhotos.length > 0 ? (
                postPhotos.map((file, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <img src={file.url} alt={`Post-Treatment ${index + 1}`} width={120} height={120} onClick={() => setPreviewFile(file)} />
                    <IconButton sx={{ position: 'absolute', top: 0, right: 0, background: 'rgba(255,255,255,0.7)' }} size="small" onClick={() => handleRemoveFile('post', index)}>
                      <Delete color="error" fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Post-Treatment Photos goes here...
                </Typography>
              )}
              </Box>
              <Button variant="contained" component="label" startIcon={<PhotoCamera />} sx={{ marginTop: 2,  backgroundColor: '#343a40',
            color: '#f8f9fa',
            '&:hover': {
              backgroundColor: '#23272b',
            }, }}>
                Upload Post-Treatment
                <input type="file" hidden accept="image/*" multiple onChange={(e) => handleFileChange(e, 'post')} />
              </Button>
                </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
            <Paper
               sx={{
               padding: 2,
               backgroundColor: '#f8f9fa',
              }}>
              <Typography variant="h6" sx={{ color: '#343a40' }}>Lab Reports (Images or PDFs)</Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', marginTop: 1 }}>
              {prePhotos.length > 0 ? (
                labReports.map((file, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    {file.type === 'pdf' ? (
                      <Box onClick={() => setPreviewFile(file)} sx={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', cursor: 'pointer' }}>
                        <Typography variant="caption">PDF File</Typography>
                      </Box>
                    ) : (
                      <img src={file.url} alt={`Lab Report ${index + 1}`} width={120} height={120} onClick={() => setPreviewFile(file)} />
                    )}
                    <IconButton sx={{ position: 'absolute', top: 0, right: 0, background: 'rgba(255,255,255,0.7)' }} size="small" onClick={() => handleRemoveFile('lab', index)}>
                      <Delete color="error" fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              ) : ( 
                <Typography variant="body2" color="textSecondary">
                  Lab Reports goes here...
                </Typography>
              )}
              </Box>
              <Button variant="contained" component="label" startIcon={<PhotoCamera />} sx={{ marginTop: 2, backgroundColor: '#343a40',
            color: '#f8f9fa',
            '&:hover': {
              backgroundColor: '#23272b',
            }, }}>
                Upload Lab Reports
                <input type="file" hidden accept="image/*,application/pdf" multiple onChange={(e) => handleFileChange(e, 'lab')} />
              </Button>
                </Paper>
                </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                <Typography variant="body1" color="textSecondary">
                  Past Data Will Be Displayed Here
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {/* Preview Modal */}
          <Dialog open={!!previewFile} onClose={() => setPreviewFile(null)} maxWidth="md" fullWidth>
            {previewFile && (
              <Box sx={{ padding: 2, textAlign: 'center' }}>
                {previewFile.type === 'pdf' ? (
                  <iframe src={previewFile.url} width="100%" height="500px" title="PDF Preview"></iframe>
                ) : (
                  <img src={previewFile.url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '500px' }} />
                )}
              </Box>
            )}
          </Dialog>
        </>
      ) : (
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          Please select a patient to view case photos.
        </Typography>
      )}
    </Box>
  );
}
