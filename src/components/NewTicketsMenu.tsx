import React, { useRef, useState, useEffect } from "react";
import Popup from 'reactjs-popup'
import ClickableText from "./ClickableText";
import "../styles/NewDevicesMenu.scss"
import { TextField, Box, MenuItem, Snackbar, Autocomplete, List, ListItem, IconButton } from "@mui/material";
import { Remove, Add } from '@mui/icons-material'
import { Ticket, NewTicket, NewTicketItems } from '../data/mockData';
import axios from "axios";

function NewTicketsMenu() {
  const defaultProps = {
    options: ['loa', 'o cam', 'Mic'],
  };

  const [rows, setRows] = useState<NewTicketItems[]>([]);

  const [formData, setFormData] = useState<NewTicket>({
    borrowerId: 0,
    staffId: 0,
    borrowTime: "",
    returnDeadline: "",
    items: [],
  });

  // Handle adding new ticket
  const handleSave = async () => {
    try {
      const response = await axios.post("/api/order/create", formData);
      console.log("Ticket created successfully:", response.data);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };
  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { equipmentId: 0, quantity: 0, notes: "" }]
    }));
  };

  const handleRemoveRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  };

  const handleItemChange = (index: number, field: keyof NewTicketItems, value: any) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };


  const handleFormChange = (field: keyof NewTicket, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEquipmentChange = (equipment, index) => {
    const updatedRows = [...rows];
    updatedRows[index].equipment = equipment;
    setRows(updatedRows);
  }

  const ref = useRef<any>(null);
  const exit = () => ref.current.close();
  return (
    <Popup
      ref={ref}
      trigger={<ClickableText text="Add tickets" onClick={() => { }} />}
      modal
      nested
    >
      <Box className="modal" component="form" sx={{ display: "flex", flexWrap: 'wrap' }} noValidate autoComplete="off">
        <div className="header"> Add devices </div>
        <div className="content">
          <TextField fullWidth className="borrowerId" id="borrowerId" label="MSSV/MSGV" defaultValue={formData?.staffId} onChange={(e) => handleFormChange("borrowerId", Number(e.target.value))} margin="normal" variant="outlined" />
          <TextField fullWidth className="staffId" id="staffId" label="Id nhan vien" defaultValue={formData?.staffId} onChange={(e) => handleFormChange("staffId", Number(e.target.value))} margin="normal" variant="outlined" />
          <TextField fullWidth className="borrowTime" id="borrowTime" label="Thoi gian muon" defaultValue={formData?.borrowTime} onChange={(e) => handleFormChange("borrowTime", e.target.value)} margin="normal" variant="outlined" />
          <TextField fullWidth className="returnDeadline" id="returnDeadline" label="Thoi gian tra" defaultValue={formData?.returnDeadline} onChange={(e) => handleFormChange("returnDeadline", e.target.value)} margin="normal" variant="outlined" />
          <div>
            <List>
              {formData.items.map((item, index) => (
                <ListItem key={index} disableGutters>
                  <Autocomplete
                    {...defaultProps}
                    fullWidth
                    value={item.equipmentId}
                    onChange={(_, newValue) =>
                      handleItemChange(index, "equipmentId", newValue)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Equipment" variant="outlined" />
                    )}
                  />
                  <TextField
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", Number(e.target.value))
                    }
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Notes"
                    value={item.notes}
                    onChange={(e) => handleItemChange(index, "notes", e.target.value)}
                    margin="normal"
                    variant="outlined"
                  />
                  <IconButton onClick={() => handleRemoveRow(index)}>
                    <Remove />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <IconButton onClick={handleAddRow} color="primary">
              <Add />
            </IconButton>
          </div>
        </div>
        <div className="actions">
          <button className="savebutton" type="button" onClick={handleSave}>
            Save
          </button>
          <button className="exitbutton" type="button" onClick={exit}>
            Exit
          </button>
        </div>
      </Box>
    </Popup>
  );
} export default NewTicketsMenu;


