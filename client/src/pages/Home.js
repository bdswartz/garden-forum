import React from 'react';
import Carousel from '../components/Carousel';
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

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Carousel></Carousel>
    </ThemeProvider>
  );
};

export default Home;
