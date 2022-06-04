import React, { useState } from "react";
// import { searchPlants } from "../utils/API";
// import { Navigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import AddPlantDialog from "../components/AddPlantDialog";
import Header from "../components/Header";

const Profile = () => {
  const [open, setOpen] = React.useState(false);

  // //button open/close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Header /> */}
      <Button variant="outlined" onClick={handleClickOpen}>
        Add your OWN plant!
      </Button>{" "}
      <AddPlantDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default Profile;
