import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import styled from '@emotion/styled';
import NewComment from '../NewComment';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ADD_COMMENT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

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

// const Leftitem = styled(Paper)(({ theme }) => ({
//     // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFE7E2',
//     ...theme.typography.body1,
//     padding: theme.spacing(4),
//     textAlign: 'left',
//     border: 2,
//     // overflow: 'hidden',
//     // height: 300,
//     width: 800,
//     // maxWidth: 400,
//     color: theme.palette.text.secondary,
//   }));
  // const NewItem = styled(Paper)(({ theme }) => ({
  //    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f3f3f5',
  //   ...theme.typography.body1,
  //   padding: theme.spacing(4),
  //   textAlign: 'center',
  //   overflow: 'hidden',
  //   height: 450,
  //   width: 450,
  //   color: theme.palette.text.secondary,
  // }));


const OnePost = ({ post, postText}) => {
    // const [value, setValue] = React.useState('Controlled');
    const [formState, setFormState] = useState({ commentBody: '' });
    const { username: userParam } = useParams();
    const postId = post._id

    const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
      variables: { username: userParam },
    });
  
    const user = data?.me || data?.user || {};
    // console.log(user);
    
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
      <Paper elevation={6} sx={postCardStyle}>
          <Grid>
            <Typography variant="body2" sx={postTagStyle}>
               Created by: {post.username} on {post.createdAt}
             </Typography>
          <Typography noWrap variant="h7" gutterBottom sx={postTitleStyle}>{post.postTitle}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" noWrap sx={postBodyStyle}>
             {post.postText}
            </Typography>
         </Grid>
             <Typography variant='body2'><ChatIcon sx={{fontSize: 'small', mr:'5px'}}/>
               Comments: {post.commentCount}
             </Typography>
        <Grid item xs={12}
          component='form'
          onSubmit={handleFormSubmit}
          sx={{
            display: 'grid',
            gap: 2,
            '& .MuiTextField-root': { m: 0, width: '100%' },
            m: 6}}
            >
          <TextField
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
        <Grid container justifyContent='space-between' sx={{p: 1}}>
        <Grid xs={12}>
          {post.comments.map((comments, index) => {
            if (post.comments.length) {
              return (
                <div key={index}>
                <Typography variant='h6'>{comments.commentBody}</Typography>
                <Typography variant='body2' sx={{pb: 1}}>{comments.createdAt} by: {comments.username} </Typography>
              </div>
            )}           
          })}
        </Grid>
        </Grid>
          </Paper>
        </Grid>
      )
  };

export default OnePost;