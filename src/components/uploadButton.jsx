import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import DialogForm from './dialog';

export default function UploadButton() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', '& button': { m: 1 } }}>
      <div>
        <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={handleClick}>
          New{' '}
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogContent>
            {/* Render the MyDropzone component here */}
            {/* Include other components here */}
            <TextField label="Insert Your Name" variant="outlined" />
            <DialogForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
