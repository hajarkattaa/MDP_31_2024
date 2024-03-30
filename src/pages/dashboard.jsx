import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Chip } from '@mui/material';
import UploadButton from '../components/uploadCaseDialog';
import { getDatabase, onValue, ref } from 'firebase/database';
import AddIcon from '@mui/icons-material/Add';
import UploadCaseDialog from '../components/uploadCaseDialog';

const getColorForResult = (result) => (result === 'positive' ? 'error' : result === 'negative' ? 'success' : 'warning');

const columns = [
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

export default function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [cases, setCases] = React.useState([]);
  const [isUploadDialogOpen, setUploadDialogOpen] = React.useState(false);
  const hasNoCases = cases.length === 0;

  // get data from firebase realtime database under "cases" node
  React.useEffect(() => {
    // get database reference
    const db = getDatabase();
    // get reference to "cases" node
    const casesRef = ref(db, 'cases');

    // get data from firebase realtime database
    onValue(casesRef, (snapshot) => {
      // get data from snapshot
      const data = snapshot.val();
      console.log(data);

      // convert data to array
      setCases(data ? Object.values(data) : []);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDialog = () => {
    setUploadDialogOpen(true);
  };

  const closeDialog = () => {
    setUploadDialogOpen(false);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <UploadButton />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', '& button': { m: 1 } }}>
        <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={openDialog}>
          New Case
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {hasNoCases ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No cases found
                </TableCell>
              </TableRow>
            ) : (
              cases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={cases.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UploadCaseDialog open={isUploadDialogOpen} handleClose={closeDialog} />
    </Paper>
  );
}
