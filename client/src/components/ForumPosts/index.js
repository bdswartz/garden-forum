import React from 'react';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import AccessibilityIcon from '@mui/icons-material/Accessibility';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const ForumPosts = ({ posts, postText }) => {
    if (!posts.length) {
        return <h1>Oops</h1>;
    }


    return (
      <div>
        {posts &&
      posts.map(posts => (
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        mt: 5,
        maxWidth: 1200,
        flexGrow: 1,
        backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
      >
<Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <AccessibilityIcon sx={{ fontSize: 80 }} />
          {/* <Img alt="complex" src="/src/ower_te.png" /> */}
{/* Image relating to post goes above */}
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid key={posts._id} item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Title of the Forum Post That Would Show a Little of The Post
              </Typography>
              <Typography variant="body2" gutterBottom>
                {posts.postText}
              </Typography>

              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Created by: {posts.username}
              </Typography>
              <Typography variant='body2' color="text.secondary">
              on {posts.createdAt}
              </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
    </Paper>
  ))}
    </div>
  );
}

export default ForumPosts;