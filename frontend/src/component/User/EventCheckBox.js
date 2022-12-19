import React, {useEffect, useState} from "react";
import { Checkbox } from "@mui/material";
const EventCheckBox = (props) => {
//   const label = { inputProps: { "aria-label": "Checkbox demo" } };
// const [eventId, setEventId] = useState(new Set([]));
  const [checked, setChecked] = useState(false);
  let eventid = props.postId;
  const handleChecked = (e) => {
    console.log(eventid);
    setChecked(prevState => e.target.checked);
  }
  useEffect(() => {
    console.log(checked);
    if(checked){
        console.log("Event added ", eventid);
        props.setEventId(prevState => new Set(prevState).add(eventid));
    }else{
        props.eventId.delete(eventid);
        console.log(props.eventId)
        console.log("Event remeoved", eventid)
    }
  }, [checked, eventid])

  useEffect(() => {
    console.log(props.eventId)
  }, [props.eventId])
  return (
    <>
      <Checkbox inputProps={{ 'aria-label': 'controlled' }} checked={checked} onChange={handleChecked}/>
    </>
  );
};

export default EventCheckBox;
