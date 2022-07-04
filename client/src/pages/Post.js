import React from "react";
import { QUERY_POST } from '../utils/queries'
import {useQuery} from '@apollo/client';
import PostComment from '../components/PostComment';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

const styles = {
  container: {
    display:'flex',
    justifyContent: 'center'  
  },
  page: {
    backgroundColor: '#f3f3f5',
    minHeight: '100vh',
    width: '100%'
  },
  columnTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    pt:4
  },
  columnSubTitle: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
}

const Singlepost = () => {
    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id:id },
    });

  const post = data?.post
  
    return (
          <Box sx={styles.page}>
            <Typography variant="h4" sx={styles.columnTitle}>The Garden Forum Community</Typography>
            <Typography variant="h5" sx={styles.columnSubTitle}>Post Thread</Typography>
            <Grid container sx={styles.container}>
              <Grid xs={9} sx={styles.container}>
                {loading ? (
                  <div>Loading....</div>
                ) : (
                  <PostComment post={post}>
                  </PostComment>)
                }
              </Grid>
          </Grid>
          </Box>
  )};
export default Singlepost;