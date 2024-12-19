import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    staffId: 0,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });


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

  const handleSubmit = async (e, close) => {
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

    try {
      await axios.post("/api/staff/change-password", {
        staffId,
        oldPassword,
        newPassword,
      });
      logout();
      close();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div>Hello</div>
  );
};
