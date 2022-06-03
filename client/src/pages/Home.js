import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import img1 from '../assets/images/greenplant.jpg';
import img2 from '../assets/images/sunflower.jpg';
import img3 from '../assets/images/malvestida.jpg';

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
      <Container
        className='slider'
        disableGutters
        maxWidth={false}
        sx={{ minWidth: 100 }}
      >
        {/* radio buttons start */}
        <FormControl>
          <RadioGroup
            aria-labelledby='image-radio-buttons'
            defaultValue='2'
            name='radio-buttons-group'
          >
            <FormControlLabel value='1' control={<Radio />} label='' />
            <FormControlLabel value='2' control={<Radio />} label='' />
            <FormControlLabel value='3' control={<Radio />} label='' />
          </RadioGroup>
        </FormControl>
        {/* radio buttons end */}
        {/* slide images start */}
        <div>
          <img src={img1} alt='green-plant' />
        </div>
        <div>
          <img src={img2} alt='green-plant' />
        </div>
        <div>
          <img src={img3} alt='green-plant' />
        </div>
        {/* slide images end */}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
