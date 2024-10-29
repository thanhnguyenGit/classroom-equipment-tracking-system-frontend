import React from 'react';
import IconButton from './IconButton.tsx';

const Table: React.FC = () => {
  const data = [
    //TODO: Add arbitrate data in here to test
  ];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Người mượn</th>
          <th>Số tiết SD thiết bị</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.week}</td>
            <td>{item.teacher}</td>
            <td>{item.timesUsed}</td>
            <td>{item.hoursUsed}</td>
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
