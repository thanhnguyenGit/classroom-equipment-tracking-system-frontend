import React, { useState } from "react";
import axios from "axios";
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

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    staffId: "", // Add staff ID input
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      setSuccessMessage("");
      return;
    }

    try {
      // API call using Axios
      const response = await axios.post("/staff/change-password", {
        staffId: Number(formData.staffId), // Ensure ID is numeric
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      // Success response handling
      if (response.status === 200) {
        setSuccessMessage("Password changed successfully!");
        setError("");
        setFormData({ staffId: "", oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      // Error handling
      if (err.response) {
        setError(err.response.data.message || "Failed to change password.");
      } else {
        setError("Error connecting to the server.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Change Password
        </Typography>
        {error && (
          <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography color="success" sx={{ textAlign: "center", mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter Staff ID"
            name="staffId"
            fullWidth
            required
            value={formData.staffId}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            placeholder="Enter old password"
            name="oldPassword"
            fullWidth
            required
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            placeholder="Enter new password"
            name="newPassword"
            fullWidth
            required
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            placeholder="Confirm new password"
            name="confirmPassword"
            fullWidth
            required
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Change Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
