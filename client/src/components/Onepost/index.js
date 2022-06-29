import React from 'react';
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



const OnePost = ({ post, postText}) => {
    const [value, setValue] = React.useState('Controlled');
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
      variables: { username: userParam },
    });
  
    const user = data?.me || data?.user || {};
    console.log(user);
  
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
        </Paper>
        </Grid>
    )
};

export default OnePost;