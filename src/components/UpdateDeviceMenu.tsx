import React, { useRef, useState, useEffect } from "react";
import Popup from 'reactjs-popup'
import ClickableText from "./ClickableText";
import "../styles/NewDevicesMenu.scss"
import { TextField, Box, MenuItem, Snackbar } from "@mui/material";
import { AddEquipment } from "../endpoint/equipment.tsx"
import { NewDevice, RoomListId, UpdateDevice } from "../data/mockData.ts";
import axios from "axios";


interface UpdateDevicesMenuProps {
  deviceToEdit: UpdateDevice | null;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

function UpdateDevicesMenu({
  deviceToEdit,
  onClose,
  onUpdateSuccess,
}: UpdateDevicesMenuProps) {
  const [formData, setFormData] = useState<UpdateDevice>({
    id: 0,
    name: "",
    status: "AVAILABLE",
    quantity: 0,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<any>(null);

  // Initialize the formData with the device data to edit
  React.useEffect(() => {
    if (deviceToEdit) {
      setFormData(deviceToEdit);
    }
  }, [deviceToEdit]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle saving the edited device
  const handleSave = async () => {
    if (!formData.name || formData.quantity <= 0) {
      setSnackbarMessage("Please fill in all fields correctly.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/equipment/update", formData);
      console.log("Device updated successfully:", response.data);
      setSnackbarMessage("Device updated successfully!");
      setOpenSnackbar(true);
      onUpdateSuccess(); // Trigger update success handler
      ref.current.close(); // Close the popup
    } catch (error) {
      console.error("Error updating device:", error);
      setSnackbarMessage("Error updating device.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const exit = () => {
    setFormData({ id: 0, name: "", status: "AVAILABLE", quantity: 0 }); // reset form when exiting
    onClose(); // Close the popup menu
  };

  return (
    <>
      <Popup ref={ref} open={deviceToEdit !== null} modal nested>
        <Box
          className="modal"
          component="form"
          sx={{ display: "flex", flexWrap: "wrap" }}
          noValidate
          autoComplete="off"
        >
          <div className="header">Edit Device</div>
          <div className="content">
            <TextField
              fullWidth
              className="Name"
              required
              id="name"
              label="Device Name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
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
export default UpdateDevicesMenu;
