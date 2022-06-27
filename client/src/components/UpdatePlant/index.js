import * as React from "react";
import { useState } from "react";

//destructure all the items from "@mui/material"
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";

  import { useMutation } from "@apollo/client";
  import { UPDATE_PLANT } from "../../utils/mutations";

const UpdatePlant = ({ open, handleClose, plantInfo }) => {
    // set form state with the plant prop information
    const [formState, setFormState] = useState({
        plantId: plantInfo._id,
        commonName: plantInfo.common_name,
        scientificName: plantInfo.scientific_name,
        description: plantInfo.description,
        usdaZone: plantInfo.usda_zone,
        fertilization: plantInfo.fertilization,
        water: plantInfo.water,
        pruning: plantInfo.pruning
    })
// deconstruct for convenience
    const { scientificName, commonName , description, usdaZone, fertilization, water, pruning } = formState;
// define the mutation
    const [updatePlant, { error }] = useMutation(UPDATE_PLANT);
// handle changes to the form to keep state up to date
    const handleChange = event => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };
//   submit form info and close the dialog
    const handleSubmit = async (event) => {
      event.preventDefault();
      handleClose();
      try {
        const data = await updatePlant({
          variables: formState
        });
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
      <div>
        <Dialog align="center" open={open} onClose={handleClose}>
          <DialogTitle>Update Your Plant</DialogTitle>
  
          <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              label="Common Plant Name"
              name="commonName"
              type="text"
              // key={common_name}
              fullWidth
              variant="standard"
              value={commonName || ""}
              onChange={handleChange}
            />
              <TextField
                autoFocus
                margin="dense"
                name="scientificName"
                label="Scientific Plant Name"
                type="text"
                // key={scientific_name}
                fullWidth
                variant="standard"
                value={scientificName || ""}
              />
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              name="desciption"
              type="text"
              // key={common_name}
              fullWidth
              variant="standard"
              value={description || ""}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="usdaZone"
              label="USDA Zone"
              type="text"
              fullWidth
              variant="standard"
              value={usdaZone || ""}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="pruning"
              label="Pruning Info"
              type="text"
              fullWidth
              variant="standard"
              value={pruning || ""}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="water"
              label="Watering Info"
              type="text"
              fullWidth
              variant="standard"
              value={water}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="fertilization"
              label="Fertilizing Info"
              type="text"
              fullWidth
              variant="standard"
              value={fertilization}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Update Plant!</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default UpdatePlant;
  