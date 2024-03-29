import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import UpdatePlant from "../UpdatePlant";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";


export default function PlantCard({ plantInfo }) {

  const [open, setOpen] = React.useState(false);

  // //button open/close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ width: 350}}
        component="img"
        height='auto'
        image={`${plantInfo.image_path}`}
        alt={`picture of ${plantInfo.common_name}`}
      />
      <CardContent sx={{ width: "60%", display:'flex', flexDirection: 'column', justifyContent:'center'}}>
        <Typography gutterBottom variant="h5" component="div" fontWeight='bold'>
          {plantInfo.common_name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" fontWeight='bold' color='text.secondary'>
          {plantInfo.scientific_name}
        </Typography>
        <Typography gutterBottom variant="body1" component="div" my={3}>
          {plantInfo.description}
        </Typography>
        <Typography variant="body2" mb={1}>
          <Typography mb={1} sx={{display:'inline', fontWeight:'bold'}}>Pruning: </Typography>{plantInfo.pruning}
        </Typography>
        <Typography variant="body2" mb={1}>
          <Typography mb={1} sx={{display:'inline', fontWeight:'bold'}}>Fertilization: </Typography>{plantInfo.fertilization}  
        </Typography>
        <Typography variant="body2" mb={1}>
          <Typography mb={1} sx={{display:'inline', fontWeight:'bold'}}>Water: </Typography>{plantInfo.water}
        </Typography>
        <Chip
          sx={{
            fontSize: "11px",
            width: 125,
            height: 28,
            cursor: "pointer",
            m: 3,
            ":hover": {
              borderColor: "green",
            },
          }}
          icon={<AddIcon />}
          onClick={handleClickOpen}
          label="Edit Plant Info"
          variant="outlined"
        />
        <UpdatePlant
          open={open}
          handleClose={handleClose}
          plantInfo={plantInfo}
        />
      </CardContent>
    </Paper>
  );
}
