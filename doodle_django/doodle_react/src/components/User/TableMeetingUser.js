import React, { useState } from "react";
import { Box, Checkbox } from "@mui/material";
import user from "../images/user.png";
import "../ManageMeeting/manage.css";
import EnterNameAndEmail from "./SubmitVote";

const TableMeetingUser = ({ selectedColumn, columnSelection, data }) => {
  const time_slots = [
    {},
    ...(Array.isArray(data["timeslots"]) ? data["timeslots"] : []),
  ];
  
  const [checkboxValues, setCheckboxValues] = useState(
    Array.from({ length: time_slots.length }, () => false)
  );

  const [selectedDates, setSelectedDates] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [currentStep, setCurrentStep] = useState("selectTimeSlot");
  const handleCheckboxToggle = (index) => {
    setCheckboxValues((prevValues) => {
        const newValues = [...prevValues];
        const currentValue = newValues[index];

        // Toggle checkbox value
        newValues[index] =
            currentValue === false ? true : currentValue === true ? 'maybe' : false;

        console.log('New Checkbox Values:', newValues);

        return newValues;
    });

    // Construct the selectedDates array based on checkbox values
    const newSelectedDates = time_slots.reduce((acc, time_slot, i) => {
        if (checkboxValues[i] === true || checkboxValues[i] === 'maybe') {
            acc.push({
                start_date: time_slot.start_date,
                end_date: time_slot.end_date,
                preference: checkboxValues[i] === true ? 'yes' : 'maybe',
            });
        }
        return acc;
    }, []);

    setSelectedDates(newSelectedDates);

    console.log('New Selected Dates:', newSelectedDates);
};


const handleContinue = () => {
  // Check if there is at least one "Yes" or "Maybe" selected
  const hasYesOrMaybe = checkboxValues.some(value => value === true || value === 'maybe');

  if (hasYesOrMaybe) {
      setCurrentStep("enterNameAndEmail");
  } else {
      alert("Please select at least one 'Yes' or 'Maybe' time slot before continuing.");
  }
};

  

  const handleCancel = () => {
    setCheckboxValues(Array.from({ length: time_slots.length }, () => false));
    setSelectedDates([]);
    setCurrentStep("selectTimeSlot");
  };

const handleSubmit = async () => {
  const preferences = {
      selected_timeslots: selectedDates.map((date, index) => ({
          start_date: date.start_date,
          end_date: date.end_date,
          preference: checkboxValues[index] === true ? 'yes' : checkboxValues[index] || 'no',
      })),
  };

  console.log('Submitting Preferences:', preferences);  // Log the preferences being submitted

  try {
      const response = await fetch("http://localhost:8000/api/preferences/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(preferences),
      });

      if (response.ok) {
          console.log("Preferences submitted successfully!");
      } else {
          console.error("Failed to submit preferences:", response.statusText);
          console.log("Response Status:", response.status);
          console.log("Response Body:", await response.json());
          console.log("Submitted Preferences:", preferences);
      }
  } catch (error) {
      console.error("An unexpected error occurred:", error.message);
  }

  // Reset state after submission
  setCheckboxValues(Array.from({ length: time_slots.length }, () => false));
  setSelectedDates([]);
  setUserName("");
  setUserEmail("");
  setCurrentStep("selectTimeSlot");
};

  
  return (
    <div>
      {currentStep === "selectTimeSlot" && (
        <>
          <h1>Select your preferred times</h1>
          <p>We’ll let you know when the organizer picks the best time</p>

          <table
            id="table_meeting"
            style={{
              border: "3px solid #f5f5f5",
              borderRadius: "8px",
              width: "-webkit-fill-available",
              marginRight: "15px",
              marginLeft: "15px",
            }}
          >
            <thead>
              <tr>
                {time_slots &&
                  time_slots.map((value, index) => (
                    <th
                      key={index}
                      style={{ position: "relative", minWidth: "100px" }}
                      onClick={() => columnSelection(index)}
                      className={
                        selectedColumn === index ? "selected_column" : ""
                      }
                    >
                      {index === 0 ? (
                        <label
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                          }}
                        ></label>
                      ) : (
                        <label>
                          <br />
                          <p>
                            {time_slots[index]?.start_date
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                          </p>
                          <p>
                            {time_slots[index]?.start_date.split("T")[1]}
                          </p>
                          <p>{time_slots[index]?.end_date.split("T")[1]}</p>
                          <div className="div_user">
                            <img src={user} alt="user" />
                            <nobr> 2</nobr>
                          </div>
                          
                          <br/>
                          <Checkbox
                              onChange={() => handleCheckboxToggle(index)}
                              checked={checkboxValues[index] === true}
                              indeterminate={checkboxValues[index] === 'maybe'}
                              style={{
                                backgroundColor: checkboxValues[index] === true ? 'green' :
                                                  checkboxValues[index] === 'maybe' ? 'yellow' : 'transparent',
                                                  padding: '1px', // Adjust padding as needed
                                                  borderRadius: '1px', // Add border radius for rounded corners  // Add other styles as needed
                              }}
                          />
                             <br />
                          <Checkbox disabled checked />
                        </label>
                      )}
                    </th>
                  ))}
              </tr>
              <div style={{ marginTop: "-80px", marginLeft: "20px" }}>
                <span>You</span>
                <br />
                <br />
                <span>Degefom</span>
              </div>
            </thead>
            <tbody></tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button onClick={handleCancel}>Decline</button>
          <button  onClick={handleSubmit}>Submit</button>
        </div>


        </>
      )}

    </div>
  );
};

export default TableMeetingUser;
