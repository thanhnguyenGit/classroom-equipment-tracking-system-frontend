import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    Avatar,
    Box,
    Container,
    Paper,
    TextField,
    Typography,
    Button,
    Grid,
} from "@mui/material";
const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Staff",
    buildingName: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);

      const role = parsedUser.admin ? "Admin" : "Staff";
      const buildingName = parsedUser.buildingId?.buildingName || "N/A";

      setProfileData({
        name: parsedUser.name,
        email: parsedUser.email,
        phone: parsedUser.phone,
        role,
        buildingName,
      });
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container maxWidth="sm">
          <Paper elevation={10} sx={{ p: 4, mt: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "secondary.main",
                  mr: 2,
                }}
              >
                <Typography variant="h4">
                  {profileData.name.charAt(0).toUpperCase()}
                </Typography>
              </Avatar>
              <Box>
                <Typography variant="h5">{profileData.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {profileData.role}
                </Typography>
              </Box>
            </Box>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={profileData.name}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={profileData.email}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={profileData.phone}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Building"
              fullWidth
              margin="normal"
              value={profileData.buildingName}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Role"
              fullWidth
              margin="normal"
              value={profileData.role}
              InputProps={{ readOnly: true }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button variant="contained" color="primary">
                Change Password
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
