import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return (
      <>
        <h4>Friends List</h4>
        <p className='bg-dark text-light p-3'>{username}, make some friends!</p>
      </>
    );
  }

  return (
    <div>
      <Typography varient='h4'>Friends List</Typography>
      {/* <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5> */}
      {/* {friends.map((friend) => (
        <button className='btn w-100 display-block mb-2' key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))} */}
      <List>
        {friends.map((friend) => (
          <ListItem
            component={Link}
            href={`/profile/${friend.username}`}
            to={`/profile/${friend.username}`}
            style={{ textDecoration: 'none' }}
            sx={{ curser: 'pointer' }}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.username} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FriendList;
