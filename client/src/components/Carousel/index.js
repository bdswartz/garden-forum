import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import img1 from '../../assets/images/greenplant.jpg';
// import img2 from '../../assets/images/sunflower.jpg';
// import img3 from '../../assets/images/malvestida.jpg';
import './index.css';

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

const Carousel = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ maxHeight: '900px', minWidth: 100, overflow: 'hidden' }}
      >
        <Box className='img-container'>
          <img src={img1} alt='green-plant' />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Carousel;
