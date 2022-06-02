import * as React from 'react';
// import { Link } from 'react-router-dom';
// import Auth from '../../utils/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { green, white } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#64dd20',
    },
  },
});

const Header = () => {
  return (
    // <header className='bg-secondary mb-4 py-2 flex-row align-center'>
    //   <div className='container flex-row justify-space-between-lg justify-center align-center'>
    //     <Link to='/'>
    //       <h1>Chirp</h1>
    //     </Link>

    //     <nav className='text-center'>
    //       {Auth.loggedIn() ? (
    //         <>
    //           <Link to='/profile'>Me</Link>
    //           <a href='/'>Logout</a>
    //         </>
    //       ) : (
    //         <>
    //           <Link to='/login'>Login</Link>
    //           <Link to='/signup'>Signup</Link>
    //         </>
    //       )}
    //     </nav>
    //   </div>
    // </header>
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: green[500] }}>
        <AppBar position='static'>
          <Toolbar>
            {/* <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, color: 'white', cursor: 'pointer' }}
            >
              Garden Forum
            </Typography>
            <Button
              sx={{
                color: 'green',
                bgcolor: 'white',
                ':hover': {
                  bgcolor: 'green',
                  color: 'white',
                },
              }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
