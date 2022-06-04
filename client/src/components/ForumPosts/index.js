import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import GotIt from './yougot_it.gif';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFE7E2',
  ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: 'left',
  border: 2,
  overflow: 'hidden',
  height: 300,
  color: theme.palette.text.secondary,
}));

const ForumPosts = ({ posts, postText }) => {
    if (!posts.length) {
        return (
        <div>
          <Grid 
          container 
          spacing={3}>
            <Grid item xs>
            <h1>Nobody has posted yet. Be first and start the party!</h1>
            </Grid>
            <Grid item xs>
        <img src={GotIt} alt="Gif" height="100"/>
        </Grid>
        </Grid>
        </div>
        );
    }


    return (
<Grid container direction='column' alignContent='center'>
<Grid container 
spacing={2}
sx={{
  width: 900,
  pt: 8,
}}
>
{posts && posts.map(posts => (
  <Grid item zeroMinWidth key={posts._id} xs={12}>
      <Item elevation={24}
 sx={{
        border: 2,
        borderColor: '#4caf50', 
      }}>
<Typography noWrap variant="h3">Post Title</Typography>
      <Typography noWrap variant="body1">
               {posts.postText}
           </Typography>
           <Typography variant="body1">
                 Created by: {posts.username}
               </Typography>
               <Typography variant='body1'>
               on {posts.createdAt}
               </Typography>
      </Item>
  </Grid>
    ))}
</Grid>
</Grid>

   );
 }

export default ForumPosts;