import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingHero from '../components/LandingHero';

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
      <LandingHero></LandingHero>
    </ThemeProvider>
  );
};

export default Home;
