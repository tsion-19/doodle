import React, { useState } from 'react';
import user from '../images/user.png';
import '../ManageMeeting/manage.css';
import Checkbox from '@mui/material/Checkbox';


const TableMeetingUser = ({ selectedColumn, columnSelection, data ,onSubmit}) => {
  // // Initialize time_slots array
  // const time_slots = [
  //   // ... altri valori esistenti in data["timeslots"]
  //   {},
  //   ...(Array.isArray(data["timeslots"]) ? data["timeslots"] : []),
  // ];
  // Initialize time_slots array
const time_slots = Array.isArray(data["timeslots"]) ? data["timeslots"] : [];

console.log('Data:', data);
console.log('Time Slots:', data["timeslots"]);
  const handleCheckboxToggle = (index) => {
    setCheckboxValues((prevValues) => {
      const newValues = [...prevValues];
      const currentValue = newValues[index];

      // Toggle checkbox value
      newValues[index] =
        currentValue === false
          ? true
          : currentValue === true
          ? 'maybe'
          : false;

      return newValues;
    });

    // Construct the selectedDates array based on checkbox values
    const newSelectedDates = time_slots.map((time_slot, i) => ({
      start_date: time_slot.start_date,
      end_date: time_slot.end_date,
      preference: checkboxValues[i] === true ? 'yes' : checkboxValues[i] === 'maybe' ? 'maybe' : 'no',
    }));

    setSelectedDates(newSelectedDates);
  };
  const [checkboxValues, setCheckboxValues] = useState(Array.from({ length: time_slots.length }, () => false));
  const [selectedDates, setSelectedDates] = useState(time_slots);

  const handleSubmit = async () => {
    const preferences = {
      selected_timeslots: selectedDates.map((time_slot, index) => ({
        start_date: time_slot.start_date,
        end_date: time_slot.end_date,
        preference: checkboxValues[index] === true ? 'yes' : checkboxValues[index] === 'maybe' ? 'maybe' : 'no',
      })),
    };

    console.log('Submitting Preferences:', preferences);

    try {
      const response = await fetch('http://localhost:8000/api/save-preferences/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (response.ok) {
        console.log('Preferences submitted successfully!');
        setCheckboxValues(Array.from({ length: time_slots.length }, () => false));
        setSelectedDates(time_slots);
        onSubmit(true);
      } else {
        const errorData = await response.json();
        console.error('Failed to submit preferences:', errorData);
      }
    } catch (error) {
      console.error('Error submitting preferences:', error);
    }
  };

  return (
    <div>
      <table
        id="table_meeting"
        style={{
          border: '3px solid #f5f5f5',
          borderRadius: '8px',
          width: '-webkit-fill-available',
          marginRight: '15px',
          marginLeft: '15px',
        }}
      >
        <thead>
          <tr>
          {time_slots.map((value, index) => {
  const startDate = new Date(value['start_date']);
  const endDate = new Date(value['end_date']);

  const startOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const endOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  const start = startDate.toLocaleDateString('en-US', startOptions);
  const end = endDate.toLocaleTimeString('en-US', endOptions);

  const formattedStartDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(value.start_date));
  
  const formattedEndDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(value.end_date));
  
  <p>{formattedStartDate} - {formattedEndDate}</p>
  
  return (
    <th
      key={index}
      style={{ position: 'relative', minWidth: '100px' }}
      onClick={() => columnSelection(index)}
      className={selectedColumn === index ? 'selected_column' : ''}
    >
      <label key={index}>
        <br />
        {/* <p>{start} - {end}</p> */}
        <p>{formattedStartDate} - {formattedEndDate}</p>
        <div className="div_user">
          <img src={user} alt="user" />
          <nobr> 2</nobr>
        </div>
        <br />
        <Checkbox
          onChange={() => handleCheckboxToggle(index)}
          checked={checkboxValues[index] === true}
          indeterminate={checkboxValues[index] === 'maybe'}
          style={{
            backgroundColor:
              checkboxValues[index] === true
                ? 'green'
                : checkboxValues[index] === 'maybe'
                ? 'yellow'
                : 'transparent',
            padding: '1px',
            borderRadius: '1px',
          }}
        />
        <br />
        <Checkbox disabled checked
      />
      <br />
      <span>You</span>
    </label>
  </th>
)})}

          </tr>
        </thead>
      </table>

      {/* Buttons for testing */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default TableMeetingUser;
