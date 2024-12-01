// components/FileDropzone.js
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const dropzoneStyles = {
  border: '2px dashed #007bff',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const FileDropzone = ({ onDrop, files }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop,
  });

  return (
    <>
      <Box {...getRootProps({ className: 'dropzone', style: dropzoneStyles })}>
        <input {...getInputProps()} />
        <Typography style={{ textAlign: 'center' }}>Drag n drop some files here, or click to select files</Typography>
      </Box>
      <Box component="aside" sx={{ marginTop: '10px' }}>
        {files}
      </Box>
    </>
  );
};

FileDropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
};

export default FileDropzone;
