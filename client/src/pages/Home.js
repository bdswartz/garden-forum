import React from 'react';
// import { green, white } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          This is the HomePage!!
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
