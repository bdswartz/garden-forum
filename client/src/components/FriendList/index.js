import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import ViewAllFriends from "../ViewAllFriends";
import Button from "@mui/material/Button";

const styles = {
  friendTitle: {
    p: 1,
    color: 'text.primary',
    bgcolor: green[500]
  },
  friendButton: {
    m: 1,
    mr: 4,
    fontWeight: "bold",
    cursor: "pointer",
    color: "text.primary"
  }
}

const FriendList = ({ username, friends }) => {
  // button open/close
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!friends || !friends.length) {
    return (
      <>
        <Typography
          variant="h6"
          sx={styles.friendTitle}
        >
          Friend List
        </Typography>
        <Typography align="center" sx={{ height: 60, pt: 2 }}>
          {username} has not identified any friends
        </Typography>
      </>
    );
  }

  if (friends.length > 10) {
    const tenFriendsArray = friends.slice(0, 10);
    // console.log(tenFriendsArray);
    friends = tenFriendsArray;
  }

  return (
    <Box
      sx={{
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={styles.friendTitle}
      >
        Friend List
      </Typography>
      <Divider />
      <List>
        {friends.map((friend) => (
          <ListItem
            component={Link}
            href={`/profile/${friend.username}`}
            to={`/profile/${friend.username}`}
            sx={{ curser: "pointer", color: "text.primary" }}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.username} />
          </ListItem>
        ))}
        <Box sx={{ display: "flex", flexDirection: "row-reverse", p: "1"}}>
          <Typography
            component={Button}
            onClick={handleClickOpen}
            sx={styles.friendButton}
          >
            View all
          </Typography>
          <ViewAllFriends
            sx={{ width: "100%" }}
            open={open}
            handleClose={handleClose}
          />
        </Box>
      </List>
    </Box>
  );
};

export default FriendList;
