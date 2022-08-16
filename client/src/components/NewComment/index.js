import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { ADD_COMMENT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { ME, QUERY_POSTS } from '../../utils/queries';


const NewItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f3f3f5',
 ...theme.typography.body1,
padding: theme.spacing(1),
textAlign: 'center',
overflow: 'hidden',
color: theme.palette.text.secondary,
}));


export default function NewComment() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  console.log(posts);
  const [formState, setFormState] = useState({ commentBody: '' });
  const { commentBody } = formState;
  
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: { ...formState },
      });
      Auth.loggedIn(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    
    
  };


  return(
    
    <NewItem
    component='form'
    noValidate
    onSubmit={handleFormSubmit}
    elevation={10}>
<Grid item xs={6} sx={{
  display: 'grid',
  gap: 2,
  '& .MuiTextField-root': { m: 1, width: '45ch' },
  m: 2,}}>
      <Button type='submit' variant="contained" size="large" sx={{mb: 2, width: 345,}}>
    Create New Comment
      </Button>


  <TextField
          onChange={handleChange}
          value={formState.commentBody}
          id="commentBody"
          name="commentBody"
          label="Type comment here..."
          multiline
          rows={4}
        />
  </Grid>
  </NewItem>

)

};