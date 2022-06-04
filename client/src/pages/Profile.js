<<<<<<< HEAD
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
=======
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import img from '../assets/images/igor.jpg';
// import img2 from '../assets/images/malvestida.jpg';
import { Container, Grid, Box } from '@mui/material';
import Garden from '../components/Garden';

const styles = {
  headerContainer: {
    // backgroundColor: `url(${img2})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
};

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <Container sx={{ width: '70%' }}>
        {/* user top card start */}
        <Paper
          style={styles.headerContainer}
          sx={{ p: 5, borderRadius: '0px' }}
        >
          <Grid container sx={{ mt: 3 }}>
            {/* Profile Picture */}
            <Grid item>
              <Avatar alt='flower' src={img} sx={{ width: 156, height: 156 }} />
            </Grid>
            {/* User name and joined info */}
            <Grid item xs={8} sx={{ mt: 1 }}>
              <Container sx={{ ml: 1 }}>
                <h4>
                  <strong>{user.username}</strong>.
                </h4>
                <h6>
                  <strong>Joined:</strong> {user.createdAt}
                </h6>
              </Container>
            </Grid>
          </Grid>
        </Paper>
        {/* user top card end */}

        <Paper sx={{ p: 0, mt: 5, borderRadius: '0px' }}>
          <Garden plants={user.plants}></Garden>
        </Paper>
      </Container>
    </>
>>>>>>> main
  );
};

export default Profile;
