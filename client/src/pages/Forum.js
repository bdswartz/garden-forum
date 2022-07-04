import React from "react";
import { QUERY_POSTS } from '../utils/queries'
import {useQuery} from '@apollo/client';
import ForumPosts from '../components/ForumPosts';
import Grid from '@mui/material/Grid';
import Search from "../components/ForumPosts/Search";
import NewPost from "../components/NewPost";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

const styles = {
container: {
    display:'flex',
    flexDirection: 'row',
  },
  flexContainer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent:'center'
  },
  page: {
    backgroundColor: '#f3f3f5',
    minHeight: '100vh',
    width: '100%'
  },
  postContainer: {
    backgroundColor: '#f3f3f5',
    px: 1,
    pt: '5px',
    width: 'auto',
    m: 0,
  },
  columnTitle: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
}


const Forum = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  console.log(posts);
    return (
        <Box sx={styles.page}>
        <Typography variant="h4" sx={styles.columnTitle}>The Garden Forum Community</Typography>
        <Typography variant="h5" sx={styles.columnTitle}>Post Forum</Typography>
        <Box container sx={styles.flexContainer}>
        <Grid container xs={11} sx={styles.container}>
          {/* Left Column Contains Posts */}
          <Grid xs={8}>
            {loading ? (
               <div>Loading....</div>
            ) : (
              <Grid sx={styles.postContainer}>
                  {!posts.length && 
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs>
                          <h1>Nobody has posted yet. Be first and start the party!</h1>
                        </Grid>
                      </Grid>
                    </>
                    }
                <ForumPosts posts={posts}>
                </ForumPosts>
              </Grid>
          )}
          </Grid>
          {/* Right Column Add New Posts */}  
          <Grid xs={4} sx={styles.postContainer}>
              <NewPost></NewPost>
          </Grid>
        </Grid>
        </Box>
        </Box>
   )};

  export default Forum;