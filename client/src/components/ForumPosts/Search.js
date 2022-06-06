import * as React from 'react';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Igor from '../../assets/images/igor.jpg';




export default function Search() {
    return (
      <Box
    className="image"
    style={{
    backgroundImage: `url(${Igor})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: "cover",
    // height: "100vh",
    color: "#f5f5f5",
    backgroundPosition: 'left',
}}>
      <Grid container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end" 
      sx={{
        pt: 5,
        pb: 10,
        pr: 5,
      }}>
          <TextField id="outlined-basic" label="Search.." 
          variant="outlined" style = {{width: 500}} 
          InputProps={{ style: { fontSize: 16 } }}
        InputLabelProps={{ style: { fontSize: 16 } }}/>
          <Fab variant="extended"
          sx={{
            ml: 3,
            mb: 1,
            backgroundColor: '#4caf50'
          }}>
        <SearchIcon sx={{ mr: 1, }} />
        Search
      </Fab>
      </Grid>
      </Box>
    );
  }


