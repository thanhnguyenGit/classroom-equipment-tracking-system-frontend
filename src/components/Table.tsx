import { tickets } from '../data/mockData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../styles/Table.scss"
const TicketsTable = () => {
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ticketID</TableCell>
            <TableCell className='tableCell'>borrowerID</TableCell>
            <TableCell className='tableCell'>borrower name</TableCell>
            <TableCell className='tableCell'>borrower tag</TableCell>
            <TableCell className='tableCell'>device</TableCell>
            <TableCell className='tableCell'>borrow time</TableCell>
            <TableCell className='tableCell'>esstimate return</TableCell>
            <TableCell className='tableCell'>return time</TableCell>
            <TableCell className='tableCell'>status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((tickets) => (
            <TableRow key={tickets.id}>
              <TableCell className='tableCell'>{tickets.id}</TableCell>
              <TableCell className='tableCell'>{tickets.borrower_id}</TableCell>
              <TableCell className='tableCell'>{tickets.name}</TableCell>
              <TableCell className='tableCell'>{tickets.tag}</TableCell>
              <TableCell className='tableCell'>{tickets.device}</TableCell>
              <TableCell className='tableCell'>{tickets.borrow_time}</TableCell>
              <TableCell className='tableCell'>{tickets.expected_return_in}</TableCell>
              <TableCell className='tableCell'>{tickets.return_time}</TableCell>
              <TableCell className='tableCell'>
                <span className={`ticketstatus ${tickets.status}`}>{tickets.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>);
};

export default TicketsTable;
