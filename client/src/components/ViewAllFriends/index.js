import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Link,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ME, QUERY_USER } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

const ViewAllFriends = ({ open, handleClose }) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};
  console.log(user);

  return (
    <Dialog align='center' open={open} onClose={handleClose}>
      <DialogTitle>Friends List</DialogTitle>

      <DialogContent>
        <List>
          {user.friends.map((friend) => (
            <ListItem
              component={Link}
              href={`/profile/${friend.username}`}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: 'none' }}
              sx={{ curser: 'pointer', color: 'black', width: '500px' }}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAllFriends;
