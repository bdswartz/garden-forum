import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ADD_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';



const NewItem = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
 ...theme.typography.body1,
  padding: theme.spacing(2), 
  textAlign: 'center',
  overflow: 'hidden',
  height: 'auto',
  width: 'auto',
  color: theme.palette.text.secondary,
}));

const textFieldStyle = {
  width: '95%',
  my: 2
}

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
      <>
        {/* <Grid container direction='column'  > */}
        <Grid container component="form"
              sx={{
                // display: 'grid',
                // gap: 4,
                // width: '95%',
                // '& .MuiTextField-root': { m: 1, width: '45ch' },
                // m: 2,
                // pt: 1.5,
                // flexDirection: 'column',
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}>
          <NewItem elevation={6}>
                  <TextField
                  sx={textFieldStyle}
                  onChange={handleChange}
                  id="postTitle" 
                  name="postTitle" 
                  value={formState.postTitle} 
                  label="Create a New Post Title" 
                  variant="outlined" 
                  >
                  </TextField>
                  {formState.postTitle && <TextField
                      onChange={handleChange}
                      id="postText"
                      name="postText"
                      value={formState.postText}
                      label="Create a New Post"
                      multiline
                      rows={4}
                      sx={textFieldStyle}
                    />}
              <Button type='submit' variant="contained" size="large" sx={{mb: 2, width: 'auto',}}>
            Create New Post
              </Button>
          </NewItem>
          </Grid>
          {/* </Grid> */}
         </> 
    )
};