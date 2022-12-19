import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const EventDate = (props) => {
  // function for handling start event date & time
  const handleStartDate = (newValue) => {
    props.setStartValue(newValue);
    props.setEvent({
      ...props.event,
      startDate: newValue.$d.toISOString().slice(0, 19).replace("T", " "),
    });
  };

  // function for handling end event date & time
  const handleEndDate = (newValue) => {
    props.setEndValue(newValue);
    props.setEvent({
      ...props.event,
      endDate: newValue.$d.toISOString().slice(0, 19).replace("T", " "),
    });
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Event Start Date & Time"
          value={props.startvalue}
          onChange={handleStartDate}
          renderInput={(params) => <TextField {...params} />}
          required
        />

        <DateTimePicker
          label="Event End Date & Time"
          value={props.endvalue}
          onChange={handleEndDate}
          renderInput={(params) => <TextField {...params} />}
          required
        />
      </LocalizationProvider>
    </>
  );
};
export default EventDate;
