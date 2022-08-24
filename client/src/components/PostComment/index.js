import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ADD_COMMENT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Link from '@mui/material/Link';

const styles = {
  postBody: {
    color: 'black', 
    fontSize: 16, 
    pb: 1,
  },
  postCard: {
    mt: '30px',
    height: 'auto',
    px: 4,
    py: 2
  },
  postTag: {
    color: '#878787',
    mb: 1
  },
  postTitle: {
    fontSize: 24,
    py: 2,
    color: 'black',
    fontWeight: 'bold'
  },
  commentForm: {
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: 1
  },
  commentText: {
    mb:4
  }
}

const OnePost = ({ post, postText}) => {
    // const [value, setValue] = React.useState('Controlled');
    const [formState, setFormState] = useState({ commentBody: '' });
    const { username: userParam } = useParams();
    const postId = post._id

    const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
      variables: { username: userParam },
    });
  
    const user = data?.me || data?.user || {};
    console.log(user);
    
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
      //   event.preventDefault();
        try {
          const { data } = await addComment({
            variables: { postId, ...formState },
          });
          Auth.loggedIn();
        } catch (e) {
          console.error(e);
        }
      };
  
  
    return (
      <Grid key={post._id} xs={12}>
      <Paper elevation={6} sx={styles.postCard}>
        <Grid sx={{mb:'20px'}}>
        <Grid>
          <Link href={`/profile/${post.username}`} underline="none" style={{ textDecoration: 'none'}}>
            <Typography variant="body2" sx={styles.postTag}>
                Created by: <Typography variant = 'body2' color = 'primary' sx={{display: 'inline'}}>{post.username}</Typography> on {post.createdAt}
              </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h4" noWrap sx={styles.postTitle}>
            {post.postTitle}
          </Typography>
          <Typography variant="body1" noWrap sx={styles.postBody}>
            {post.postText}
          </Typography>
        </Grid>
        <Grid >
          <Typography color='primary' variant='body3'><ChatIcon sx={{fontSize: 'small', mr:'5px'}}/>
            Comments: {post.commentCount}
          </Typography>
        </Grid>
        </Grid>
        <Grid container justifyContent='space-between' sx={{p: 1}}>
          <Grid xs={12}>
            {post.comments.map((comments, index) => {
              if (post.comments.length) {
                return (
                  <div key={index}>
                  <Link href={`/profile/${comments.username}`} underline="none" style={{ textDecoration: 'none'}}>
                    <Typography variant='body2' sx={styles.postTag}>
                      Comment by <Typography variant = 'body2' color = 'primary' sx={{display: 'inline'}}>{comments.username}</Typography> on {comments.createdAt}</Typography>
                  </Link>
                  <Typography variant='body2' sx={styles.commentText}>{comments.commentBody}</Typography>
                </div>
              )}           
            })}
          </Grid>
           </Grid>
        {Auth.loggedIn() &&
          <Grid xs={12}
            component='form'
            onSubmit={handleFormSubmit}
            sx={styles.commentForm}
              >
              <Typography variant='h7' sx={{mb:1}}>Add a Comment...</Typography>
              <Typography variant='body2' sx={styles.postTag}>Commenting as {user.username} </Typography>
              <TextField
                sx={styles.commentText}
                onChange={handleChange}
                value={formState.commentBody}
                id="commentBody"
                name="commentBody"
                label="Type comment here..."
                multiline
                rows={4}
                />
              <Button type='submit' variant="contained" size="large" sx={{mb: 2}}>
                Create New Comment
              </Button>
          </Grid>
        }
      </Paper>
      </Grid>
      )
  };

export default OnePost;