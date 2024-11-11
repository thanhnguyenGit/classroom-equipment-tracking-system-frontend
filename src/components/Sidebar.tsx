import "../styles/Sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='top'>
        <span className='logo'>HUSTticket</span>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span >Ticket</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span >Device</span>
          </li>
          <p className="title">Personal</p>
          <li>
            <DashboardIcon className="icon" />
            <span >User</span>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
