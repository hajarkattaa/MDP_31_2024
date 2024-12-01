import React from 'react';
import { Paper, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useCases } from '../hooks/useCases';
import CasesTable from '../components/CasesTable';
import UploadCaseDialog from '../components/uploadCaseDialog';
import { columns } from '../constants/tableColumns';

export default function Dashboard() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const cases = useCases();
  const [isUploadDialogOpen, setUploadDialogOpen] = React.useState(false);

  if (!userLoggedIn) return <Navigate to="/signin" replace />;

  const handleRowClick = (row) => {
    navigate(`/result/${row.caseNumber}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setUploadDialogOpen(true)}>
          New Case
        </Button>
      </Box>
      <CasesTable cases={cases} columns={columns} onRowClick={handleRowClick} />
      <UploadCaseDialog open={isUploadDialogOpen} handleClose={() => setUploadDialogOpen(false)} />
    </Paper>
  );
}
