import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    staffId: 0,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { logout } = useAuth();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.id) {
          setFormData((prev) => ({ ...prev, staffId: parsedUser.id }));
        } else {
          console.error("Invalid user data in localStorage");
        }
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    } else {
      console.warn("No user data found in localStorage");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword, staffId } = formData;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      alert("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    console.log("Form submitted", { staffId, oldPassword, newPassword });
    try {
      await axios.post("/api/staff/change-password", {
        staffId,
        oldPassword,
        newPassword,
      });
      logout()
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Enter old password"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
          />
          <TextField
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Change Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
