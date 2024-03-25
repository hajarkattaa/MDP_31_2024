import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Chip } from '@mui/material';

const columns = [
  { id: 'caseNumber', label: 'Case Number' },
  { id: 'patientName', label: 'Patient Name' },
  {
    id: 'uploadDate',
    label: 'Upload Date',
    align: 'right',
  },
  {
    id: 'result',
    label: 'Result',
    align: 'right',
    render: (value) => <Chip label={value} variant="outlined" color={value === 'positive' ? 'error' : 'success'} />,
  },
];

const rows = [
  { key: 1, caseNumber: 1, patientName: 'John Doe', uploadDate: '2024-03-15', result: 'pending' },
  { key: 2, caseNumber: 2, patientName: 'Jane Smith', uploadDate: '2024-03-16', result: 'positive' },
  { key: 3, caseNumber: 3, patientName: 'Alice Johnson', uploadDate: '2024-03-17', result: 'negative' },
  { key: 4, caseNumber: 4, patientName: 'Bob Anderson', uploadDate: '2024-03-18', result: 'pending' },
  { key: 5, caseNumber: 5, patientName: 'Eva Brown', uploadDate: '2024-03-19', result: 'negative' },
  { key: 6, caseNumber: 6, patientName: 'Michael Clark', uploadDate: '2024-03-20', result: 'pending' },
  { key: 7, caseNumber: 7, patientName: 'Sophia Lee', uploadDate: '2024-03-21', result: 'positive' },
  { key: 8, caseNumber: 8, patientName: 'William Martinez', uploadDate: '2024-03-22', result: 'negative' },
  { key: 9, caseNumber: 9, patientName: 'Olivia Wilson', uploadDate: '2024-03-23', result: 'pending' },
  { key: 10, caseNumber: 10, patientName: 'James Taylor', uploadDate: '2024-03-24', result: 'positive' },
];

export default function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
