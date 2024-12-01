// constants/tableColumns.js
import { Chip } from '@mui/material';
import { getColorForResult } from '../utils/helpers';

export const columns = [
  { id: 'caseNumber', label: 'Case Number' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'uploadDate', label: 'Upload Date', align: 'right' },
  {
    id: 'result',
    label: 'Result',
    format: (value) => <Chip label={value} variant="outlined" color={getColorForResult(value)} />,
  },
];
