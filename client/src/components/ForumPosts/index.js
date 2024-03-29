import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ChatIcon from '@mui/icons-material/Chat';

const styles = {
  postTitle: {
    fontSize: 24,
    py: 2,
    color: 'text.primary'
  },
  postBody: {
    fontSize: 16, 
    py: 1,
    px: 3,
    color: 'text.secondary'
  },
  postCard: {
    mt: '10px',
    height: 'auto',
    padding: 2,
    bgcolor: 'background.paper'
  },
  postTag:{
    color: 'text.secondary'
  }
}

// Page that appears when no posts are present
const ForumPosts = ({ posts, postText }) => {
console.log("🚀 ~ file: index.js ~ line 35 ~ ForumPosts ~ posts", posts)
  // const [value, setValue] = React.useState('Controlled');

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

    return (
      <>
      {posts && posts.map(posts => (
        <Grid item key={posts._id} xs={12}>
        < Grid elevation={6} sx={styles.postCard}>
            <Grid>
            <Link href={`/profile/${posts.username}`} underline="none" style={{ textDecoration: 'none'}}>
              <Typography variant="body2" sx={styles.postTag}>
                 Created by: <Typography variant = 'body2' color = 'primary' sx={{display: 'inline'}}>{posts.username}</Typography> on {posts.createdAt}
               </Typography>
               </Link>
            </Grid> 
            <Typography noWrap variant="h7" gutterBottom sx={styles.postTitle}>{posts.postTitle}</Typography>
            <Grid item>
              <Typography variant="body1" sx={styles.postBody}>
               {posts.postText}
              </Typography>
           </Grid>
            <Link href={`/forum/${posts._id}`} underline="none" style={{ textDecoration: 'none'}}>
               <Typography variant='body2'><ChatIcon sx={{fontSize: 'small', mr:'5px'}}/>
                 Comments: {posts.commentCount}
               </Typography>
            </Link>
          </Grid>
          </Grid>
     ))}
      </>
   )};

export default ForumPosts;