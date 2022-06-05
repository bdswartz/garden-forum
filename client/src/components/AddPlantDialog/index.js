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
import { useMutation } from "@apollo/client";
import { QUERY_PLANT, ME } from "../../utils/queries";
import { ADD_PLANT } from "../../utils/mutations";

export default function AddPlantDialog({ open, handleClose }) {
  // const [toggle, setToggle] = useState(false)
  const plantFile = useRef();
  const [plantImg, setPlantImg] = useState([]);
  // const [plantArr, setPlantArr] = useState([]);
  const [plantName, setplantName] = useState();
  const [sciencePlant, setSciencePlant] = useState();
  const [plantPic, setPlantPic] = useState();

  const onFileChange = (event) => {
    setPlantImg(event.target.files);
  };

  const [addPlant, { error }] = useMutation(ADD_PLANT, {
    update(
      cache,
      {
        data: {
          commonName,
          ScientificName,
          imagePath,
          pruning,
          watering,
          fertilization,
        },
      }
    ) {
      try {
        const { me } = cache.readQuery({
          query: ME,
        });
        cache.writeQuery({
          query: ME,
          data: { me: { ...me, plants: [...me.plants, addPlant] } },
        });
      } catch (e) {
        console.warn("First plant by user!");
      }
    },
  });

  const handleSearch = () => {
    const plantArr = Object.values(plantImg);
    searchPlants(plantArr).then((res) => {
      setplantName(res.suggestions[0].plant_details.common_names[0]);
      setSciencePlant(res.suggestions[0].plant_details.scientific_name);
      setPlantPic(res.suggestions[0].similar_images[0].url);

      // console.log(plant_name);
      // console.log(res.suggestions[0].plant_details.scientific_name);
      // console.log(res.suggestions[0].similar_images[0].url);
    });
    console.log(plantName);
    console.log(sciencePlant);
    console.log(plantPic);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPlant({
        variables: {
          commonName,
          ScientificName,
          imagePath,
          pruning,
          watering,
          fertilization,
        },
      });
    } catch (e) {
      console.error(e);
    }
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
            // key={common_name}
            fullWidth
            variant="standard"
            value={plantName}
            // onChange={(res) =>
            // plantArr(res.suggestions[0].plant_details.common_names[0])
            // }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scientific Plant Name"
            type="text"
            // key={scientific_name}
            fullWidth
            variant="standard"
            value={sciencePlant}
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
          <Button onSubmit={handleFormSubmit}>Add Plant!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
