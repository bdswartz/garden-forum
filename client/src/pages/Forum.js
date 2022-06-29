import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QUERY_POSTS } from '../utils/queries'
import {useQuery} from '@apollo/client';
import ForumPosts from '../components/ForumPosts';
import Grid from '@mui/material/Grid';
import Search from "../components/ForumPosts/Search";
import NewPost from "../components/NewPost";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import { textAlign } from "@mui/system";

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
  flexDirection: 'row',
}
const pageStyle = {
  backgroundColor: '#f3f3f5',
  minHeight: '100vh',
  width: '100%'
}
const postContainerStyle = {
  backgroundColor: '#f3f3f5',
  px: 1,
  pt: '5px',
  width: 'auto',
  m: 0,
}
const columnTitleStyle = {
  fontWeight: 'bold',
  textAlign: 'center'
}

const Forum = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  console.log(posts);
    return (
      <ThemeProvider theme={theme}>
        <Box sx={pageStyle}>
        <Typography variant="h4" sx={columnTitleStyle}>The Garden Forum Community</Typography>
        <Typography variant="h5" sx={columnTitleStyle}>Post Forum</Typography>
        <Grid container sx={containerStyle}>
          {/* Left Column Contains Posts */}
          <Grid xs={9}>
            {loading ? (
               <div>Loading....</div>
            ) : (
              <Grid sx={postContainerStyle}>
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
          <Grid xs={3} sx={postContainerStyle}>
              <NewPost></NewPost>
          </Grid>
        </Grid>
        </Box>
      </ThemeProvider>
   )};

  export default Forum;