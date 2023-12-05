import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import "../CreationMeeting/createGroup.css";
import "../CreationMeeting/createGroupPolly.css";
import "../ManageMeeting/manage.css";
import UserPreference from "../User/UserPreference";
import News from "../CreationMeeting/News";
import TableMeetingUser from "../User/TableMeetingUser";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import axios from "axios";

const User = ({ news, data }) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[600]),
    backgroundColor: grey[600],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));

  const getToken = () => sessionStorage.getItem("token");

  // const submitForm = async () => {
  //   let variable = null;
  //   console.log("selected", selectedColumn);
  //   if (selectedColumn !== "")
  //     variable = data["timeslots"][selectedColumn - 1]["id"];

  //   try {
  //     await axios.post(
  //       "http://127.0.0.1:8000/api/meeting/" + data["id"] + "/book/",
  //       {
  //         final_date: variable,
  //       },
  //       {
  //         headers: {
  //           authorization: `Token ${getToken()}`,
  //         },
  //       }
  //     );
  //     alert("Timeslot booked!");
  //     window.location.reload();
  //   } catch (e) {
  //     // console.log("sth failed", e);
  //   }
  // };

  const [selectedColumn, setSelectedColumn] = useState([]);

  useEffect(() => {
    // console.log("qua");
    if (data["final_date"] !== null && data["timeslots"]) {
      for (let i = 0; i < data["timeslots"].length; ++i) {
        // console.log("index ", i, data["final_date"]);
        if (data["final_date"] === data["timeslots"][i]["id"]) {
          setSelectedColumn(i + 1);
          // console.log(selectedColumn);
          return;
        }
      }
    }
  }, [data]);

  const columnSelection = (columnName) => {
    if (columnName !== 0) {
      if (selectedColumn === columnName) {
        setSelectedColumn("");
      } else {
        setSelectedColumn(columnName);
      }
    }
  };

  
  return (
    <div className="CreateGroup">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid className="sx_news" item xs={2}>
            <News news={news} start={0} numberOfDivsNews={3} />
          </Grid>
          <Grid style={{ marginTop: 32, paddingLeft: 0 }} item xs={8}>
            <div className="field">
              {/* Box to hold UserPreference and TableMeetingUser side by side */}
              <Box sx={{ display: "flex" }}>
                {/* UserPreference Component */}
                <UserPreference data={data} />

                {/* Vertical Divider */}
                <Divider orientation="vertical" flexItem style={{ margin: "0 16px" }} />

                {/* TableMeetingUser Component */}
                <TableMeetingUser
                  data={data}
                  selectedColumn={selectedColumn}
                  columnSelection={columnSelection}
                />
              </Box>

              {/* <div style={{ textAlign: "end" }}>
                <ColorButton
                  style={{ margin: 20, textAlign: "end" }}
                  onClick={submitForm}
                  variant="contained"
                >
                  Submit
                </ColorButton>
              </div> */}
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

export default User;
