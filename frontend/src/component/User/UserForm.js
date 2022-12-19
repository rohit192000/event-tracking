import React, { useEffect } from "react";
import { TextField, FormControl, Stack } from "@mui/material";

const UserForm = (props) => {
    var name_pattern = /^([a-zA-Z ]){2,30}$/;
    var email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var contact_pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    useEffect(() => {
        console.log(props.user);
    })
  return (
    <>
      <FormControl
        variant="outlined"
        style={{ width: "30%", margin: "2% 35%" }}
      >
        <Stack spacing={3}>
          <TextField required id="user_name" label="Name" variant="outlined" onChange={(e) => {
            console.log(e.target.value)
            if(!name_pattern.test(e.target.value)) return false
            props.setUser(prevState => ({...prevState, name: e.target.value}))
          }}/>
          <TextField required id="user_email" label="Email" variant="outlined" onChange={(e) => {
            console.log(e.target.value)
            if(!email_pattern.test(e.target.value)) return false
            props.setUser(prevState => ({...prevState, email: e.target.value}))
          }}/>
          <TextField required id="user_contact" label="Contact" variant="outlined" onChange={(e) => {
            console.log(e.target.value)
            if(!contact_pattern.test(e.target.value)) return false
            props.setUser(prevState => ({...prevState, contact: e.target.value}))
          }}/>
        </Stack>
      </FormControl>
    </>
  );
};
export default UserForm;
