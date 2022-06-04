import React from "react";
import { QUERY_POST, QUERY_POSTS } from '../utils/queries'
import {useQuery} from '@apollo/client';
import Onepost from '../components/Onepost';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useParams } from 'react-router-dom';


const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#64dd20',
      },
    },
   
  });





const Singlepost = () => {
    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id:id },
    });


    const post = data?.post
    console.log(post);
      return <ThemeProvider theme={theme}>
    {loading ? (
          <div>Loading....</div>
          ) : (
            <Onepost post={post}>
            </Onepost>
          )}
    </ThemeProvider>
  
  };
    
    export default Singlepost;