import React from 'react';
import { FaCog, FaClipboardList } from 'react-icons/fa';

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">DashBoard</div>
      <ul>
        <li><FaClipboardList /> Devices Storage</li>
        <li><FaClipboardList /> Tickets</li>
        <li><FaCog /> System</li>
      </ul>
    </div>
  )
}

export default SideBar;
