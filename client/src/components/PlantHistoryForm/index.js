import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Igor from '../../assets/images/igor.jpg';
import Box from '@mui/material/Box';
import { ADD_PLANT_HISTORY } from '../../utils/mutations';
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



export default function PlantHistoryForm(plantId) {
  const [formState, setFormState] = useState({ plantId: plantId, noteBody: '' });
  const { noteBody } = formState;

  const [addPlantHistory, { error }] = useMutation(ADD_PLANT_HISTORY);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      const { data } = await addPlantHistory({
        variables: { ...formState },
      });
      Auth.loggedIn();
    } catch (e) {
      console.error(e);
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
                    }}
                noValidate 
                autoComplete="off"
            >
                <NewItem elevation={10}>
                    <TextField 
                        onChange={handleChange}
                        id="noteBody" 
                        name="noteBody" 
                        value={formState.postTitle} 
                        label="Plant History Entry Text" 
                        variant="outlined" 
                    />
                    <Button type='submit' variant="contained" size="large" sx={{mb: 2, width: 345,}}>
                        Add Plant History Entry
                    </Button>
                </NewItem>
            </Grid>
            </Grid>
            </Grid>
        </Box>
    )
};