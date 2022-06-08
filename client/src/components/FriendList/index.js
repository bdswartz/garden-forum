import React from "react";
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

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return (
      <>
        <Typography
          variant="h6"
          sx={{ p: 2, p: 1, bgcolor: green[500], color: "white" }}
        >
          Friend List
        </Typography>
        <Typography align="center" sx={{ height: 60, pt: 2 }}>
          {username} has 0 friends
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
        sx={{ p: 2, p: 1, bgcolor: green[500], color: "white" }}
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
            style={{ textDecoration: "none" }}
            sx={{ curser: "pointer", color: "black" }}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.username} />
          </ListItem>
        ))}
        <Box sx={{ display: "flex", flexDirection: "row-reverse", p: "1" }}>
          <Typography
            component={Link}
            // style={{ textDecoration: 'none' }}
            to="/"
            sx={{
              m: 1,
              mr: 4,
              fontWeight: "bold",
              color: "black",
              cursor: "pointer",
            }}
          >
            View all
          </Typography>
        </Box>
      </List>
    </Box>
  );
};

export default FriendList;
