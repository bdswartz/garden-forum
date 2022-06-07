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
  Box,
  CircularProgress,
  Fab,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

import { green } from "@mui/material/colors";
import { searchPlants } from "../../utils/API";
import { useMutation } from "@apollo/client";
import { QUERY_PLANT, ME } from "../../utils/queries";
import { ADD_PLANT } from "../../utils/mutations";

export default function AddPlantDialog({ open, handleClose }) {
  //loading bar items
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();
  //loading icon special effects
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  //loading icon useEffect
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  //starts timer for load icon
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 4000);
    }
  };
  //plant search setup
  const plantFile = useRef();
  const [plantImg, setPlantImg] = useState([]);
  //change these to proper names below
  const [commonName, setcommonName] = useState();
  const [scientificName, setscientificName] = useState();
  const [imagePath, setImagePath] = useState();
  // Add Pruning, Watering and Fertilization
  const [pruning, setPruning] = useState('');
  const [water, setWatering] = useState('');
  const [fertilization, setFertilization] = useState('');

  //upload plant file
  const onFileChange = (event) => {
    setPlantImg(event.target.files);
  };
  //send plant file to API
  const handleSearch = () => {
    const plantArr = Object.values(plantImg);
    searchPlants(plantArr).then((res) => {
      setcommonName(res.suggestions[0].plant_details.common_names[0]);
      setscientificName(res.suggestions[0].plant_details.scientific_name);
      setImagePath(res.suggestions[0].similar_images[0].url);

      // console.log(plant_name);
      // console.log(res.suggestions[0].plant_details.scientific_name);
      // console.log(res.suggestions[0].similar_images[0].url);
    });
    console.log(commonName);
    console.log(scientificName);
    console.log(imagePath);
  };

  const handlePruning = (event) => {
    setPruning(event.target.value);
  };

  const handleWatering = (event) => {
    setWatering(event.target.value);
  };

  const handleFertilization = (event) => {
    setFertilization(event.target.value);
  };

  const [addPlant, { error }] = useMutation(ADD_PLANT);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addPlant({
        variables: {
          scientificName,
          commonName,
          imagePath,
          pruning,
          fertilization,
          water
        },
      });
      console.log(data);
      // clear form values
      setPlantImg('');
      setImagePath('');
      setcommonName('');
      setscientificName('');
      setPruning('');
      setWatering('');
      setFertilization('');
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
              <Button variant="contained"
                onClick={() => {
                  handleSearch();
                  handleButtonClick();
                }}
              >
                {success ? <CheckIcon /> : <SaveIcon />}
                Identify Plant
              </Button>
              {loading && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: -6,
                    left: -6,
                    zIndex: 1,
                    marginTop: 8,
                    marginLeft: 3
                  }}
                />
              )}
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
            value={commonName || ""}
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
            value={scientificName || ""}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Pruning Info"
            type="text"
            fullWidth
            variant="standard"
            value={pruning}
            onChange={handlePruning}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Watering Info"
            type="text"
            fullWidth
            variant="standard"
            value={water}
            onChange={handleWatering}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Fertilizing Info"
            type="text"
            fullWidth
            variant="standard"
            value={fertilization}
            onChange={handleFertilization}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
          <Button variant="outlined" onClick={handleSubmit}>Add Plant</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
