import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Widget from '../components/Widget';
import Table from '../components/Table';
import "../styles/Dashboard.scss"
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className='widgets'>
          <Widget type="tickets" />
          <Widget type="devices" />
        </div>
        <div className='listContainer'>
          <div className='listTitle'>Ticket table</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
