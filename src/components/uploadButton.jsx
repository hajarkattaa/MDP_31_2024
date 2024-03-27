import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import DialogForm from './dialog';

export default function UploadButton() {
  const [open, setOpen] = React.useState(false);
  const [patientInfo, setPatientInfo] = React.useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [agreed, setAgreed] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(patientInfo);
    console.log('Agreed to use picture:', agreed);
    // Reset form fields
    setPatientInfo({
      firstName: '',
      lastName: '',
      phoneNumber: '',
    });
    setAgreed(false);
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', '& button': { m: 1 } }}>
      <div>
        <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={handleClick}>
          New{' '}
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Patient Info</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={patientInfo.firstName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              value={patientInfo.lastName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="tel" // Changed type to "tel" for phone number input
              fullWidth
              value={patientInfo.phoneNumber}
              onChange={handleInputChange}
              InputProps={{
                inputMode: 'tel', // Added inputMode attribute
              }}
            />

            <DialogForm />
            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={handleCheckboxChange} />}
              label="Does the patient agree to use his/her picture in our data?"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
