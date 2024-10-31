import React from 'react';
import { ServerCog, Ticket } from 'lucide-react';

type SidebarProps = {
  onNavigate: (view: 'devices' | 'tickets') => void;
  currentView: 'devices' | 'tickets';
};

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  return (
    <aside className="w-2 bg-black-800 text-white h-full left-0 top-0 fixed p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <button
              onClick={() => onNavigate('devices')}
              className={`flex items-center p-2 w-full text-left ${currentView === 'devices' ? 'bg-gray-700' : 'hover:bg-gray-700'
                } rounded`}
            >
              <ServerCog className="mr-2" />
              Devices
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => onNavigate('tickets')}
              className={`flex items-center p-2 w-full text-left ${currentView === 'tickets' ? 'bg-gray-700' : 'hover:bg-gray-700'
                } rounded`}
            >
              <Ticket className="mr-2" />
              Tickets
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
