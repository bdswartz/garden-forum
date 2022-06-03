import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid/';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { QUERY_POSTS } from '../utils/queries'
import {useQuery} from '@apollo/client';
import ForumPosts from '../components/ForumPosts';
import Jumbotron from "../components/Jumbotron";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
const Forum = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  console.log(posts);
    return <ThemeProvider theme={theme}>
      <Jumbotron></Jumbotron>
    <Container component='main' maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {loading ? (
          <div>Loading....</div>
          ) : (
          <ForumPosts posts={posts}></ForumPosts>
          )}
        </Grid>
      </Grid>
    </Container>
  </ThemeProvider>

};
  
  export default Forum;