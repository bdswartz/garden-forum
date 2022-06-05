import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';

import PlantCard from '../components/PlantCard';

import {QUERY_PLANT} from '../utils/queries';
import Auth from '../utils/auth';
import PlantHistoryForm from '../components/PlantHistoryForm';

const Plant = () => {
    // get the plant id from the url parameters
    const {id: plantId} = useParams();
    // query the plant using the plantId as the query variable
    const { loading, queryData } = useQuery(QUERY_PLANT, {
        variables: { id: plantId }
      });
    // when query returns data, send it to the plant variable
    // note: plantHistory is an array inside the plant model
    const plant = queryData?.plant
    // while waiting for data, let the user know
    if (loading) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          <PlantCard plantInfo={plant}/>
          <div>
            {plant.plantHistory && <PlantHistory history={plant.plantHistory} />}
          </div>
          <div>
            {Auth.loggedIn() && <PlantHistoryForm plantId={plant._id} />}
          </div>
        </div>
      );    

}

export default Plant;