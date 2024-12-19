import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../styles/Table.scss"
import axios from 'axios';
import { Ticket, Items } from '../data/mockData';
const TicketsTable = () => {
  // format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  // format items for display
  const formatItems = (items: Items[]) => {
    return items.map(item =>
      `${item.equipmentName}(${item.quantity})`
    ).join(', ');
  };
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/order/list", {
        params: {
          sort: "ASC",  // Optional if backend is already sorting
          sortBy: "BORROW_TIME"
        }
      });

      // Sort the response by borrowTime in descending order and take the first 5 items
      const sortedData = response.data
        .sort((a: any, b: any) => new Date(b.borrowTime).getTime() - new Date(a.borrowTime).getTime())
        .slice(0, 5); // Get the 5 most recent items

      const mapped_response = sortedData.map((item: any) => ({
        id: item.id,
        borrowerName: item.borrowerName,
        staffName: item.staffName,
        borrowTime: item.borrowTime,
        returnDeadline: item.returnDeadline,
        items: item.items.map((equipment: any) => ({
          equipmentName: equipment.equipmentName,
          quantity: equipment.quantity,
        })),
        returnTime: item.returnTime,
        status: item.status,
      }));

      // Set the state with the 5 most recent tickets
      setTicket(mapped_response);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Set up periodic refresh
    const intervalId = setInterval(fetchData, 5000); // Refresh every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const rows = ticket;
  return (
    <TableContainer component={Paper} className='table' sx={{ borderradius: '20px', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>borrower name</TableCell>
            <TableCell className='tableCell'>staff name</TableCell>
            <TableCell className='tableCell'>borrow time</TableCell>
            <TableCell className='tableCell'>deadline</TableCell>
            <TableCell className='tableCell'>devices</TableCell>
            <TableCell className='tableCell'>status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...rows].map((tickets) => (
            <TableRow key={tickets.id}>
              <TableCell className='tableCell'>{tickets.borrowerName}</TableCell>
              <TableCell className='tableCell'>{tickets.staffName}</TableCell>
              <TableCell className='tableCell'>{formatTime(tickets.borrowTime)}</TableCell>
              <TableCell className='tableCell'>{formatTime(tickets.returnDeadline)}</TableCell>
              <TableCell className='tableCell'>{formatItems(tickets.items)}</TableCell>
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
