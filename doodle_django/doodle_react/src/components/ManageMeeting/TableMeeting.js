import correctImage from "../images/correct.png";
import noImage from "../images/no.png";
import waitImage from "../images/wait.png";
import maybeImage from "../images/maybe.png";
import user from "../images/user.png";
import "./manage.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const TableMeeting = ({ selectedColumn, columnSelection, data }) => {
  const renderCellContent = (column, row) => {
    if (row[column] === "yes") {
      return (
        <div className="table_image">
          <img src={correctImage} alt="correct.png" />
        </div>
      );
    } else if (row[column] === "maybe") {
      return (
        <div className="table_image">
          <img src={maybeImage} alt="maybe.png" />
        </div>
      );
    } else if (row[column] === "wait") {
      return (
        <div className="table_image">
          <img src={waitImage} alt="wait.png" />
        </div>
      );
    } else {
      return (
        <div className="table_image">
          <img src={noImage} alt="no.png" />
        </div>
      );
    }
  };

  const time_slots = [
    {},
    ...(Array.isArray(data["timeslots"]) ? data["timeslots"] : []),
  ];

  const data_group_1 = [
    {
      partecipants: "Fabio Cangeri",
      month: "yes",
      month2: "no",
    },
    {
      partecipants: "Tsion",
      month: "maybe",
      month2: "yes",
    },
    {
      partecipants: "Degefom",
      month: "no",
      month2: "yes",
    },
    {
      partecipants: "Hilary",
      month: "wait",
      month2: "no",
    },
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h4 style={{ marginLeft: 40, marginTop: 15 }}>Availabilities</h4>
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
        </Grid>
      </Box>
      <table
        id="table_meeting"
        style={{
          // border: "3px solid #f0e9e6",
          borderRadius: "8px",
          width: "-webkit-fill-available",
          marginRight: "15px",
          marginLeft: "15px",
          borderCollapse: "collapse",
          borderSpacing: 0,
        }}>
        <thead>
          <tr>
            {time_slots &&
              time_slots.map((value, index) => {
                let start = null;
                let end = null;

                if (index !== 0) {
                  const start_date = value["start_date"];
                  const end_date = value["end_date"];

                  const regexPattern =
                    /(\d+)-(\d+)\-(\d+)+T(\d{2}:\d{2}).*\+(.*)/;
                  start = regexPattern.exec(start_date);
                  end = regexPattern.exec(end_date);
                }
                return (
                  <th
                    key={index}
                    style={{
                      position: "relative",
                      minWidth: "100px",
                    }}
                    onClick={() => columnSelection(index)}
                    className={
                      selectedColumn === index ? "selected_column" : ""
                    }>
                    {index === 0 ? (
                      <label
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                        }}>
                        <h4 id="partecipants_text">Partecipants</h4>
                      </label>
                    ) : (
                      <label>
                        <img
                          id="star"
                          className={
                            selectedColumn === index
                              ? "img_star_select"
                              : "img_star_unselect"
                          }
                        />
                        <br />
                        <p>{start[3] + "/" + start[2] + "/" + start[1]}</p>
                        {/* <p>{months[start[2] - 1]}</p>
                        <p>{start[3]}</p> */}
                        <p>{start[4]}</p>
                        <p>{end[4]}</p>
                        {/* <div className="div_user">
                          <img src={user} alt="user" />
                          <nobr> 2</nobr>
                        </div> */}
                      </label>
                    )}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {data_group_1.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((column, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => columnSelection(colIndex)}
                  className={
                    selectedColumn === colIndex ? "selected_column" : ""
                  }>
                  {column === "partecipants" ? (
                    <p className="partecipants">{row[column]}</p>
                  ) : (
                    renderCellContent(column, row)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMeeting;
