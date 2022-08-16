import * as React from "react";
import { useState, useRef } from "react";
//destructure all the items from "@mui/material"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

import { green } from "@mui/material/colors";
import { searchPlants } from "../../utils/API";
import { useMutation } from "@apollo/client";
import { ME } from "../../utils/queries";
import { ADD_PLANT } from "../../utils/mutations";

export default function AddPlantDialog({ open, handleClose }) {
  //loading bar items
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();
  
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
      }, 6000);
    }
  };
  //plant search setup
  const plantFile = useRef();

  // set form state with the plant prop information
  const [formState, setFormState] = useState({
    commonName: '',
    scientificName:'',
    imagePath:'',
    description: '',
    usdaZone: '',
    fertilization: '',
    water: '',
    pruning: ''
  })
  // deconstruct for convenience
  const { scientificName, commonName, imagePath, description, usdaZone, fertilization, water, pruning } = formState;
  
  const [plantImg, setPlantImg] = useState([]);
  //upload plant file
  const onFileChange = (event) => {
    setPlantImg(event.target.files);
  };
  //send plant file to API
  const handleSearch = () => {
    const plantArr = Object.values(plantImg);
    searchPlants(plantArr).then((res) => {
      setFormState ({...formState, 
        commonName: res.suggestions[0].plant_details.common_names[0],
        scientificName: res.suggestions[0].plant_details.scientific_name,
        imagePath: res.suggestions[0].similar_images[0].url
      })

    });
    console.log(commonName);
    console.log(scientificName);
    console.log(imagePath);
  };

  // handle changes to the form to keep state up to date
  const handleChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
};


  const [addPlant, { error }] = useMutation(ADD_PLANT, {
    refetchQueries: [{ query: ME }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addPlant({
        variables: formState
        
      });
      console.log(data);
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
              <Button
                variant="contained"
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
                    marginLeft: 3,
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
            name='commonName'
            // key={common_name}
            fullWidth
            variant="standard"
            value={commonName || ""}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scientific Plant Name"
            type="text"
            name='scientificName'
            // key={scientific_name}
            fullWidth
            variant="standard"
            value={scientificName || ""}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Plant Image Path"
            name='imagePath'
            type="text"
            fullWidth
            variant="standard"
            value={imagePath}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Plant Description"
            name='description'
            type="text"
            fullWidth
            variant="standard"
            value={description}
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
            label="Pruning Info"
            name='pruning'
            type="text"
            fullWidth
            variant="standard"
            value={pruning}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Watering Info"
            name='water'
            type="text"
            fullWidth
            variant="standard"
            value={water}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Fertilizing Info"
            name='fertilization'
            type="text"
            fullWidth
            variant="standard"
            value={fertilization}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outlined" onClick={handleSubmit}>
            Add Plant
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
