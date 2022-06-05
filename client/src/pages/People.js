import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { QUERY_ALL_USERS } from '../utils/queries';

const People = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || [];

  return (
    <>
      {/* search bar start */}
      <Box
        className='image'
        style={{
          color: '#f5f5f5',
        }}
      >
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{
            pt: 5,
            pb: 10,
            pr: 5,
          }}
        >
          <TextField
            id='outlined-basic'
            label='Search..'
            variant='outlined'
            style={{ width: 500 }}
            InputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 16 } }}
          />
          <Fab
            variant='extended'
            sx={{
              ml: 3,
              mb: 1,
              backgroundColor: '#4caf50',
              color: 'white',
              ':hover': {
                color: 'green',
              },
            }}
          >
            <SearchIcon sx={{ mr: 1 }} />
            Search
          </Fab>
        </Grid>
      </Box>
      {/* search bar end */}
      <List style={{ width: '50%', margin: 'auto' }}>
        {users.map((user) => (
          <>
            <Box>
              <Divider style={{ width: '100%' }} />
            </Box>
            <ListItem
              component={Link}
              href={`/profile/${user.username}`}
              to={`/profile/${user.username}`}
              style={{ textDecoration: 'none' }}
              sx={{ curser: 'pointer', color: 'black' }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} />
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
};

export default People;

// if search bar is empty and search is clicked query all users
// if search bar has text in it query all users and return people that have that text as a username, or first or last name
