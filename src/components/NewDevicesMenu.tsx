import React, { useRef, useState, useEffect } from "react";
import Popup from 'reactjs-popup'
import ClickableText from "./ClickableText";
import "../styles/NewDevicesMenu.scss"
import { TextField, Box, MenuItem, Snackbar } from "@mui/material";
import { AddEquipment } from "../endpoint/equipment.tsx"
import { NewDevice } from "../data/mockData.ts";
import axios from "axios";

function NewDevicesMenu() {
  const [formData, setFormData] = useState<NewDevice>({
    name: "",
    roomId: 0,
    quantity: 0,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<any>(null);

  // handle input change and update state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // handle adding new device
  const handleSave = async () => {
    if (!formData.name || !formData.roomId || formData.quantity <= 0) {
      setSnackbarMessage("Please fill in all fields correctly.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/equipment/add", formData);
      console.log("Device created successfully:", response.data);
      setSnackbarMessage("Device created successfully!");
      setOpenSnackbar(true);
      setFormData({ name: "", roomId: 0, quantity: 0 }); // reset form data
      ref.current.close(); // close popup
    } catch (error) {
      console.error("Error creating device:", error);
      setSnackbarMessage("Error creating device.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const exit = () => {
    setFormData({ name: "", roomId: 0, quantity: 0 }); // reset form when exiting
    ref.current.close();
  };

  return (
    <>
      <Popup
        ref={ref}
        trigger={<ClickableText text="Add devices" onClick={() => { }} />}
        modal
        nested
      >
        <Box className="modal" component="form" sx={{ display: "flex", flexWrap: 'wrap' }} noValidate autoComplete="off">
          <div className="header"> Add devices </div>
          <div className="content">
            <TextField
              fullWidth
              className="Id"
              required
              id="roomId"
              label="Room ID"
              value={formData.roomId}
              onChange={handleInputChange}
              variant="outlined"
              margin="dense"
            />
            <TextField
              fullWidth
              className="Name"
              id="name"
              label="Device Name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              className="Quantity"
              required
              id="quantity"
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </div>
          <div className="actions">
            <button
              className="savebutton"
              onClick={handleSave}
              disabled={loading} // disable save button while loading
            >
              {loading ? "Saving..." : "SAVE"}
            </button>
            <button className="exitbutton" onClick={exit}>
              Exit
            </button>
          </div>
        </Box>
      </Popup>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
}

export default NewDevicesMenu;
