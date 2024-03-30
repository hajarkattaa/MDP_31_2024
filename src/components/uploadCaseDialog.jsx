import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import * as DB from 'firebase/database';
import * as Storage from 'firebase/storage';

const dropzoneStyles = {
  border: '2px dashed #007bff',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

UploadCaseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  didAgreeToUsePicture: false,
};

export default function UploadCaseDialog(props) {
  const { open, handleClose } = props;
  const [patientInfo, setPatientInfo] = React.useState(initialState);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
  });

  const files = acceptedFiles.map((file) => (
    <Typography key={file.path} variant="caption">
      {file.path} - {file.size} bytes
    </Typography>
  ));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setPatientInfo((prevInfo) => ({ ...prevInfo, didAgreeToUsePicture: checked }));
  };

  const generateCaseNumber = () => {
    const { firstName, lastName } = patientInfo;
    return `${lastName.replace(/\s/g, '')}-${firstName.replace(/\s/g, '')}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
  };

  const handleSubmit = async () => {
    // Handle form submission here
    console.log(patientInfo);

    // step 1: (pending ML endpoint): feed image to ML model and get segmentation result image

    // step 2: upload image to firebase storage

    // setp:3: upload segmentation result image to firebase storage

    // step 4: save patient info and image urls to firebase realtime database

    // question: is this the right way to handle form submission?
    // what if one of the steps failed?
    // answer: we need to handle errors and rollback changes if any step failed
    // we can use firebase transactions to handle this

    const initialImage = acceptedFiles[0];

    // TODO: call ML model then replace this with the result image from ML model
    const resultImage = acceptedFiles[0];

    const db = DB.getDatabase();
    const casesRef = DB.ref(db, 'cases');

    const newCaseKey = generateCaseNumber();

    const storage = Storage.getStorage();
    const initialImageRef = Storage.ref(storage, 'images/' + newCaseKey + '/uploaded');
    const resultImageRef = Storage.ref(storage, 'images/' + newCaseKey + '/result');

    try {
      await Storage.uploadBytes(initialImageRef, initialImage);
    } catch (error) {
      console.error('Failed to upload initial image', error);
      return;
    }

    try {
      await Storage.uploadBytes(resultImageRef, resultImage);
    } catch (error) {
      console.error('Failed to upload result image', error);
      await Storage.deleteObject(initialImageRef);
      return;
    }

    const caseData = {
      ...patientInfo,
      caseNumber: newCaseKey,
      uploadDate: new Date().toISOString(),
      result: 'pending',
      uploadedImageUrl: initialImageRef.toString(),
      resultImageUrl: resultImageRef.toString(),
    };

    try {
      await DB.set(DB.child(casesRef, newCaseKey), caseData);
    } catch (error) {
      console.error('Failed to save case data', error);
      await Storage.deleteObject(initialImageRef);
      await Storage.deleteObject(resultImageRef);
      return;
    }

    // Reset form fields
    setPatientInfo(initialState);
    handleClose();
  };

  const isFormValid = () => {
    const { firstName, lastName, phoneNumber } = patientInfo;

    const areFieldsEmpty = !firstName || !lastName || !phoneNumber;

    // check if files are uploaded
    const didNotUploadFiles = acceptedFiles.length === 0;

    return areFieldsEmpty || didNotUploadFiles;
  };

  return (
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

        <br />
        <br />
        <Box {...getRootProps({ className: 'dropzone', style: dropzoneStyles })}>
          <input {...getInputProps()} />
          <Typography style={{ textAlign: 'center' }}>Drag n drop some files here, or click to select files</Typography>
        </Box>
        <Box component="aside" sx={{ marginTop: '10px' }}>
          {files}
        </Box>

        <FormControlLabel
          control={<Checkbox checked={patientInfo.didAgreeToUsePicture} onChange={handleCheckboxChange} />}
          label="Does the patient agree to use his/her picture in our data?"
        />
      </DialogContent>
      <DialogActions>
        <Button size="medium" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button size="medium" variant="contained" color="primary" disabled={isFormValid()} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
