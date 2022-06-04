import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function Garden({ plants }) {
  return (
    <ImageList>
      <ImageListItem key='Subheader' cols={2}>
        <ListSubheader component='div'>Your Garden</ListSubheader>
      </ImageListItem>
      {plants &&
        plants.map((plant) => (
          <ImageListItem key={plant.img}>
            <img
              src={`${plant.image_path}?w=248&fit=crop&auto=format`}
              srcSet={`${plant.image_path}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={plant.image_path}
              loading='lazy'
            />
            <ImageListItemBar
              title={plant.scientific_name}
              subtitle={plant.common_name}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${plant.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
}
