import React from 'react';
import { tickets } from '../data/mockData';
import "../styles/Table.scss"
const TicketsTable: React.FC = () => {
  return (
    <Card className="table">
      <CardHeader>
        <CardTitle>Ticket Management</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Borrower ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Device</th>
              <th className="p-2 text-left">Borrow Time</th>
              <th className="p-2 text-left">Expected Return</th>
              <th className="p-2 text-left">Return Time</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-gray-100">
                <td className="p-2">{ticket.id}</td>
                <td className="p-2">{ticket.borrower_id}</td>
                <td className="p-2">{ticket.name}</td>
                <td className="p-2">{ticket.device}</td>
                <td className="p-2">{ticket.borrow_time}</td>
                <td className="p-2">{ticket.expected_return_in}</td>
                <td className="p-2">{ticket.return_time}</td>
                <td className="p-2">{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default TicketsTable;
