import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth from '../../utils/auth';

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: green[500] }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography
              component={Link}
              style={{ textDecoration: 'none' }}
              to='/'
              variant='h6'
              sx={{ flexGrow: 1, color: 'white', cursor: 'pointer' }}
            >
              Garden Forum
            </Typography>
            {Auth.loggedIn() ? (
              <>
                <Button
                  onClick={logout}
                  component={Link}
                  to='/'
                  sx={{
                    color: 'green',
                    bgcolor: 'white',
                    m: 2,
                    ':hover': {
                      bgcolor: 'green',
                      color: 'white',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to='/login'
                  sx={{
                    color: 'green',
                    bgcolor: 'white',
                    m: 2,
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
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
