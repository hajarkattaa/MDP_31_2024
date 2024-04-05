import { Fragment, useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, TextField, Button, Grid, CircularProgress } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';
import STATUSES from '../constants/statuses';

function ResultPage() {
  const { userLoggedIn } = useAuth();
  const { caseNumber } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [status, setStatus] = useState(STATUSES.PENDING);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [comment, setComment] = useState('');
  const [originalImage, setOriginalImage] = useState(null);
  const [segmentedImage, setSegmentedImage] = useState(null);

  console.log({ caseDetails });

  useEffect(() => {
    if (caseNumber) {
      setIsLoading(true);

      // get case by caseNumber from cases node from firebase realtime database
      const db = getDatabase();
      const caseRef = ref(db, `cases/${caseNumber}`);

      if (!caseRef) {
        setIsLoading(false);
        return;
      }

      // get data from firebase realtime database
      onValue(caseRef, (snapshot) => {
        // get data from snapshot
        const data = snapshot.val();
        setCaseDetails(data);
        setStatus(data?.result ?? STATUSES.PENDING);
        setComment(data?.comment ?? '');
        setIsLoading(false);
      });
    }
  }, [caseNumber]);

  useEffect(() => {
    if (!caseDetails) {
      return;
    }

    getImageSrcFormFB(caseDetails?.uploadedImageUrl).then((data) => {
      setOriginalImage(data);
    });

    getImageSrcFormFB(caseDetails?.resultImageUrl).then((data) => {
      setSegmentedImage(data);
    });
  }, [caseDetails]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Update the case with comment and didAccept
    const db = getDatabase();
    const caseRef = ref(db, `cases/${caseNumber}`);
    const updates = {
      ...caseDetails,
      comment,
      result: status,
    };

    // Update the case with comment and didAccept
    set(caseRef, updates).then(() => {
      setIsSubmitting(false);
    });

    alert('Feedback submitted successfully');
  };

  const getImageSrcFormFB = async (fbRef = '') => {
    const storage = getStorage();
    const imageRef = storageRef(storage, fbRef);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  return (
    <Fragment>
      {!userLoggedIn && <Navigate to={`/signin`} replace={true} />}
      {isLoading && (
        <Box display="flex" justifyContent="center" height={400} alignItems="center">
          <CircularProgress />
        </Box>
      )}
      {!caseDetails && !isLoading && (
        <Box display="flex" justifyContent="center" height={400} alignItems="center">
          <Typography variant="h4">No case found</Typography>
        </Box>
      )}
      {caseDetails && (
        <Box p={2}>
          <Typography variant="h4">
            Case Number: <strong>{caseNumber}</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            {/* Welcome to the result page for {patientName}. Below, you can find the original image of the patient&apos;s
          lungs along with the segmented image. Please provide feedback on the segmented image and leave any comments
          you have for further evaluation. */}
            Welcome to the result page for {caseDetails?.firstName} {caseDetails?.lastName}. Below, you can find the
            original image of the patient&apos;s lungs along with the segmented image. Please provide feedback on the
            segmented image and leave any comments you have for further evaluation.
          </Typography>
          <Grid container spacing={4} width={{ xs: '100%', md: '75%', lg: '50%' }} margin="auto">
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Original Image:</Typography>
              {originalImage ? <img src={originalImage} alt="Original Lungs" width="100%" /> : <CircularProgress />}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Segmented Image:</Typography>
              {segmentedImage ? <img src={segmentedImage} alt="Segmented Lungs" width="100%" /> : <CircularProgress />}
            </Grid>
          </Grid>
          <Box mt={3}>
            <Typography variant="subtitle1">Is the segmented picture clear and accurate?</Typography>
            <Box display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={status === STATUSES.ACCEPTED}
                    onChange={(e) => setStatus(e.target.checked ? STATUSES.ACCEPTED : STATUSES.REJECTED)}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={status === STATUSES.REJECTED}
                    onChange={(e) => setStatus(e.target.checked ? STATUSES.REJECTED : STATUSES.ACCEPTED)}
                  />
                }
                label="No"
              />
            </Box>
          </Box>
          <Box mt={1} mb={3}>
            <TextField
              id="comment"
              label="Comments"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={comment}
              onChange={handleCommentChange}
              helperText="Please provide your feedback about the segmented lung to help us improve our work in the future."
            />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Fragment>
  );
}

export default ResultPage;
