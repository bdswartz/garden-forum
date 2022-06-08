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



const Onepost = ({ post, postText }) => {
    const [value, setValue] = React.useState('Controlled');
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
      variables: { username: userParam },
    });
  
    const user = data?.me || data?.user || {};
    console.log(user);
  


    return (
                <Grid container justifyContent='space-between' sx={{p: 10,}}>
        <Leftitem>
        <Grid item xs={6}>

    <div>
    <Typography variant='h5'>{post.postTitle}</Typography>
    </div>
    <div>
    <Typography variant='body1'>{post.postText}</Typography>
    </div>
    <div>
    <Typography variant='h6'>Comments: {post.commentCount}</Typography>
    </div>
    <div>
    <Typography>{post.createdAt}</Typography>
        </div>
    </Grid>
    </Leftitem>
    </Grid>
    )
    
};

export default Onepost;