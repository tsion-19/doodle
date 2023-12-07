import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../CreationMeeting/createGroup.css";
import "../CreationMeeting/createGroupPolly.css";
import "../ManageMeeting/manage.css";
import News from "../CreationMeeting/News";
import "../ManageMeeting/manage.css";
import OurCalendar from "../PreferenceVote/OurCalendar";
import { useState } from "react";
import "./preferences.css";
import schedule from "../images/schedule.jpg";
import bad_schedule from "../images/bad_schedule.jpg";
import axios from "axios";
import "../CreationMeeting/createGroup.css";
import SecondaryButton from "../Utils/SecondaryButton";
import PrimaryButton from "../Utils/PrimaryButton";
import { useNavigate } from "react-router-dom";

const PreferenceVoteContainer = ({ news, data }) => {
  const getToken = () => sessionStorage.getItem("token");

  const [showYourPreference, setShowYourPreference] = useState(false);
  const [errorDate, setErrorDate] = useState(false);

  const buttonShowYourPreference = () => {
    showYourPreference
      ? setShowYourPreference(false)
      : setShowYourPreference(true);
  };

  const checkRequirements = () => {
    if (selectedDates.length <= 0) {
      setErrorDate(true);
      return false;
    }
    return true;
  };

  const deleteFields = () => {
    setSelectedDates([]);
  };

  let navigate = useNavigate();

  const [selectedDates, setSelectedDates] = useState([]);

  const handleApi = async (e) => {
    e.preventDefault();

    let array_time_slots = [];
    for (let i = 0; i < selectedDates.length; ++i) {
      const newDate = new Date(selectedDates[i].date);
      newDate.setDate(selectedDates[i].date.getDate() + 1);

      const startDate = newDate.toISOString().split("T")[0];
      const startTime = selectedDates[i].timeRange[0];
      const startDateTime = `${startDate}T${startTime}:00`;

      const endDate = newDate.toISOString().split("T")[0];
      const endTime = selectedDates[i].timeRange[1];
      const endDateTime = `${endDate}T${endTime}:00`;
      array_time_slots.push({
        start_date: startDateTime,
        end_date: endDateTime,
      });
    }
    if (array_time_slots && data.timeslots) {
      const newArray = [];

      for (let i = 0; i < array_time_slots.length; ++i) {
        let shouldAdd = true;

        for (let j = 0; j < data.timeslots.length; ++j) {
          if (
            data.timeslots[j].start_date.startsWith(
              array_time_slots[i].start_date
            ) &&
            data.timeslots[j].end_date.startsWith(array_time_slots[i].end_date)
          ) {
            shouldAdd = false;
            break;
          }
        }

        if (shouldAdd) {
          newArray.push(array_time_slots[i]);
        }
      }

      array_time_slots = newArray;
    }

    // console.log("timeslots", array_time_slots);
    // console.log("Timeslot", selectedDates);
    try {
      if (array_time_slots.length >= 0) {
        await axios.post(
          "http://127.0.0.1:8000/api/meeting/" + data["id"] + "/timeslots/",
          {
            timeslots: array_time_slots,
          },
          {
            headers: {
              authorization: `Token ${getToken()}`,
            },
          }
        );
      }
      navigate("/dashboard");
      deleteFields();
    } catch (e) {}
  };

  const buttonSendYourPreference = (e) => {
    if (checkRequirements()) {
      console.log("true");
      handleApi(e);
    } else console.log("false");
  };

  return (
    <div className="main_grid">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid className="sx_news" item xs={2}>
            <News news={news} start={0} numberOfDivsNews={3} />
          </Grid>
          <Grid
            style={{
              paddingLeft: 0,
            }}
            item
            xs={8}>
            <div className="field">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <div className="questions_answers">
                      <p className="question">
                        Are you usually busy these days?
                      </p>
                      <p className="answer">
                        You can propose your time-slots now!
                      </p>
                      <p className="question">
                        Do you have to go shopping these days?
                      </p>
                      <p className="answer">
                        You can propose new time-slots now!
                      </p>
                      <p className="question">
                        Do you have to go to the gym and are usually exhausted
                        afterwards?
                      </p>
                      <p className="answer">
                        You can propose time-slots after your rest now!
                      </p>
                      <p className="question">
                        Don't you like daylight and stay up at night?
                      </p>
                      <p className="answer">
                        You can propose time-slots during the night now!
                      </p>
                      <p className="question">
                        Don't you like meetings and people?
                      </p>
                      <p className="answer">
                        Sorry there is no way to skip the meeting now!
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                    item
                    xs={4}>
                    {showYourPreference ? (
                      <img
                        className="border_image"
                        src={bad_schedule}
                        alt="Bad schedule"></img>
                    ) : (
                      <img
                        className="border_image"
                        src={schedule}
                        alt="Schedule"></img>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <SecondaryButton
                style={{ marginTop: 20, marginBottom: 20, marginLeft: 15 }}
                functionOnClick={buttonShowYourPreference}
                variant="contained"
                text="Propose your timeslots"
              />
              {showYourPreference ? (
                <div style={{ paddingLeft: 15 }}>
                  <div style={{ marginBottom: 20 }}>
                    <OurCalendar
                      style={{ marginBottom: 20 }}
                      selectedDates={selectedDates}
                      setSelectedDates={setSelectedDates}
                      errorDate={errorDate}
                    />
                  </div>
                  <PrimaryButton
                    style={{ marginTop: "20px !important", marginBottom: 20 }}
                    functionOnClick={(e) => buttonSendYourPreference(e)}
                    variant="contained"
                    type="submit"
                    text="Send your timeslots"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </Grid>
          <Grid className="dx_news" item xs={2}>
            <News news={news} start={3} numberOfDivsNews={6} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PreferenceVoteContainer;
