import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useState } from "react";
import "../CreationMeeting/createGroupPolly.css";

const OurCalendar = ({ selectedDates, setSelectedDates, data }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState([
    "09:00",
    "10:00",
  ]);

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const durationInMilliseconds = end - start;

    const pad = (num) => num.toString().padStart(2, "0");

    const hours = pad(Math.floor(durationInMilliseconds / 3600000));
    const minutes = pad(Math.floor((durationInMilliseconds % 3600000) / 60000));
    const seconds = pad(Math.floor((durationInMilliseconds % 60000) / 1000));

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleDateClick = (value) => {
    const dateIndex = selectedDates.findIndex(
      (dateObj) => dateObj.date.toDateString() === value.toDateString()
    );

    if (dateIndex > -1) {
      const updatedDates = selectedDates.filter(
        (dateObj) => dateObj.date.toDateString() !== value.toDateString()
      );
      setSelectedDates(updatedDates);
    } else {
      setSelectedDates((prevDates) => [
        ...prevDates,
        { date: value, timeRange: [...selectedTimeRange] },
      ]);
    }
  };

  const handleTimeChange = (time, index) => {
    setSelectedTimeRange((prevTimeRange) => {
      const updatedTimeRange = [...prevTimeRange];
      updatedTimeRange[index] = time;
      return updatedTimeRange;
    });
  };

  const tileDisabled = ({ date, view }) =>
    view === "month" && date < new Date();

  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
    if (newTitle !== "") setError(false);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h1>Add time</h1>
          <Calendar
            onClickDay={(value) => handleDateClick(value)}
            value={selectedDates.map((dateObj) => dateObj.date)}
            tileDisabled={tileDisabled}
          />
        </div>
        <div style={{ flex: 1, marginLeft: 20 }}>
          <h2>Selected Dates:</h2>
          {selectedDates.length > 0 ? (
            <ul>
              {selectedDates.map((dateObj, index) => (
                <li key={index}>
                  {dateObj.date.toDateString()} from {dateObj.timeRange[0]} to{" "}
                  {dateObj.timeRange[1]}
                </li>
              ))}
            </ul>
          ) : (
            <p>No dates selected</p>
          )}

          <div>
            <h2>Select Time Range:</h2>
            <div>
              <TimePicker
                style={{ color: "#757575" }}
                onChange={(time) => handleTimeChange(time, 0)}
                value={selectedTimeRange[0]}
                className="custom-time-picker"
              />
              <p>Start Time: {selectedTimeRange[0]}</p>
            </div>
            <div>
              <TimePicker
                style={{ color: "#757575" }}
                onChange={(time) => handleTimeChange(time, 1)}
                value={selectedTimeRange[1]}
                className="custom-time-picker"
              />
              <p>End Time: {selectedTimeRange[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCalendar;
