import React from 'react';

const PlantHistory = ({ history }) => {
  return (
    <div className="card mb-3">
        <div className="card-header">
        <span className="text-light">Plant History</span>
         </div>
        <div className="card-body">
        {history &&
            history.map(history => (
            <p className="pill mb-3" key={history._id}>
                {history.createdAt}:  {history.note_body}
            </p>
            ))}
        </div>
    </div>
  );
};

export default PlantHistory;