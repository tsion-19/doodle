import "../ManageMeeting/manage.css";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import calendar from "../images/calendar.png";
import PrimaryButton from "../Utils/PrimaryButton";
import { useNavigate } from "react-router-dom";

const DashCreate = () => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[600]),
    backgroundColor: grey[600],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));

  let navigate = useNavigate();

  const handleButtonClick = (e) => {
    e.preventDefault();
    navigate("/create");
  };

  return (
    <div className="field">
      <div
        style={{
          marginLeft: 5,
          textAlign: "left",
          marginTop: 0,
          padding: 10,
        }}>
        <h3>Your meetings page</h3>
        <p style={{ fontSize: 14 }}>
          Share your availability with clients, candidates or students and
          create your meeting.
        </p>
        <div style={{ padding: 5 }}>
          <img
            style={{ width: "-webkit-fill-available", borderRadius: 5 }}
            src={calendar}
            alt="calendar"
          />
        </div>
        <div style={{ textAlign: "end" }}>
          <PrimaryButton
            text={"Create Meeting"}
            functionOnClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default DashCreate;
