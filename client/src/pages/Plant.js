import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import PlantCard from "../components/PlantCard";

import { QUERY_PLANT } from "../utils/queries";
import Auth from "../utils/auth";
import PlantHistoryForm from "../components/PlantHistoryForm";
import PlantHistory from "../components/PlantHistory";
import Grid from '@mui/material/Grid';
import { Box, Divider, Paper } from "@mui/material";
import { Typography } from "@mui/material";

const styles = {
  
    flexContainer: {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center'
    },  
    page: {
      backgroundColor: 'background.default',
      minHeight: '100vh'
      // width: '100%',
      // display:'flex',
      // justifyContent: 'center',
      // flexDirection: 'column',
      // alignItems: 'center'
    },
    historyContainer: {
      backgroundColor: '#f3f3f5',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    columnTitle: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'text.primary'
    }
  }
  
const Plant = () => {
  // get the plant id from the url parameters
  const { id: plantId } = useParams();
  console.log(plantId);
  // query the plant using the plantId as the query variable
  const { loading, data } = useQuery(QUERY_PLANT, {
    variables: { id: plantId },
  });
  // when query returns data, send it to the plant variable
  // note: plantHistory is an array inside the plant model
  const plant = data?.plant || {};
  console.log(plant);
  // while waiting for data, let the user know
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={styles.page}>
      <Grid container direction='column' alignItems={'center'}p={3}>
        <Grid item xs={12} my={3}>
          <Typography sx={styles.columnTitle} variant="h4">Garden: Plant History</Typography>
        </Grid>
        <Grid item xs={12}> 
            <PlantCard plantInfo={plant} />
        </Grid>
        <Grid container item columns={24} direction='row' justifyContent='space-between' xs={12} mt={6}>
          <Grid item xs={14}>
            {plant.plantHistory && <PlantHistory history={plant.plantHistory} />}
          </Grid>
          {/* <Divider orientation="vertical" /> */}
          <Grid item xs={9}>
            {/* {Auth.loggedIn() && */}
            <PlantHistoryForm plantId={plant._id} />
            {/* //  } */}
          </Grid>
        </Grid> 
      </Grid>
    </Box>
  );
};

export default Plant;
