import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth from '../../utils/auth';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#64dd20',
    },
  },
  spacing: 8,
});

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorAvatarEl, setAnchorAvatarEl] = React.useState(null);

  const avatarOpen = Boolean(anchorAvatarEl);

  const handleAvatarClick = (event) => {
    setAnchorAvatarEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorAvatarEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: green[500] }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography
              component={Link}
              style={{ textDecoration: 'none' }}
              to='/'
              variant='h5'
              sx={{
                m: 2,
                fontWeight: 'bold',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Garden Forum
            </Typography>
            <Typography
              style={{ textDecoration: 'none' }}
              sx={{ color: 'white', cursor: 'pointer' }}
            >
              <Grid
                onClick={handleClick}
                container
                spacing='1'
                alignItems='center'
              >
                community
                <KeyboardArrowDownIcon />
              </Grid>
            </Typography>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem component={Link} to='/forum'>
                Forum
              </MenuItem>
              <MenuItem component={Link} to='/profiles'>
                People
              </MenuItem>
              <MenuItem component={Link} to='/plants'>
                Plants
              </MenuItem>
              <Divider />
              <MenuItem component={Link} to='/about'>
                About
              </MenuItem>
            </Menu>
            <Box
              alignItems='center'
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              {Auth.loggedIn() ? (
                <>
                  <Avatar
                    onClick={handleAvatarClick}
                    sx={{
                      m: 1,
                      bgcolor: 'white',
                      color: 'green',
                      cursor: 'pointer',
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Menu
                    anchorEl={anchorAvatarEl}
                    id='account-menu'
                    open={avatarOpen}
                    onClose={handleAvatarClose}
                    onClick={handleAvatarClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem component={Link} to='/profile'>
                      Profile
                    </MenuItem>
                    <MenuItem component={Link} to='/settings'>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={logout} component={Link} to='/'>
                      logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to='/login'
                    sx={{
                      color: 'green',
                      bgcolor: 'white',
                      m: 1,
                      ':hover': {
                        bgcolor: 'green',
                        color: 'white',
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to='/signup'
                    sx={{
                      m: 1,
                      color: 'green',
                      bgcolor: 'white',
                      ':hover': {
                        bgcolor: 'green',
                        color: 'white',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
