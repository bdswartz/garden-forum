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

const NewItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f3f3f5",
  ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: "center",
  overflow: "hidden",
  height: 450,
  width: 450,
  color: theme.palette.text.secondary,
}));

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
      {/* <Box> */}
      {/* <Box
        container
        direction="column"
        alignContent="flex-end"
        onSubmit={handleSubmit}
      > */}
      <Grid
        container
        direction="column"
        alignContent="flex-end"
        onSubmit={handleSubmit}
        component="form"
        sx={{
          display: "grid",
          gap: 4,
          // width: '120',
          "& .MuiTextField-root": { m: 1, width: "45ch" },
          m: 7,
          pt: 1.5,
          px: 2,
          // flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <NewItem elevation={10}>
          <TextField
            onChange={handleChange}
            id="noteBody"
            name="noteBody"
            value={noteBody}
            label="Plant History Entry Text"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mb: 2, width: "90%" }}
          >
            Add Plant History Entry
          </Button>
        </NewItem>
      </Grid>
      {/* </Box> */}
      {/* </Box> */}
    </>
  );
};

export default PlantHistoryForm;
