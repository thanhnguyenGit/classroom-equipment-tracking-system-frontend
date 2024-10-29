import React from 'react';
import { FaCog, FaClipboardList } from 'react-icons/fa';

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">Thiết bị</div>
      <ul>
        <li><FaClipboardList /> Tổng quan</li>
        <li><FaClipboardList /> Mượn trả</li>
        <li><FaCog /> Hệ thống</li>
      </ul>
    </div>
  )
}

export default SideBar;
