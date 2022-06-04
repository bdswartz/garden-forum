import * as React from "react";
import { useState, useRef } from "react";
//destructure all the items from "@mui/material"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { searchPlants } from "../../utils/API";

export default function AddPlantDialog({ open, handleClose }) {
  // const [toggle, setToggle] = useState(false)
  const plantFile = useRef();
  const [first, setFirst] = useState({});

  const handleSearch = () => {
    //wait to console log AFTER uploading file - currently does on click
    console.log(plantFile);
  };

  const handleFileInput = () => {
    // const temp =
    plantFile.current.click();
    // console.log(temp);
  };

  return (
    <div>
      <Dialog align="center" open={open} onClose={handleClose}>
        <DialogTitle>ADD YOUR OWN PLANT</DialogTitle>

        <DialogContent>
          {/* click this btn to identify plant */}
          <Button variant="outlined" onClick={handleFileInput}>
            Identify a new plant
          </Button>{" "}
          <input
            ref={plantFile}
            type="file"
            style={{ display: "none" }}
            multiple
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearch}>Test Button</Button>
        </DialogActions>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Common Plant Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scientific Plant Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Pruning Info"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Watering Info"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Fertilizing Info"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Plant!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
