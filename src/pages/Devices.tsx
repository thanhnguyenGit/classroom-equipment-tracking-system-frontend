import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import "../styles/Devices.scss"
import DevicesTable from "../components/DeviceTable";

const Devices = () => {
  return (
    <div className="devices">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DevicesTable />
      </div>
    </div>
  );
};

export default Devices;
