import React from "react";
import { QUERY_POST } from '../utils/queries'
import {useQuery} from '@apollo/client';
import PostComment from '../components/PostComment';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

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
    textAlign: 'center',
    pt:4
  }
  
  const columnSubTitleStyle = {
    fontWeight: 'bold',
    textAlign: 'center'
  }

const Singlepost = () => {
    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id:id },
    });

  const post = data?.post
  
    return (
          <Box sx={pageStyle}>
            <Typography variant="h4" sx={columnTitleStyle}>The Garden Forum Community</Typography>
            <Typography variant="h5" sx={columnSubTitleStyle}>Post Thread</Typography>
            <Grid container sx={containerStyle}>
              <Grid xs={9} sx={containerStyle}>
                {loading ? (
                  <div>Loading....</div>
                ) : (
                  <PostComment post={post}>
                  </PostComment>)
                }
              </Grid>
          </Grid>
          </Box>
  )}

  // if (Auth.loggedIn()) {
  //   return (
  //     <ThemeProvider theme={theme}>
  //         <Box sx={pageStyle}>
  //           <Typography variant="h4" sx={columnTitleStyle}>The Garden Forum Community</Typography>
  //           <Typography variant="h5" sx={columnTitleStyle}>Post Thread</Typography>
  //           <Grid container sx={containerStyle}>
  //             <Grid xs={9} sx={containerStyle}>
  //               {loading ? (
  //                 <div>Loading....</div>
  //               ) : (
  //                 <CommentPost post={post}>
  //                 </CommentPost>)
  //               }
  //             </Grid>
  //         </Grid>
  //         </Box>
  //     </ThemeProvider>
  // )}
;
export default Singlepost;