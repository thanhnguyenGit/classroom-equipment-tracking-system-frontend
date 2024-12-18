import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";
import Table from "../components/Table";
import "../styles/Dashboard.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the string to a JavaScript object
      if (parsedUser.firstLogin) {
        navigate("/firstLogin"); // Navigate to the first login page if firstLogin is false
      }
    }
  }, [navigate]);
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="tickets" />
          <Widget type="devices" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Ticket table</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
