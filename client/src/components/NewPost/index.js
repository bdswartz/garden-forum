import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Igor from '../../assets/images/igor.jpg';
import Box from '@mui/material/Box';


const RightItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFFFFF',
   ...theme.typography.body1,
  padding: theme.spacing(2),
  textAlign: 'center',
  overflow: 'hidden',
  height: 200,
  width: 450,
  color: theme.palette.text.secondary,
}));

export default function NewPost() {
    return(
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


<Grid item xs={6}>
<Grid container direction='column' alignContent='flex-end'>
<Grid container component="form"

sx={{
  display: 'grid',
  gap: 4,
  width: '120',
  '& .MuiTextField-root': { m: 1, width: '45ch' },
    m: 7,
  flexDirection: 'column',
}}
noValidate
autoComplete="off">
      <Button variant="contained" id="button" size="large" href="#contained-buttons">
    Create New Post
      </Button>

  <RightItem elevation={2}>
  <TextField
          id="outlined-multiline-static"
          label="New Post"
          multiline
          rows={4}
          defaultValue=""
        />
  </RightItem>
  </Grid>
  </Grid>
</Grid>
  </Box>
    )
};