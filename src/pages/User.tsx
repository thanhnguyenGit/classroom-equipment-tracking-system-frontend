import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

const User = () => {
  const [staff, setStaff] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/staff/list");
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.post(`/api/staff/delete/${id}`);
      setStaff(staff.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };
  const handleAddStaff = async (newStaff) => {
    try {
      const response = await axios.post("/api/staff/create", newStaff);
      setStaff([...staff, response.data]);
    } catch (error) {
      console.error("Error creating new staff:", error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets"></div>
        <div className="listContainer">
          <Button variant="contained" onClick={() => setDialogOpen(true)}>Add new staff</Button>
          <RegisterForm
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSubmit={handleAddStaff}
          />
          <div className="listTitle"></div>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="staff table">
              <TableHead>
                <TableRow>
                  <TableCell>Staff ID</TableCell>
                  <TableCell className="tableCell">Name</TableCell>
                  <TableCell className="tableCell">Email</TableCell>
                  <TableCell className="tableCell">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="tableCell">{item.id}</TableCell>
                    <TableCell className="tableCell">{item.name}</TableCell>
                    <TableCell className="tableCell">{item.email}</TableCell>
                    <TableCell className="tableCell">{item.phone}</TableCell>
                    <TableCell className="tableCell">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default User;
