import React, { useRef, useState, useEffect } from "react";
import Popup from 'reactjs-popup'
import ClickableText from "./ClickableText";
import "../styles/NewDevicesMenu.scss"
import { TextField, Box, MenuItem, Snackbar, Autocomplete, List, ListItem, IconButton } from "@mui/material";
import { Remove, Add } from '@mui/icons-material'

function NewTicketsMenu() {
  const defaultProps = {
    options: ['loa', 'o cam'],
  };
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    setRows([...rows, ""]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleInputChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index] = value;
    setRows(updatedRows);
  };
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
          <TextField fullWidth className="Id" required id="Id" label="TicketId" defaultValue="previous id + 1" variant="outlined" margin="dense" slotProps={{ input: { readOnly: true, }, }} />
          <TextField fullWidth className="BorrowerId" id="BorrowerId" label="MSSV/MSGV" defaultValue={"..e.g.20207632"} margin="normal" variant="outlined" />
          <TextField fullWidth className="BorrowerName" id="BorrowerName" label="Ten nguoi muon" defaultValue={"..e.g.Nguyen Viet Thanh"} margin="normal" variant="outlined" />
          <div>
            <List>
              {rows.map((row, index) => (
                <ListItem key={index} disableGutters>
                  <Autocomplete
                    {...defaultProps}
                    fullWidth
                    id="equipment_option"
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField {...params} margin="normal" label="Thiet bi" variant="outlined" />
                    )}
                  />
                  <TextField
                    label="So luong"
                    margin="normal"
                    variant="outlined"
                    value={row}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    placeholder={`Input`}
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
          </div>        </div>
        <div className="actions">
          <button className="savebutton" onClick={() => {
            console.log("Save")
          }}>SAVE</button>
          <button
            className="exitbutton"
            onClick={exit}
          >
            Thoat
          </button>
        </div>
      </Box>
    </Popup>
  );
}

export default NewTicketsMenu;


