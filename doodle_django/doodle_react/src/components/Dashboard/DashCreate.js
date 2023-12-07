import "../ManageMeeting/manage.css";
import calendar from "../images/calendar.png";
import PrimaryButton from "../Utils/PrimaryButton";
import { useNavigate } from "react-router-dom";

const DashCreate = () => {
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
        }}>
        <h3 style={{ marginBlockStart: "0em", paddingTop: 20 }}>
          Your meetings page
        </h3>
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
