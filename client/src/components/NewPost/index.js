import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Igor from '../../assets/images/igor.jpg';
import Box from '@mui/material/Box';
import { ADD_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';



const NewItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f3f3f5',
 ...theme.typography.body1,
padding: theme.spacing(4),
textAlign: 'center',
overflow: 'hidden',
height: 450,
width: 450,
color: theme.palette.text.secondary,
}));



export default function NewPost() {
  const [formState, setFormState] = useState({ postTitle: '', postText: '' });
  const { postTitle, postText } = formState;

  const [addPost, { error }] = useMutation(ADD_POST);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      const { data } = await addPost({
        variables: { ...formState },
      });
      Auth.loggedIn(data.login.token);
    } catch (e) {
      console.error(e);
    }
    if (Auth.loggedIn === false) {
      console.log('heyyyyyy')
      window.alert("You must sign in to create a post!")
    }
   
  };


 
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
<Grid container direction='column' alignContent='flex-end' onSubmit={handleSubmit}>
<Grid container component="form"

sx={{
  display: 'grid',
  gap: 4,
  // width: '120',
  '& .MuiTextField-root': { m: 1, width: '45ch' },
    m: 7,
    pt: 1.5,
  flexDirection: 'column',
  alignItems: 'flex-end',
}}
noValidate
autoComplete="off">
  <NewItem elevation={10}>
      <Button type='submit' variant="contained" size="large" sx={{mb: 2, width: 345,}}>
    Create New Post
      </Button>
      <TextField 
      onChange={handleChange}
      id="postTitle" 
      name="postTitle" 
      value={formState.postTitle} 
      label="New Post Title" 
      variant="outlined" 
      >

      </TextField>
  <TextField
          onChange={handleChange}
          id="postText"
          name="postText"
          value={formState.postText}
          label="New Post Body"
          multiline
          rows={4}
        />
  </NewItem>
  </Grid>
  </Grid>
</Grid>
  </Box>
    )
};