import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <LayoutDashboard className="mr-2" />
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      <div>
        <Button variant="outline">Search</Button>
      </div>
    </nav>
  );
};

export default Navbar;
