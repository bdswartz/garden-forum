import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ME, QUERY_USER } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import img from '../assets/images/igor.jpg';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import Garden from '../components/Garden';
import FriendList from '../components/FriendList';
import AddIcon from '@mui/icons-material/Add';

const styles = {
  headerContainer: {
    // backgroundColor: `url(${img2})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
};

const Profile = () => {
  // this handles adding a friend when you click on the add friend button
  const [addFriend, { error }] = useMutation(ADD_FRIEND);
  const handleClick = async () => {
    try {
      await addFriend({
        variables: { friendId: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  // button open/close
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // this queries the DB for user data to be displayed in the profile component return statement
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  // this checks if someone is your friend when you go to their page
  const [isfriend, setIsFriend] = useState();
  const { loading: friendLoading, data: friendData } = useQuery(ME);
  const friendCheck = friendData?.me || {};
  const { username } = useParams();
  useEffect(() => {
    if (friendCheck.friends) {
      for (let i = 0; i < friendCheck.friends.length; i++) {
        if (friendCheck.friends[i].username === username) {
          setIsFriend(true);
          console.log(isfriend);
        }
      }
    }
  });

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
                <Typography>
                  <strong>Joined:</strong> {user.createdAt}
                </Typography>
                {userParam && !isfriend && (
                  <Chip
                    sx={{
                      fontSize: '11px',
                      width: 120,
                      height: 28,
                      cursor: 'pointer',
                      mt: 1,
                      ':hover': {
                        borderColor: 'green',
                      },
                    }}
                    icon={<AddIcon />}
                    label='Add Friend'
                    variant='outlined'
                    onClick={handleClick}
                  />
                )}
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
