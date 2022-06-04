import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import img from '../assets/images/igor.jpg';
import { Container, Grid, Box } from '@mui/material';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <Container>
        <Grid container sx={{ mt: 7 }}>
          <Grid item xs={2}>
            <Avatar alt='flower' src={img} sx={{ width: 156, height: 156 }} />
          </Grid>
          <Grid item xs={10} sx={{ mt: 1 }}>
            <h4>
              <strong>{user.username}</strong>.
            </h4>
            <h6>
              <strong>Joined:</strong> {user.createdAt}
            </h6>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
