import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    '16 Mar, 2019',
    'tuesday',
    'Elvis Presley',
    '67',
    '22',
    '13',
    
  ),
  createData(
    '16 Mar, 2019',
    'tuesday',
    'John Rauy',
    '74',
    '23',
    '14',
  ),
  
  createData(
    '16 Mar, 2019',
    'tuesday',
    'Tom Riddle',
    '67',
    '33',
    '17',
    
  ),
  createData(
    '16 Mar, 2019',
    'tuesday',
    'Ema Watson',
    '67',
    '44',
    '18',
   
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Student Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Total Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{``}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more 
      </Link>
    </React.Fragment>
  );
}