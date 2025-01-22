import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Modal,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Auth, API } from 'aws-amplify';
import { listTreatments } from '../../graphql/queries';
import { createTreatment } from '../../graphql/mutations';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Profile() {
  const [treatmentList, setTreatmentList] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTreatment, setNewTreatment] = useState({ treatmentName: '', price: '' });
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch treatments from the database
  const fetchTreatments = async () => {
    try {
      const response = await API.graphql({
        query: listTreatments,
        variables: {
          filter: null,
          limit: 100, // Fetch up to 100 treatments
        },
      });
      const treatments = response.data.listTreatments.items || [];
      setTreatmentList(treatments);
      setFilteredTreatments(treatments);
    } catch (err) {
      console.error('Error fetching treatments:', err);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  // Add new treatment to the database
  const handleAddTreatment = async () => {
    const { treatmentName, price } = newTreatment;

    if (!treatmentName.trim() || !price.trim()) {
      setError('Treatment name and price are required.');
      return;
    }

    try {
      // Get the auth token from Cognito
      const authToken = await Auth.currentSession()
        .then((session) => session.getIdToken().getJwtToken())
        .catch((err) => {
          console.error('Error getting auth token:', err);
          throw new Error('Authentication error. Please log in again.');
        });

      const response = await API.graphql({
        query: createTreatment,
        variables: {
          input: {
            treatmentName: treatmentName.trim(),
            price: parseFloat(price.trim()),
            isActive: true,
            description: '',
            doctorID: null,
            category: '',
            duration: 0,
            discount: 0,
            insuranceCovered: false,
            notes: '',
            imageUrl: '',
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const addedTreatment = response.data.createTreatment;
      setTreatmentList((prev) => [...prev, addedTreatment]);
      setFilteredTreatments((prev) => [...prev, addedTreatment]);
      setOpenModal(false);
      setNewTreatment({ treatmentName: '', price: '' });
      setError('');
    } catch (err) {
      console.error('Error adding treatment:', err);
      setError('Failed to add treatment. Please try again.');
    }
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Grid container spacing={3}>
        {/* Treatment Suggested with Add icon on the right */}
        <Grid item xs={12} md={12}>
          <Paper sx={{ padding: 3, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ color: '#343a40' }}>
                Treatment Suggested
              </Typography>
              <IconButton
                onClick={() => setOpenModal(true)}
                sx={{
                  backgroundColor: '#343a40',
                  color: '#f8f9fa',
                  '&:hover': { backgroundColor: '#23272b' },
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <TextField
              label="Search Treatments"
              fullWidth
              onChange={(e) => {
                const searchText = e.target.value.toLowerCase();
                const filtered = treatmentList.filter((treatment) =>
                  treatment.treatmentName.toLowerCase().includes(searchText)
                );
                setFilteredTreatments(filtered);
              }}
              sx={{ marginBottom: 2 }}
            />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Treatment Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTreatments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((treatment, index) => (
                      <TableRow key={treatment.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{treatment.treatmentName}</TableCell>
                        <TableCell>₹{treatment.price}</TableCell>
                        <TableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <IconButton
    color="primary"
    onClick={() => {
      // Handle edit functionality
    }}
    sx={{
      '&:hover': { backgroundColor: '#e2e6ea' },
      marginRight: 1, // Add spacing between icons
    }}
  >
    <EditIcon />
  </IconButton>
  <IconButton
    color="error"
    onClick={() => {
      // Handle delete functionality
    }}
    sx={{
      '&:hover': { backgroundColor: '#e2e6ea' },
    }}
  >
    <DeleteIcon />
  </IconButton>
</TableCell>

                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={filteredTreatments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Modal for Adding Treatment */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setError('');
        }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ padding: 4, width: 400, backgroundColor: '#ffffff', borderRadius: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Add Treatment</Typography>
            <IconButton onClick={() => setOpenModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Treatment Name"
            fullWidth
            value={newTreatment.treatmentName}
            onChange={(e) =>
              setNewTreatment({ ...newTreatment, treatmentName: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Price"
            fullWidth
            value={newTreatment.price}
            onChange={(e) =>
              setNewTreatment({ ...newTreatment, price: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddTreatment}
            sx={{
              backgroundColor: '#343a40',
              color: '#f8f9fa',
              '&:hover': { backgroundColor: '#23272b' },
            }}
          >
            Add Treatment
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
}
