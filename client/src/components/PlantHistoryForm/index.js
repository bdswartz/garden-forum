import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useMutation } from "@apollo/client";
import { ADD_PLANT_HISTORY } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "../../index.css";
import UpdatePlant from "../UpdatePlant";
import AddCommentIcon from '@mui/icons-material/AddComment';

// const NewItem = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f3f3f5",
//   ...theme.typography.body1,
//   padding: theme.spacing(4),
//   textAlign: "center",
//   overflow: "hidden",
//   height: 450,
//   width: 450,
//   color: theme.palette.text.secondary,
// }));

const styles = {
  formContainer: {
    backgroundColor: '#fff',
    padding: 2,
    textAlign: 'center',
    overflow: 'hidden',
    height: 'auto',
    width: 'auto',
    color: '#64dd20',
    mt:'10px'
  },
  textField:{
    width: '95%',
    my: 2,
  }
}

const PlantHistoryForm = ({ plantId }) => {
  const [addPlantHistory, { error }] = useMutation(ADD_PLANT_HISTORY);
  const [noteBody, setNoteBody] = useState("");

  const handleChange = (event) => {
    setNoteBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addPlantHistory({
        variables: { plantId, noteBody },
      });
      Auth.loggedIn();
      setNoteBody("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Grid
        item
        container
        component="form"
        onSubmit={handleSubmit}
        width='100%'
        noValidate
        autoComplete="off"
      >
        <Paper sx={styles.formContainer} elevation={6}>
          <TextField
            item
            sx={styles.textField}
            onChange={handleChange}
            id="noteBody"
            name="noteBody"
            value={noteBody}
            label="Enter New Plant History Item"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mb: 2, width: "auto" }}
          >
            <AddCommentIcon sx={{fontSize: 'medium', mr:'5px'}}/>
            Add Plant History Entry
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default PlantHistoryForm;
