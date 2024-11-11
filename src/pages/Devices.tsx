import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import "../styles/Devices.scss"

const Devices = () => {
  return (
    <div className="devices">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className='listContainer'>
          <div className='listTitle'>Devices table</div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
