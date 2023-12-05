import React from "react";
import { Grid, TextField, Button } from "@mui/material";

const EnterNameAndEmail = ({
  handleSubmit,
  handleCancel,
  userName,
  userEmail,
  setUserName,
  setUserEmail,
}) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <h1>Enter your name and email</h1>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="User Email"
          variant="outlined"
          fullWidth
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default EnterNameAndEmail;
