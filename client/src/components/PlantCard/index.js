import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Plant from '../../pages/Plant';

export default function PlantCard(plantInfo) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{display: "flex", flexDirection:"row"}}>
        <CardMedia
          component="img"
          height="140"
          image={`${plantInfo.image_path}`}
          alt={`picture of ${plantInfo.common_name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {plantInfo.scientific_name}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            {plantInfo.common_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pruning: {plantInfo.pruning}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fertilization: {plantInfo.fertilization}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Water: {plantInfo.water}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
