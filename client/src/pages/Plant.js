import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';

import PlantCard from '../components/PlantCard';

import {QUERY_PLANT} from '../utils/queries';
import Auth from '../utils/auth';
import PlantHistoryForm from '../components/PlantHistoryForm';
import PlantHistory from '../components/PlantHistory'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Plant = () => {
    // get the plant id from the url parameters
    const {id: plantId} = useParams();
    console.log(plantId);
    // query the plant using the plantId as the query variable
    const { loading, data } = useQuery(QUERY_PLANT, {
        variables: { id: plantId },
      });
    // when query returns data, send it to the plant variable
    // note: plantHistory is an array inside the plant model
    const plant = data?.plant || {}
    console.log(plant);
    // while waiting for data, let the user know
    if (loading) {
        return <div>Loading...</div>;
      }

      return (
        <Paper sx={{display: 'flex' , flexDirection: 'row', justifyContent: 'space-between'}}>
          <Box sx={{width:'75%', display: 'flex', flexDirection:'column'}}>
            <Box sx={{width:'100%'}}>
              <PlantCard plantInfo={plant}/>
            </Box>
            <Box sx={{width: '100%'}}>
              {plant.plantHistory && <PlantHistory history={plant.plantHistory} />}
            </Box>
          </Box>
          <Box sx={{width:"20%"}}>
            {Auth.loggedIn() && <PlantHistoryForm plantId={plant._id} />}
          </Box>
        </Paper>
      );    

}

export default Plant;