import * as React from 'react';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const styles = {
  formContainer: {
    backgroundColor: '#fff',
    padding: 2,
    textAlign: 'center',
    overflow: 'hidden',
    height: 'auto',
    width: 'auto',
    color: '#64dd20',
    mt:'10px'
  },
  textField:{
    width: '95%',
    my: 2,
  }
}

export default function Search() {
    return (
      <Grid container component="form"
      noValidate
      autoComplete="off"
      >
        <Paper elevation = {6} sx={styles.formContainer}>
            <TextField id="outlined-basic" label="Search.." 
            variant="outlined" sx = {styles.textField} 
            InputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 16 } }}/>
            <Button type='submit' variant="contained" size="large" sx={{mb: 2, width: 'auto',}}>
            <SearchIcon sx={{ mr: 1, }} />
            Search
            </Button>
        </Paper>
      </Grid>
    );
  }


