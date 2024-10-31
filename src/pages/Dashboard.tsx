import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DevicesTable from '../components/DeviceTable';
import TicketsTable from '../components/Table';

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'devices' | 'tickets'>('devices');

  const handleNavigation = (view: 'devices' | 'tickets') => {
    setCurrentView(view);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        onNavigate={handleNavigation}
        currentView={currentView}
      />
      <div className="main-content flex flex-col h-full">
        <Navbar />
        <div className="p-6">
          {currentView === 'devices' ? <DevicesTable /> : <TicketsTable />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
