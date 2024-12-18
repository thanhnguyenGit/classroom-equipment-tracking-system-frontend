import "../styles/Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import DeviceHub from "@mui/icons-material/DeviceHub";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">HUST TICKETS</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/devices" style={{ textDecoration: "none" }}>
            <li>
              <DeviceHub className="icon" />
              <span>Device</span>
            </li>
          </Link>
          <Link to="/tickets" style={{ textDecoration: "none" }}>
            <li>
              <DeviceHub className="icon" />
              <span>Ticket</span>
            </li>
          </Link>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineOutlined className="icon" />
              <span>User</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
