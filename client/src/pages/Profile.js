import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import img from '../assets/images/igor.jpg';
import { Container, Grid, Box, Typography } from '@mui/material';
import Garden from '../components/Garden';
import FriendList from '../components/FriendList';

const styles = {
  headerContainer: {
    // backgroundColor: `url(${img2})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
};

const Profile = () => {
  const [open, setOpen] = React.useState(false);

  // //button open/close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
      <Container sx={{ width: '100%' }}>
        {/* user top card start */}
        <Paper
          style={styles.headerContainer}
          sx={{ p: 5, borderRadius: '0px' }}
        >
          <Grid container sx={{ mt: 3 }}>
            {/* Profile Picture */}
            <Grid item>
              <Avatar alt='flower' src={img} sx={{ width: 156, height: 156 }} />
            </Grid>
            {/* User name and joined info */}
            <Grid item xs={8} sx={{ mt: 1 }}>
              <Container sx={{ ml: 1 }}>
                <Typography variant='h5'>
                  <strong>{user.username}</strong>.
                </Typography>
                <Typography variant='p'>
                  <strong>Joined:</strong> {user.createdAt}
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Paper>
        {/* user top card end */}
        <Grid container>
          {/* left container */}
          <Grid item xs={8}>
            {/* garden section start */}
            <Paper sx={{ p: 0, mt: 5, borderRadius: '0px' }}>
              <Garden plants={user.plants} user={user.username}></Garden>
            </Paper>
            {/* garden section end */}
          </Grid>
          {/* right container */}
          <Grid item xs={4}>
            {/* friend list start */}
            <Paper sx={{ ml: 5, p: 0, mt: 5, borderRadius: '0px' }}>
              <FriendList
                username={user.username}
                friendCount={user.friendCount}
                friends={user.friends}
              />
            </Paper>
            {/* friend list end */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
