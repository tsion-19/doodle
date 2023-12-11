import React from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

const VotedPage = () => {
  const handleEditClick = () => {
    // Replace '/edit-vote' with the path of your edit page
    // Use Navigate to navigate to the specified route
    return <Navigate to="/edit-vote" />;
  };

  return (
    <div>
      <div>
        <h2>Your vote has been counted successfully!</h2>

        {/* Add any additional content for the voted page */}
        
        {/* Add an "Edit" button */}
        <div style={{ textAlign: "end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            style={{ margin:20 }}
          >
            Change Your Response
          </Button>
        </div>

      </div>
    </div>
  );
};

export default VotedPage;
