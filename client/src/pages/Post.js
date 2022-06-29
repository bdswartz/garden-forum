import React from "react";
import { QUERY_POST } from '../utils/queries'
import {useQuery} from '@apollo/client';
import OnePost from '../components/Onepost';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import CommentPost from '../components/CommentPost';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

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

  const containerStyle = {
    display:'flex',
    justifyContent: 'center'  
  }
  const pageStyle = {
    backgroundColor: '#f3f3f5',
    minHeight: '100vh',
    width: '100%'
  }

  const columnTitleStyle = {
    fontWeight: 'bold',
    textAlign: 'center'
  }
  

const Singlepost = () => {
    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id:id },
    });

  const post = data?.post
  console.log("🚀 ~ file: Post.js ~ line 30 ~ Singlepost ~ post", post)
  
  if (!Auth.loggedIn()) {
    return (
      <ThemeProvider theme={theme}>
          <Box sx={pageStyle}>
            <Typography variant="h4" sx={columnTitleStyle}>The Garden Forum Community</Typography>
            <Typography variant="h5" sx={columnTitleStyle}>Post Thread</Typography>
            <Grid container sx={containerStyle}>
              <Grid xs={9} sx={containerStyle}>
                {loading ? (
                  <div>Loading....</div>
                ) : (
                  <OnePost post={post}>
                  </OnePost>)
                }
              </Grid>
          </Grid>
          </Box>
      </ThemeProvider>
  )}

};
export default Singlepost;