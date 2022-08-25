import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';
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
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { QUERY_ALL_USERS, SEARCH_USER_QUERY } from '../utils/queries';
import { style } from '@mui/system';

const styles = {
  textStyle: {
    width: 500, 
    border: '1px solid grey',
    mb:3
  },
  pageStyle: {
    backgroundColor: 'background.default',
    minHeight: '100vh',
    width: '100vw',
    p:5
  },
}; 


const People = () => {
  const { loading: allLoading, data: allData } = useQuery(QUERY_ALL_USERS);
  const [searchInput, setSearchInput] = useState('');

  const allUsers = allData?.users || {};

  const [searchUser, { loading, data }] = useLazyQuery(SEARCH_USER_QUERY, {
    variables: { search: searchInput },
    enabled: false,
  });

  const users = data?.getUsers.users || {};

  if (allLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={styles.pageStyle}>
      {/* search bar start */}
      <Box
        className='image'
        style={{
          color: 'background.default',
        }}
      >
        <Grid
          container
          style={{ width: '50%', margin: 'auto' }}
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
            sx={styles.textStyle}
            InputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 16 } }}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Fab
            type='submit'
            onClick={() => searchUser()}
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
      {users.length < 200 ? (
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
                sx={{ curser: 'pointer', color: 'text.primary' }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username} />
                <ListItemText primary={user.firstName + ' ' + user.lastName} />
              </ListItem>
            </>
          ))}
        </List>
      ) : (
        <List style={{ width: '50%', margin: 'auto' }}>
          {allUsers.map((user) => (
            <>
              <Box>
                <Divider style={{ width: '100%' }} />
              </Box>
              <ListItem
                component={Link}
                href={`/profile/${user.username}`}
                to={`/profile/${user.username}`}
                style={{ textDecoration: 'none' }}
                sx={{ curser: 'pointer', color: 'text.primary' }}
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
      )}
    </Box>
  );
};

export default People;

// if search bar is empty and search is clicked query all users
// if search bar has text in it query all users and return people that have that text as a username, or first or last name
// () => searchUser(),
