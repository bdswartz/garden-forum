import * as React from 'react';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';




export default function Search() {
    return (
      <Grid container
      direction="row"
      justifyContent="center"
      alignItems="center" 
      sx={{
        pt: 5,
      }}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <Fab variant="extended">
        <SearchIcon sx={{ mr: 1 }} />
        Search
      </Fab>
      </Grid>
    );
  }


