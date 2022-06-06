import React from 'react';
import Paper from '@mui/material/Paper';

const PlantHistory = ({ history }) => {
  return (
    <Paper className="card mb-3">
        <div className="card-header">
        <span className="text-light">Plant History</span>
         </div>
        <div className="card-body">
        {history &&
            history.map(history => (
            <Paper>
              <p className="pill mb-3" key={history._id}>
                  {history.createdAt}:  {history.note_body}
              </p>
            </Paper>
            ))}
        </div>
    </Paper>
  );
};

export default PlantHistory;