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
import AddCommentIcon from '@mui/icons-material/AddComment';

const NewItem = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
  my: 2,
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
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}>
          <NewItem elevation={6} sx={{mt:'10px'}}>
                  <TextField
                  sx={textFieldStyle}
                  onChange={handleChange}
                  id="postTitle" 
                  name="postTitle" 
                  value={formState.postTitle} 
                  label="Create a Title for Your New Post" 
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
              <AddCommentIcon sx={{fontSize: 'medium', mr:'5px'}}/>
            Create New Post
              </Button>
          </NewItem>
          </Grid>
          {/* </Grid> */}
         </> 
    )
};