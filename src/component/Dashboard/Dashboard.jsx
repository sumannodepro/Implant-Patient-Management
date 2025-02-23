import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { LocalHospital as LocalHospitalIcon } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DoneIcon from '@mui/icons-material/Done';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PaymentIcon from '@mui/icons-material/Payment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Home from '../pages/HomePage';
import DemographyPage from '../pages/DemographyPage';
import ChiefComplaintPage from '../pages/ChiefComplaintPage';
import CasePhotos from '../pages/CasePhotos';
import TreatmentSuggestedPage from '../pages/TreatmentSuggestedPage';
import TreatmentDonePage from '../pages/TreatmentDonePage';
import IOSViewerPage from '../pages/IOSViewerPage';
import PrePostPage from '../pages/PrePostPage';
import MainDashboard from '../pages/Dashboard';
import PaymentRecordsPage from '../pages/PaymentRecordsPage';
import AddPatientModal from '../AddPatientModal';
import { API, graphqlOperation } from 'aws-amplify';
import { listPatients } from '../../graphql/queries';
export default function Dashboard({ signOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElq, setAnchorElq] = React.useState(null);
  // State for current date and time
  const [currentDateTime, setCurrentDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  const [chiefComplaints, setChiefComplaints] = useState([]);
  const [findings, setFindings] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);

  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');
  const [guardianName, setGuardianName] = useState(''); // For storing parent/guardian name
  const [relationship, setRelationship] = useState(''); // For storing relationship
  const [selectedTreatments, setSelectedTreatments] = useState([]);

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedPatient, setSelectedPatient] = React.useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const pages = [
    <MainDashboard/>,
    <DemographyPage selectedPatient={selectedPatient} />,
    <ChiefComplaintPage 
    selectedPatient={selectedPatient}
    chiefComplaints={chiefComplaints}
    setChiefComplaints={setChiefComplaints}
    findings={findings}
    setFindings={setFindings}
    diagnosis={diagnosis}
    setDiagnosis={setDiagnosis}/>,
    <CasePhotos selectedPatient={selectedPatient}/>,
    <TreatmentSuggestedPage
    selectedPatient={selectedPatient} 
    leftValue={leftValue}
    setLeftValue={setLeftValue}
    rightValue={rightValue}
    setRightValue={setRightValue}
    guardianName={guardianName}
    setGuardianName={setGuardianName}
    relationship={relationship}
    setRelationship={setRelationship}
    selectedTreatments={selectedTreatments}
    setSelectedTreatments={setSelectedTreatments}/>,
    <IOSViewerPage selectedPatient={selectedPatient}/>,
    <PrePostPage selectedPatient={selectedPatient}/>,
    <TreatmentDonePage selectedPatient={selectedPatient}
    selectedTreatments={selectedTreatments}/>,
    <PaymentRecordsPage selectedPatient={selectedPatient}
    selectedTreatments={selectedTreatments}/>
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      console.log('Logged out');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearchChange = async (event, newNextToken = null) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
        setSearchResults([]);
        setNextToken(null);
        return;
    }

    setIsFetching(true);

    try {
        const response = await API.graphql(
            graphqlOperation(listPatients, {
                filter: {
                    or: [
                        { patientName: { contains: query.trim() } },
                        { patientID: { beginsWith: query.trim() } },
                        { mobileNumber: { contains: query.trim() } },
                    ],
                },
                limit: 6000,
                nextToken: newNextToken, // Pass the nextToken for pagination
            })
        );

        const results = response.data.listPatients.items;
        setSearchResults(prevResults => newNextToken ? [...prevResults, ...results] : results);
        setNextToken(response.data.listPatients.nextToken); // Update nextToken

    } catch (error) {
        console.error('Error fetching search results:', error);
    } finally {
        setIsFetching(false);
    }
  };
const handleLoadMore = () => {
    if (nextToken) {
        handleSearchChange({ target: { value: searchQuery } }, nextToken);
    }
};

  const handleSearchFocus = (event) => {
    setAnchorElq(event.target);
  };
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery('');
    setSearchResults([]);
    setAnchorElq(null); 
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#343a40' }}> {/* Dynamic AppBar color based on tab */}
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Implant Patient Management
          </Typography>
          {/* Display selected patient information */}
        {selectedPatient && (
          <Typography variant="body2" sx={{ marginRight: 2, color: '#ffffff' }}>
            {selectedPatient.patientName} (ID: {selectedPatient.patientID})
          </Typography>
        )}
         {/* Display current date and time */}
        <Typography variant="body2" sx={{ marginRight: 2, color: '#ffffff' }}>
          {currentDateTime.date} | {currentDateTime.time}
        </Typography>

  <IconButton
  sx={{
    backgroundColor: '#6c757d',
    borderRadius: '20px',
    color: '#ffffff',
    padding: '6px',
    marginRight: 1,
    height: '40px', // Set the height to match the TextField
    width: '40px',  // Ensure it's square for an icon
    '&:hover': {
      backgroundColor: '#6c757d',
    },
  }}
  onClick={handleOpenModal}>
  <AddIcon /> {/* Replace with your desired Material-UI icon */}
</IconButton>

<TextField
  label="Search Patients"
  value={searchQuery}
  onChange={handleSearchChange}
  onFocus={handleSearchFocus}
  variant="outlined"
  size="small"
  sx={{
    marginRight: 1,
    backgroundColor: '#6c757d',
    borderRadius: '8px',
    height: '40px', // Set the height to match the button
    '& .MuiOutlinedInput-root': {
      height: '100%', // Ensure the input area takes up full height
      '& fieldset': {
        borderColor: '#6c757d',
      },
      '&:hover fieldset': {
        borderColor: '#6c757d',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffffff',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#ffffff', // Lighter color for label text
    },
    '& .MuiInputBase-input': {
      color: '#ffffff', // Input text color matching the base color
    },
    '&.Mui-focused .MuiInputLabel-root': {
      color: '#ffffff', // Label color when focused
    },
    padding: '0 0px',
  }}
/>
<Popper
  open={Boolean(anchorElq) && searchResults.length > 0} // Show Popper only if there are results
  anchorEl={anchorElq} // Anchor to the TextField
  placement="bottom-start" // Position it below the TextField (start aligned with the left)
  sx={{
    marginTop: '8px', // Adjust this value to move the Popper down (responsively)
    zIndex: 2000, // Ensure it stays above other components
  }}
>
  <Paper
    sx={{
      maxHeight: 200,
      overflowY: 'auto',
      width: anchorElq ? `${anchorElq.offsetWidth}px` : 'auto', // Dynamically set the width to match the TextField
      boxShadow: 3,
      backgroundColor: '#fff',
      borderRadius: 1,
    }}
  >
    {searchResults.map((patient) => (
      <MenuItem
        key={patient.id}
        onClick={() => handlePatientSelect(patient)}>
        {patient.patientName}
      </MenuItem>
    ))}
  </Paper>
</Popper>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
    height: '40px', // Set the height to match the button and TextField
    width: '40px', // Ensure the width matches the height for a square icon button
    padding: 0, // Remove any default padding
    '& .MuiSvgIcon-root': {
        fontSize: '35px', // Adjust the icon size to fit within the button
    },
  }}>
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                {loading ? (
                  <CircularProgress size={24} sx={{ marginRight: 1 }} />
                ) : (
                  'Logout'
                )}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {/* Add Patient Modal */}
      <AddPatientModal open={openModal} handleClose={handleCloseModal} />
      <Box sx={{ width: '100%', padding: '20px',marginTop: '40px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
            backgroundColor: '#6c757d',},}}>
          <Tab icon={<DashboardIcon />} iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Dashboard" />
          <Tab icon={<PersonIcon />} iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Demography" />
          <Tab icon={<LocalHospitalIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Chief Complaint" />
          <Tab icon={<VisibilityIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Case Photos" />
          <Tab icon={<HealthAndSafetyIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Treatment Suggested" />
          <Tab icon={<FolderOpenIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="IOS Viewer" />
          <Tab icon={<AssessmentOutlinedIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Pre/Post Page" />
          <Tab icon={<DoneIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Treatment Done" />
          <Tab icon={<PaymentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Payment Records" />
        </Tabs>
        <Box sx={{ paddingTop: 2 }}>
          {pages[value]}
        </Box>
      </Box>
    </Box>
  );
}
