import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Router>
        <Sidebar />
        <switch>
          <Route path='/system' Component={System} ></Route>
          <Route path='/system/devices' Component={Devices}></Route>
          <Route path='/system/tickets' Component={Tickets}></Route>
        </switch>
      </Router>
      <div className="main-content">
        <Navbar />
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;

const System: React.FC = () => {
  return <div className='system'>System</div>
}
const Devices: React.FC = () => {
  return <div className='system'>Devices</div>
}
const Tickets: React.FC = () => {
  return <div className='system'>Tickets</div>
}
