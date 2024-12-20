
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { UpdateDevice } from "../data/mockData";

interface UpdateDeviceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateDevice) => void;
  deviceData: UpdateDevice | null;
}

const UpdateDeviceForm = ({
  open,
  onClose,
  onSubmit,
  deviceData,
}: UpdateDeviceFormProps) => {
  const statuses = [
    "AVAILABLE",
    "UNAVAILABLE",
    "BORROWED",
    "DAMAGED",
    "NORMAL",
    "LOST",
  ];

  const [formData, setFormData] = useState<UpdateDevice>(
    deviceData || { id: 0, name: "", status: "AVAILABLE", quantity: 0 }
  );

  useEffect(() => {
    if (deviceData) {
      setFormData({ ...deviceData });
    }
  }, [deviceData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { name, status, quantity } = formData;
    if (!name || !status || quantity <= 0) {
      alert("Please fill all fields.");
      return;
    }
    await onSubmit(formData);  // Ensure onSubmit handles the POST request
    onClose();
  };

  if (!deviceData) return null;

  return (
    <Popup open={open} modal nested onClose={onClose}>
      <Box
        className="modal"
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
        noValidate
        autoComplete="off"
      >
        <div className="header">Update Device</div>
        <TextField
          fullWidth
          name="name"
          label="Device Name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="quantity"
          label="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          type="number"
          sx={{
            "& input[type=number]": {
              MozAppearance: "textfield", // Remove spin buttons in Firefox
            },
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none", // Remove spin buttons in Chrome, Edge, and Safari
              margin: 0,
            },
          }}
        />
        <TextField
          fullWidth
          name="status"
          select
          label="Status"
          value={formData.status}
          onChange={handleChange}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Exit
          </Button>
        </Box>
      </Box>
    </Popup>
  );
};

export default UpdateDeviceForm;

