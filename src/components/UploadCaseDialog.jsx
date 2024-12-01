import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import PropTypes from 'prop-types';
import FileDropzone from './FileDropzone';
import { isFormValid, generateCaseNumber } from '../utils/helpers';
import { uploadImage, saveCaseData, deleteStorageObject } from '../services/firebaseService';
import * as DB from 'firebase/database';
import * as Storage from 'firebase/storage';

const initialState = { firstName: '', lastName: '', phoneNumber: '', didAgreeToUsePicture: false };

const UploadCaseDialog = ({ open, handleClose }) => {
  const [patientInfo, setPatientInfo] = React.useState(initialState);
  const [acceptedFiles, setAcceptedFiles] = React.useState([]);

  const handleInputChange = (e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  const handleCheckboxChange = (e) => setPatientInfo({ ...patientInfo, didAgreeToUsePicture: e.target.checked });

  const handleSubmit = async () => {
    const db = DB.getDatabase();
    const storage = Storage.getStorage();

    const newCaseKey = generateCaseNumber(patientInfo);
    const initialImageRef = Storage.ref(storage, `images/${newCaseKey}/uploaded`);
    const resultImageRef = Storage.ref(storage, `images/${newCaseKey}/result`);

    try {
      await uploadImage(initialImageRef, acceptedFiles[0]);
      await uploadImage(resultImageRef, acceptedFiles[0]);

      const caseData = {
        ...patientInfo,
        caseNumber: newCaseKey,
        uploadDate: new Date().toISOString(),
        result: 'pending',
        uploadedImageUrl: initialImageRef.toString(),
        resultImageUrl: resultImageRef.toString(),
      };

      await saveCaseData(DB.ref(db, 'cases'), newCaseKey, caseData);

      setPatientInfo(initialState);
      handleClose();
    } catch (error) {
      console.error('Submission failed:', error);

      // Rollback storage uploads if necessary
      await deleteStorageObject(initialImageRef);
      await deleteStorageObject(resultImageRef);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Patient Info</DialogTitle>
      <DialogContent>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          onChange={handleInputChange}
          value={patientInfo.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          onChange={handleInputChange}
          value={patientInfo.lastName}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          fullWidth
          onChange={handleInputChange}
          value={patientInfo.phoneNumber}
        />
        <FileDropzone
          onDrop={setAcceptedFiles}
          files={acceptedFiles.map((file) => `${file.path} - ${file.size} bytes`)}
        />
        <FormControlLabel
          control={<Checkbox checked={patientInfo.didAgreeToUsePicture} onChange={handleCheckboxChange} />}
          label="Agree to terms"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!isFormValid(patientInfo, acceptedFiles)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UploadCaseDialog.propTypes = { open: PropTypes.bool.isRequired, handleClose: PropTypes.func.isRequired };
export default UploadCaseDialog;
