import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import "../styles/Dashboard.scss"
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        container
      </div>
    </div>
  );
};

export default Dashboard;
