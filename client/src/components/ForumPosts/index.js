import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import GotIt from './yougot_it.gif';
import Igor from '../../assets/images/igor.jpg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NewPost from '../NewPost';

const RightItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFFFFF',
 ...theme.typography.body1,
padding: theme.spacing(2),
textAlign: 'center',
overflow: 'hidden',
height: 200,
width: 450,
color: theme.palette.text.secondary,
}));

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFE7E2',
  ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: 'left',
  border: 2,
  overflow: 'hidden',
  height: 300,
  color: theme.palette.text.secondary,
}));


// Page that appears when no posts are present
const ForumPosts = ({ posts, postText }) => {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
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
      
<Box
    className="image"
    style={{
    backgroundImage: `url(${Igor})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: "cover",
    height: "100vh",
    color: "#f5f5f5",
    backgroundPosition: 'left',
}}>
  {/* Outer Wrapper of Grid content */}
  <Grid container>
    {/* Begin Left Side of Page */}
    <Grid item xs={6}>
<Grid container direction='column' alignContent='flex-start'>
<Grid container 
spacing={3}
sx={{
  marginLeft: 4,
  width: 900,
  p: 8,
}}
>
{posts && posts.map(posts => (
  <Grid item zeroMinWidth key={posts._id} xs={6}>
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
</Grid>
{/* End Left Side of Page */}
{/* Begin Right Side of Page */}
<Grid item xs={6}>
<Grid container direction='column' alignContent='flex-end'>
  
<NewPost />
</Grid>
</Grid>
</Grid>
</Box>
   );
 }

export default ForumPosts;