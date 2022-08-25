import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Divider,
  List,
} from "@mui/material";
import { green } from "@mui/material/colors";

const PlantHistory = ({ history }) => {
  return (
    <Paper item elevation={6}>
      <Typography
        variant="h6"
        sx={{ p: 2, bgcolor: green[500], color: "white" }}
      >
        Plant History
      </Typography>
      <Divider />
      <Grid>
      <List sx={{ width: "100%" }}>
        {history && 
          history.map((history) => (
            <Grid container direction='column' mt={2}>
                <Typography variant='body2' px={2} sx={{bgcolor: green[300]}}>{history.createdAt}:</Typography>
                <Typography variant='body2' px={2}>{history.note_body}</Typography>
            </Grid>
          ))}
      </List>
      </Grid>
    </Paper>

    // {/*
    //     <Paper className="card mb-3">
    //       <div className="card-header">
    //         <span className="text-light">Plant History</span>
    //       </div>
    //       <div className="card-body">
    //         {history &&
    //           history.map((history) => (
    //             <Paper>
    //               <p className="pill mb-3" key={history._id}>
    //                 {history.createdAt}: {history.note_body}
    //               </p>
    //             </Paper>
    //           ))}
    //       </div>
    //     </Paper> */}
  );
};

export default PlantHistory;
