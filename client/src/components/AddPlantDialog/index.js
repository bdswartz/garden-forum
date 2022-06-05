import * as React from "react";
import { useState, useRef } from "react";
//destructure all the items from "@mui/material"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { searchPlants } from "../../utils/API";
import { useQuery } from "@apollo/client";
import { QUERY_PLANT } from "../../utils/queries";

export default function AddPlantDialog({ open, handleClose }) {
  // const [toggle, setToggle] = useState(false)
  const plantFile = useRef();
  const [plantImg, setPlantImg] = useState([]);

  const onFileChange = (event) => {
    setPlantImg(event.target.files);
  };

  let plant_name = "";
  let scientific_name = "";
  let plant_img = "";

  const handleSearch = () => {
    const plantArr = Object.values(plantImg);
    searchPlants(plantArr).then((res) => {
      plant_name = res.suggestions[0].plant_details.common_names[0];
      scientific_name = res.suggestions[0].plant_details.scientific_name;
      plant_img = res.suggestions[0].similar_images[0].url;

      console.log(plant_name);
      console.log(scientific_name);
      console.log(plant_img);

      // let plant_name = res.suggestions[0].plant_details.common_names[0];
      // const scientific_name = res.suggestions[0].plant_details.scientific_name;
      // const plant_img = res.suggestions[0].similar_images[0].url;

      return plant_name;
    });
  };

  return (
    <div>
      <Dialog align="center" open={open} onClose={handleClose}>
        <DialogTitle>Add a New Plant</DialogTitle>

        <DialogContent>
          <div>
            <label>Upload an image to identify a new plant!</label>
            <input
              ref={plantFile}
              type="file"
              // style={{ display: "none" }}
              onChange={onFileChange}
              multiple
            />
            <DialogActions align="center">
              <Button onClick={handleSearch}>Identify Plant</Button>
            </DialogActions>
          </div>
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Common Plant Name"
            type="text"
            fullWidth
            variant="standard"
            // value={plant_name}
          />
          {plant_name}
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
