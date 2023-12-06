import AllMeetings from "./AllMeetings";
import Grid from "@mui/material/Grid";
import DashCreate from "./DashCreate";

const MeetingsCreation = ({ data }) => {
  return (
    <div className="main_grid">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <AllMeetings data={data} />
        </Grid>
        <Grid item xs={4}>
          <DashCreate />
        </Grid>
      </Grid>
    </div>
  );
};

export default MeetingsCreation;
