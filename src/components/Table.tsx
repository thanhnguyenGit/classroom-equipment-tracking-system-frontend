import React from 'react';
import IconButton from './IconButton.tsx';

const Table: React.FC = () => {
  const data = [
    //TODO: Add arbitrate data in here to test
    {
      ticket_id: "00001",
      borrower_id: "20207632",
      borrower_name: "Nguyen Viet Thanh",
      borrower_tag: "Student",
      borrow_time: "15:03",
      expected_return_on: "16:30",
      return_time: "16:05",
      status: "Returned",
    }
  ];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>TicketID</th>
          <th>BorrowerID</th>
          <th>Borrower Name</th>
          <th>Borrower Tag</th>
          <th>Borrow Time</th>
          <th>Expected Return On</th>
          <th>Return Time</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.ticket_id}</td>
            <td>{item.borrower_id}</td>
            <td>{item.borrower_name}</td>
            <td>{item.borrower_tag}</td>
            <td>{item.borrow_time}</td>
            <td>{item.expected_return_on}</td>
            <td>{item.return_time}</td>
            <td>{item.status}</td>
            <td>
              <IconButton icon="edit" />
              <IconButton icon="delete" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;
