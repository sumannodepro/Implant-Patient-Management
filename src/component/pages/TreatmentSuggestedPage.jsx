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
  Checkbox,
  Select,
  FormControl, 
  InputLabel,
  MenuItem 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Auth, API } from 'aws-amplify';
import { listTreatments } from '../../graphql/queries';
import { createTreatment } from '../../graphql/mutations';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TreatmentSuggestedPage({selectedPatient,leftValue,setLeftValue,rightValue,setRightValue,guardianName,setGuardianName,relationship,setRelationship,selectedTreatments,setSelectedTreatments}) {
  const [treatmentList, setTreatmentList] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTreatment, setNewTreatment] = useState({ treatmentName: '', price: '' });
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
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
  const handleLeftChange = (event) => {
    setLeftValue(event.target.value)
  };
  const handleRightChange = (event) => {
    setRightValue(event.target.value)
  };
  const handleTreatmentCheckboxChange = (event, treatmentName) => {
    if (event.target.checked) {
      setSelectedTreatments((prev) => [...prev, treatmentName]);
    } else {
      setSelectedTreatments((prev) => prev.filter((id) => id !== treatmentName));
    }
  };
  const consentFormText = `
Consent for Treatment

I, [${rightValue === 'Patient' ? 'PATIENT NAME' : guardianName}], desire to avail medical services at this facility and give my agreement to accept their services related to diagnosis and care of my medical condition.

I hereby give consent to Dr. [${leftValue === 'Dr.Suman Bohra' ? 'Dr.Suman Bohra' : 'Doctor Name'}] to perform the following treatment(s): [${selectedTreatments.join(', ')}] on me or my dependent as follows: [${selectedTreatments.join(', ')}], and any such additional procedure(s) as may be considered necessary for my well-being based on findings made during the course of the [${selectedTreatments.join(', ')}]. The nature and purpose of the [${selectedTreatments.join(', ')}] have been explained to me, and no guarantee has been made or implied as to result or cure. I have been given satisfactory answers to all my questions and wish to proceed with the [${selectedTreatments.join(', ')}].

Acknowledgement:

1. I understand that this consent is a general consent and it includes routine procedures and treatments such as physical examination, drawing blood for lab tests, medication administration, taking X-rays, ECG, use of local anaesthesia, and conducting any non-invasive procedure, etc.
2. I also understand that in case a high-risk or invasive procedure is required to be done, whether for investigation or treatment, I am willing to co-operate.
3. I acknowledge that the results of treatment at this hospital are not guaranteed and I cannot hold the hospital, its doctor, or any other staff liable for an outcome.
4. I authorise the hospital to collect and maintain a record of my basic information and medical information. I understand that this information is confidential and will be shared only with healthcare providers and used only for my treatment purpose. Disclosure of my information to others will be done only after my authorization (except if the information is requested by legal authorities).
5. I assume full responsibility for my personal belongings and valuables, and the hospital will not be responsible for the loss of any personal items.
6. I undertake that I will abide by the rules and by-laws of the hospital.

By signing below, I confirm that I have read and understood this consent form and agree to its terms.

---------------------------------------------
Signature: ________________________________

Relationship to Patient: [${rightValue === 'Patient' ? 'Self' : 'Parent/Guardian'}]

Name: [${rightValue === 'Patient' ? 'PATIENT NAME' : guardianName}]

Date: ___________________________
`;
  // Handle changes for parent/guardian name input
  const handleGuardianNameChange = (event) => {
    setGuardianName(event.target.value);
  };

  // Handle changes for relationship input
  const handleRelationshipChange = (event) => {
    setRelationship(event.target.value);
  };
  return (
    <Box sx={{ padding: 1 }}>
      {selectedPatient ? (
      <Grid container spacing={1}>
        {/* Treatment Suggested with Add icon on the right */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                {filteredTreatments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((treatment, index) => (
                      <TableRow key={treatment.id}>
                        <TableCell padding="checkbox">
                          <Checkbox 
                          checked={selectedTreatments.includes(treatment.treatmentName)}
                          onChange={(e) => handleTreatmentCheckboxChange(e, treatment.treatmentName)}/>
                        </TableCell>
                        <TableCell>{treatment.treatmentName}</TableCell>
                        <TableCell>₹{treatment.price}</TableCell>
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
        <Grid item xs={12} md={8}>
        <Paper sx={{ padding: 2, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 3 }}>
              <Typography variant="h6" sx={{ color: '#343a40' }}>
                Consent Form
              </Typography>
            </Box>
            <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
  {/* Select Doctor */}
  <FormControl sx={{ width: { xs: '100%', sm: 200 }, minWidth: 120 }}>
    <InputLabel id="select-doctor-label">Select Doctor</InputLabel>
    <Select
      value={leftValue}
      onChange={handleLeftChange}
      labelId="select-doctor-label"
      label="Select Doctor"
      name="selectDoctor"
    >
      <MenuItem value="Option 1">None</MenuItem>
      <MenuItem value="Dr.Suman Bohra">Suman Bohra</MenuItem>
    </Select>
  </FormControl>

  {/* To be signed by */}
  <FormControl sx={{ width: { xs: '100%', sm: 200 }, minWidth: 120 }}>
    <InputLabel id="to-be-signed-by-label">To be signed by</InputLabel>
    <Select
      value={rightValue}
      onChange={handleRightChange}
      labelId="to-be-signed-by-label"
      label="To be signed by"
      name="toBeSignedBy"
    >
      <MenuItem value="Patient">Patient</MenuItem>
      <MenuItem value="Parent/Guardian">Parent/Guardian</MenuItem>
    </Select>
  </FormControl>

  {/* Conditional rendering for Parent/Guardian Name and Relationship */}
  {rightValue === 'Parent/Guardian' && (
    <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
      {/* Parent/Guardian Name */}
      <TextField
        label="Parent/Guardian Name"
        value={guardianName}
        onChange={handleGuardianNameChange}
        sx={{ width: { xs: '100%', sm: 250 }, minWidth: 150 }} // Adjust width based on screen size
      />

      {/* Select Relationship Type */}
      <FormControl sx={{ width: { xs: '100%', sm: 200 }, minWidth: 120 }}>
        <InputLabel id="select-relationship-label">Select relationship</InputLabel>
        <Select
          value={relationship}
          onChange={handleRelationshipChange}
          labelId="select-relationship-label"
          label="Select relationship"
          name="relationship">
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Father">Father</MenuItem>
          <MenuItem value="Mother">Mother</MenuItem>
          <MenuItem value="Son">Son</MenuItem>
          <MenuItem value="Daughter">Daughter</MenuItem>
          <MenuItem value="Brother">Brother</MenuItem>
          <MenuItem value="Sister">Sister</MenuItem>
          <MenuItem value="Cousin">Cousin</MenuItem>
          <MenuItem value="Friend">Friend</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )}
</Box>
<Box mt={3}>
  <Typography variant="body1">{consentFormText}</Typography>
</Box>
          </Paper>
        </Grid>
      </Grid>
) : (
  <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
    Please select a patient to view treatment.
  </Typography>
)}
      {/* Modal for Adding Treatment */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setError('');
        }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ padding: 2, width: 400, backgroundColor: '#ffffff', borderRadius: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
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
            sx={{ marginBottom: 1 }}
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
