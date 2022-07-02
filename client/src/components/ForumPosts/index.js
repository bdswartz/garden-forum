import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NewPost from '../NewPost';
import Link from '@mui/material/Link';
import ChatIcon from '@mui/icons-material/Chat';

const postTitleStyle = {
  fontSize: 24,
  py: 2,
  color: 'black'
}
const postBodyStyle = {
  color: 'black', 
  fontSize: 16, 
  pb: 1,
}

const postCardStyle = {
  mt: '10px',
  height: 'auto',
  padding: 2
}
const postTagStyle = {
  color: '#878787'
}


// Page that appears when no posts are present
const ForumPosts = ({ posts, postText }) => {
  // const [value, setValue] = React.useState('Controlled');

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

    return (
      <>
      {posts && posts.map(posts => (
        <Grid item key={posts._id} xs={12}>
        <Paper elevation={6} sx={postCardStyle}>
         <Link href={`/forum/${posts._id}`} underline="none" style={{ textDecoration: 'none'}}>
            <Grid>
              <Typography variant="body2" sx={postTagStyle}>
                 Created by: {posts.username} on {posts.createdAt}
               </Typography>
            <Typography noWrap variant="h7" gutterBottom sx={postTitleStyle}>{posts.postTitle}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" noWrap sx={postBodyStyle}>
               {posts.postText}
              </Typography>
           </Grid>
               <Typography variant='body2'><ChatIcon sx={{fontSize: 'small', mr:'5px'}}/>
                 Comments: {posts.commentCount}
               </Typography>
          </Link>
          </Paper>
          </Grid>
     ))}
      </>
   )};

export default ForumPosts;