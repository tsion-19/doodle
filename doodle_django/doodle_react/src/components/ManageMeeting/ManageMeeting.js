import React, { useState } from "react";
import timeImage from "../images/time.png";
import locationImage from "../images/location.png";
import videoImage from "../images/video.png";
import descriptionImage from "../images/description.png";
import correctImage from "../images/correct.png";
import noImage from "../images/no.png";
import waitImage from "../images/wait.png";
import maybeImage from "../images/maybe.png";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
// import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import "./manage.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditableMeeting from "./EditMeetingForm";
import DeleteConfirmation from "./DeleteConfirmation";

const ManageMeeting = ({ data }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[600]),
    backgroundColor: grey[600],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));

  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
    "&:hover": {
      backgroundColor: grey[50],
    },
  }));
  const [editConfirmation, setEditConfirmation] = useState(false);
  const [updatedMeeting, setUpdatedMeeting] = useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const onEdit = () => {
    setEditMode(!editMode);
  };

  const onDelete = async (id) => {
    // Show the confirmation box
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    // Hide the confirmation box
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // Perform the deletion logic immediately
      let url = `http://127.0.0.1:8000/api/meetings/${data.id}/delete/`;
      await axios.delete(url);

      // Notify the user with a success message
      toast.success("Meeting deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
        },
      });
      // After deletion, hide the confirmation box
      // After deletion, hide the confirmation box
      setShowDeleteConfirmation(false);

      // Display the toast message before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 1); // Wait for 1 second before reloading the page
    } catch (error) {
      console.error("Error deleting meeting:", error);
      // Handle error if needed
      toast.error("Error deleting meeting");
    }
  };
  return (
    <div className="CreateGroup">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {editMode ? (
              <EditableMeeting
                setEditConfirmation={setEditConfirmation}
                setEditMode={setEditMode}
                setUpdatedMeeting={setUpdatedMeeting} // Ensure this line is present
              />
            ) : (
              <>
                {editConfirmation && (
                  <p>Edit successful! Returning to non-editable mode.</p>
                )}
                {updatedMeeting && (
                  <>
                    <h2>{updatedMeeting.title}</h2>
                    <div className="manage_div_info">
                      <img src={timeImage} alt="time.png" />
                      <nobr>{updatedMeeting.duration}</nobr>
                    </div>
                    {updatedMeeting.location !== "" && (
                      <div className="manage_div_info">
                        <img src={locationImage} alt="location.png" />
                        <nobr>{updatedMeeting.location}</nobr>
                      </div>
                    )}
                    {updatedMeeting.video_conferencing === true && (
                      <div className="manage_div_info">
                        <img src={videoImage} alt="video.png" />
                        <nobr>{updatedMeeting.video_type_id}</nobr>
                      </div>
                    )}
                    {/* Add other properties as needed */}
                    {updatedMeeting.description !== "" && (
                      <div className="manage_div_info">
                        <img src={descriptionImage} alt="description.png" />
                        <nobr>{updatedMeeting.description}</nobr>
                      </div>
                    )}
                  </>
                )}
                {!editConfirmation && !updatedMeeting && (
                  <>
                    <h2>{data.title}</h2>
                    <div className="manage_div_info">
                      <img src={timeImage} alt="time.png" />
                      <nobr>{data.duration}</nobr>
                    </div>
                    {data.location !== "" && (
                      <div className="manage_div_info">
                        <img src={locationImage} alt="location.png" />
                        <nobr>{data.location}</nobr>
                      </div>
                    )}
                    {data.video_conferencing === true && (
                      <div className="manage_div_info">
                        <img src={videoImage} alt="video.png" />
                        <nobr>{data.video_type_id}</nobr>
                      </div>
                    )}
                    {data["description"] !== "" && (
                      <div className="manage_div_info">
                        <img src={descriptionImage} alt="description.png" />
                        <nobr>{data["description"]}</nobr>
                      </div>
                    )}
                    {/* Add other properties as needed */}
                  </>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            <div style={{ textAlign: "end" }}>
              <div style={{ width: "-webkit-fill-available" }}>
                {/* <ColorButton2
                  style={{ width: 100, margin: 20, textAlign: "end" }}
                  onClick={onEdit}
                  variant="contained"
                >
                  Edit
                </ColorButton2> */}
                <ColorButton2
                  style={{ width: 100, margin: 20, textAlign: "end" }}
                  onClick={() => onEdit()} // Corrected the onClick event
                  variant="contained">
                  Edit
                </ColorButton2>
              </div>
              <div style={{ width: "-webkit-fill-available" }}>
                <ColorButton2
                  style={{
                    width: 100,
                    margin: 20,
                    textAlign: "end",
                    color: "#757575",
                  }}
                  onClick={onDelete}
                  variant="contained">
                  Delete
                </ColorButton2>
              </div>
              <div style={{ width: "-webkit-fill-available" }}>
                <ColorButton
                  style={{ width: 100, margin: 20, textAlign: "end" }}
                  // onClick={console.log("share")}
                  variant="contained">
                  Share
                </ColorButton>
              </div>
            </div>
          </Grid>
          <Box sx={{ flexGrow: 1, marginTop: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <h4 style={{ marginLeft: 20, marginTop: 15 }}>
                  Availabilities
                </h4>
              </Grid>
              <Grid item xs={8}>
                <nobr className="manage_nobr_info">
                  <img src={correctImage} alt="correct.png" />
                  <nobr>Yes</nobr>
                </nobr>
                <nobr className="manage_nobr_info">
                  <img src={maybeImage} alt="maybe.png" />
                  <nobr>Maybe</nobr>
                </nobr>
                <nobr className="manage_nobr_info">
                  <img src={noImage} alt="no.png" />
                  <nobr>No</nobr>
                </nobr>
                <nobr className="manage_nobr_info">
                  <img src={waitImage} alt="wait.png" />
                  <nobr>Wait</nobr>
                </nobr>
              </Grid>
              <Grid container spacing={2}>
                <DeleteConfirmation
                  show={showDeleteConfirmation}
                  onCancel={handleCancelDelete}
                  onConfirm={handleConfirmDelete}
                  meetingTitle={data.title} // Pass the meeting title to the confirmation box
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default ManageMeeting;