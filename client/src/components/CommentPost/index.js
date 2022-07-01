import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import styled from '@emotion/styled';
import NewComment from '../NewComment';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ME, QUERY_POST, QUERY_POSTS } from '../../utils/queries';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ADD_COMMENT } from '../../utils/mutations';



const Leftitem = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFE7E2',
    ...theme.typography.body1,
    padding: theme.spacing(4),
    textAlign: 'left',
    border: 2,
    // overflow: 'hidden',
    // height: 300,
    width: 800,
    // maxWidth: 400,
    color: theme.palette.text.secondary,
  }));
  
const NewItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f3f3f5',
   ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: 'center',
  overflow: 'hidden',
  height: 450,
  width: 450,
  color: theme.palette.text.secondary,
  }));

const CommentPost = ({ post, postText }) => {
    const  { data, loading  } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    const postId = post._id
    const { loading: comments } = useQuery(QUERY_POST, {
        variables: {id:post._id},
    })
    const [formState, setFormState] = useState({ commentBody: '' });
    const { commentBody } = formState;
    
    const [addComment, { error }] = useMutation(ADD_COMMENT);
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      
      setFormState({
        ...formState,
        [name]: value,
      });
    };
    console.log(postId)
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
  
  return(
      <Grid container justifyContent='space-between' sx={{p: 10,}}>
        <Leftitem>
        <Grid item xs={6}>
            <div>
    <Typography variant='h3' sx={{pt: 5, pb: 5,}}>{posts.postTitle}</Typography>
    <div>
    <Typography variant='body1'>Post was created on {post.createdAt} by {post.username}</Typography>
        </div>
    <Typography variant='h5' sx={{pb: 3, pt: 3}}>{post.postText}</Typography>

    <Typography variant='h4'>Post Comments</Typography>
    </div>
      {post.comments?.map((post, index) => {
          return( <h1>{posts.postTitle}</h1>
        )})}
    {post.comments.map((comments, index) => {
        if (post.comments.length) {
            return (
            <div key={index}>
    <Typography variant='h6'>{comments.commentBody}</Typography>
    <Typography variant='body2' sx={{pb: 4,}}>{comments.createdAt} by: {comments.username} </Typography>
    </div>
            )
        }

    })}
 
    </Grid>
    </Leftitem>
    <NewItem
      component='form'
      noValidate
      onSubmit={handleFormSubmit}
      elevation={10}>
  <Grid item xs={6} sx={{
    display: 'grid',
    gap: 2,
    '& .MuiTextField-root': { m: 1, width: '45ch' },
    m: 2,}}>
        <Button type='submit' variant="contained" size="large" sx={{mb: 2, width: 345,}}>
      Create New Comment
        </Button>
  
  
    <TextField
            onChange={handleChange}
            value={formState.commentBody}
            id="commentBody"
            name="commentBody"
            label="Type comment here..."
            multiline
            rows={4}
          />
    </Grid>
    </NewItem>
        </Grid>
    )
    }
    
export default CommentPost;