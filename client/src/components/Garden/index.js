import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import AddPlantDialog from '../AddPlantDialog';
import { Link } from 'react-router-dom';



export default function Garden({ plants, user }) {
  // const handleClick = () => {
  console.log(plants);
  // };
  const [open, setOpen] = React.useState(false);

  // //button open/close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ImageList>
      <ImageListItem key='Subheader' cols={2}>
        <ListSubheader sx={{ fontSize: '24px' }} component='div'>
          {user}'s Garden
          <Chip
            sx={{
              fontSize: '11px',
              width: 100,
              height: 28,
              cursor: 'pointer',
              m: 3,
              ':hover': {
                borderColor: 'green',
              },
            }}
            icon={<AddIcon />}
            onClick={handleClickOpen}
            label='Add Plant'
            variant='outlined'
          />
          <AddPlantDialog open={open} handleClose={handleClose} />
        </ListSubheader>
      </ImageListItem>
      {plants &&
        plants.map((plant) => (
          <ImageListItem key={plant._id}>
            <img
              src={`${plant.image_path}?w=248&fit=crop&auto=format`}
              srcSet={`${plant.image_path}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={plant.image_path}
              loading='lazy'
            />
            <ImageListItemBar
              title={plant.common_name}
              subtitle={plant.scientific_name}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${plant.title}`}
                  component={Link}
                  to={`/plant/${plant._id}`}
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
