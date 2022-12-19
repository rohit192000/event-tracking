import React, {useState} from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
const Filter = (props) => {

    var startDate = new Date("2015-08-04");
    var endDate = new Date("2015-08-12");

    // var resultProductData = product_data.filter(function (a) {
    //     var hitDates = a.ProductHits || {};
    //     // extract all date strings
    //     hitDates = Object.keys(hitDates);
    //     // convert strings to Date objcts
    //     hitDates = hitDates.map(function(date) { return new Date(date); });
    //     // filter this dates by startDate and endDate
    //     var hitDateMatches = hitDates.filter(function(date) { return date >= startDate && date <= endDate });
    //     // if there is more than 0 results keep it. if 0 then filter it away
    //     return hitDateMatches.length>0;
    // });
    // console.log(resultProductData);

    const [endvalue, setEndValue] = useState();
    const [startvalue, setStartValue] = useState();
  // function for handling start event date & time
  const handleStartDate = (newValue) => {
    setStartValue(newValue);
    // console.log("new value  :", newValue.$d.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}).replaceAll("/",'-').replace(',',''));
    let eventsFilter = props.events.filter(data => {
        // console.log("event data " ,data.start_date);
        let startDate = newValue.$d.toISOString().slice(0, 19).replace("T", " ");
        // let startDate = newValue.$d.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}).replaceAll("/",'-').replace(',','')
        return data.start_date > startDate;
    })
    props.setTempEvent(eventsFilter);
  };

  // function for handling end event date & time
  const handleEndDate = (newValue) => {
    setEndValue(newValue)
    let eventsFilter = props.events.filter(data => {
        console.log("event data " ,data.start_date);
        let endDate = newValue.$d.toISOString().slice(0, 19).replace("T", " ");
        return data.start_date < endDate;
    })

    props.setTempEvent(eventsFilter);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
        label="Greater Than"
        value={startvalue}
        onChange={handleStartDate}
        renderInput={(params) => <TextField {...params} />}
        required
      />

      <DateTimePicker
        label="Less than"
        value={endvalue}
        onChange={handleEndDate}
        renderInput={(params) => <TextField {...params} />}
        required
      />
    </LocalizationProvider>
        </>
    );
}

export default Filter;