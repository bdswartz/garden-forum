import * as React from 'react';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



export default function Search() {
    return (
      <Grid container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end" 
      sx={{
        pt: 5,
        pb: 10,
        pr: 5,
      }}>
          <TextField id="outlined-basic" label="Search.." variant="outlined" style = {{width: 500}} />
          <Fab variant="extended"
          sx={{
            ml: 3,
          }}>
        <SearchIcon sx={{ mr: 1 }} />
        Search
      </Fab>
      </Grid>
    );
  }


