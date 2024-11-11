import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { devices } from '../data/mockData';

const DevicesTable = () => {
  return (
    <Card className="devtable">
      <CardHeader>
        <CardTitle>Devices Management</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <tr key={device.id} className="hover:bg-gray-100">
                <td className="p-2">{device.id}</td>
                <td className="p-2">{device.name}</td>
                <td className="p-2">{device.type}</td>
                <td className="p-2">{device.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default DevicesTable;
