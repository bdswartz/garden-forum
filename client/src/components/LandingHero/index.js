import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Greenplant from '../../assets/images/greenplant.jpg';
import Wort from '../../assets/images/large-st-johns-wort.jpg'
import './index.css';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import YardIcon from '@mui/icons-material/Yard';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const LandingHero = ({theme}) => {
  return (
      <Box
        className="image"
        style={{
        backgroundImage: `${theme ==='light' ? `url(${Greenplant})`: `url(${Wort})`}`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
        backgroundPosition: 'left',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>
  {/* Outer Wrapper of Grid content */}
      <Box sx={{
          display:'flex',   
          flexDirection:'column', 
          width:'50%',
          backgroundColor: 'background.opaque',
          borderRadius: '20px',
          border:'5px double black' 
        }}>
        <Typography gutterBottom variant="h3" component="div" 
          sx={{
            width:'100%', 
            textAlign:'center',
            fontWeight:'900',
            color: green[500]}}
            >Garden Forum</Typography>
            <Divider orientation="horizontal" variant="middle" flexItem />
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'transparent',
            justifyContent:'space-around',
            my:"50px"
            }}>
          <Box sx={{
            width:'50%', 
            display:'flex', 
            flexDirection:'column', 
            alignItems:'center'
            }}>
            <YardIcon sx={{color:'text.secondary',fontSize:'100px'}}/>
            <Typography gutterBottom variant="h4" component="div" 
            sx={{
              width:'80%', 
              textAlign:'center',
              fontWeight:'bold',
              py:'20px',
              color: 'text.secondary'}}
              >
                Plant Database
              </Typography>
            <Typography gutterBottom variant="h5" component="div" 
            sx={{
              width:'80%', 
              textAlign:'center',
              px:'20px',
              color: 'text.secondary'
            }}
              >
                Identify plants in your landscape or garden using your camera and build a virtual garden to help maintain them.
              </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{
            width:'50%', 
            display:'flex', 
            flexDirection:'column', 
            alignItems:'center'
            }}>
            <HistoryEduIcon sx={{color:'text.secondary',fontSize:'100px'}}/>
            <Typography gutterBottom variant="h4" component="div" 
            sx={{
              width:'80%', 
              textAlign:'center',
              fontWeight:'bold',
              py:'20px',
              color: 'text.secondary'}}
              >
                Forum
              </Typography>
            <Typography gutterBottom variant="h5" component="div" 
            sx={{
              width:'100%', 
              textAlign:'center',
              px:'20px',
              color: 'text.secondary'}}
              >Connect with other garden enthusiasts to discover their secrets to 
              maintaining a beautiful,  lush landscape.</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingHero;
