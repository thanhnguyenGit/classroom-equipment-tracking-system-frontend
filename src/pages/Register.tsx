import axios from "axios";
import React, { useState } from "react";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "congnt",
    fullName: "Nguyen Thanh Cong",
    phone: "0397495958",
    email: "cong.nt207588@sis.hust.edu.vn",
    buildingName: "d9",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const Submit = async () => {
    try {
      const response = await axios.post("/api/staff/create", formData);
      console.log("Registration successful:", response.data);
      setSuccess(true);
      setError(null);
      // Optionally, redirect or clear the form
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError("Registration failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div>
      <button onClick={Submit}>Register</button>
      {success && <p>Registration successful!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
