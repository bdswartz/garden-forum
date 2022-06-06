import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Plant from '../../pages/Plant';
import Paper from '@mui/material/Paper';

export default function PlantCard({plantInfo}) {
  console.log(plantInfo);
  return (
    <Paper sx={{ mx:'20px', my:'20px', display: 'flex', flexDirection: 'row', width:'100%', justifyContent:'space-between' }}>
        <CardMedia sx={{width:'30%'}}
          component="img"
          height="auto"
          image={`${plantInfo.image_path}`}
          alt={`picture of ${plantInfo.common_name}`}
        />
        <CardContent sx={{width:'60%'}} >
          <Typography gutterBottom variant="h4" component="div">
            {plantInfo.scientific_name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {plantInfo.common_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Pruning: {plantInfo.pruning}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fertilization: {plantInfo.fertilization}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Water: {plantInfo.water}
          </Typography>
        </CardContent>
    </Paper>
  );
}
