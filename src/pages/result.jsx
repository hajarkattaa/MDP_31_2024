import { useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';

function ResultPage() {
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);
  const [comment, setComment] = useState('');

  const handleYesChange = (event) => {
    setYesChecked(event.target.checked);
    if (event.target.checked) {
      setNoChecked(false); // Uncheck "No" if "Yes" is checked
    }
  };

  const handleNoChange = (event) => {
    setNoChecked(event.target.checked);
    if (event.target.checked) {
      setYesChecked(false); // Uncheck "Yes" if "No" is checked
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Send comment and selected checkbox to web owner (in a real application, this would be implemented differently)
    console.log('Yes checked:', yesChecked);
    console.log('No checked:', noChecked);
    console.log('Comment:', comment);
    // Reset comment field and checkboxes
    setComment('');
    setYesChecked(false);
    setNoChecked(false);
  };

  // Mock data
  const patientName = 'John Doe';
  const originalImageSrc = 'https://via.placeholder.com/300';
  const segmentedImageSrc = 'https://via.placeholder.com/300';

  return (
    <Box p={2}>
      <Typography variant="h4">Result Page</Typography>
      <Typography variant="body1" paragraph>
        Welcome to the result page for {patientName}. Below, you can find the original image of the patients lungs along
        with the segmented image. Please provide feedback on the segmented image and leave any comments you have for
        further evaluation.
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Box mr={2}>
          <Typography variant="h6">Original Image:</Typography>
          <img src={originalImageSrc} alt="Original Lungs" width="300" />
        </Box>
        <Box>
          <Typography variant="h6">Segmented Image:</Typography>
          <img src={segmentedImageSrc} alt="Segmented Lungs" width="300" />
        </Box>
      </Box>
      <Box mt={3}>
        <Typography variant="subtitle1">Is the segmented picture clear and accurate?</Typography>
        <Box display="flex" alignItems="center">
          <FormControlLabel control={<Checkbox checked={yesChecked} onChange={handleYesChange} />} label="Yes" />
          <FormControlLabel control={<Checkbox checked={noChecked} onChange={handleNoChange} />} label="No" />
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
  );
}

export default ResultPage;
