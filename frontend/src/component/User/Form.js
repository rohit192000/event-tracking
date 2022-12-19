import React, { useState, Fragment, useEffect, useMemo } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import SelectCategory from "./SelectCategory";
import SelectSubCategory from "./SelectSubCategory";
import SelectEvent from "./SelectEvent";
import UserForm from "./UserForm";
import axios from "axios";

const Form = (props) => {
  //  store the value for menu option for select field for subcategory
  const [subCategorySelectValue, setSubCategorySelectValue] = useState([]);

  // store the value for selected category
  const [catId, setCatId] = useState({
    id: "",
  });

  // store the values for the set of id selected from the user
  const [subCatIdSet, setSubCatIdSet] = useState(new Set());

  // store the values for selected events from the user.
  const [eventId, setEventId] = useState(new Set([]));

  // store user data
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    event_ids: [],
  });
  const steps = [
    "Select Category",
    "Select Subcategory",
    "Select Event",
    "Add Details",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const [item, setEventItem] = useState([]);

  var check = {
    value : true
  }
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      for (var key in user) {
        if (user[key] === "") {
          console.log(key + " is blank. Deleting it");
          alert("Please fill all the values");
          return false;
        }
      }
    }
    if (activeStep === steps.length - 1) {
      console.log("Data added in temp array");
      eventId.forEach((data) => {
        item.push(data);
      });
      console.log(user);
      axios
        .post("http://localhost:3001/users/add", {
          name: user.name,
          email: user.email,
          contact: user.contact,
        })
        .then((response) => {
          console.log(response.data);
          axios
            .post("http://localhost:3001/userevent/add", {
              event_id: user.event_ids,
              user_id: response.data.id,
            })
            .then((response) => {
              alert("You have been registered for events")
              console.log(response.data);
            });
        })
        .catch((err) => {
          alert("already registered user");
        });
    }
    if (check.value) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  useEffect(() => {
    console.log(item);
    setUser((prevState) => ({ ...prevState, event_ids: item }));
    console.log();
  }, [item]);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  //  clear all fields
  const handleReset = () => {
    setActiveStep(0);
    item.splice(0, item.length);
    eventId.clear();
    subCategorySelectValue.splice(0, subCategorySelectValue.length);
    subCatIdSet.clear();
    catId.id = "";
    setUser({ ...user, name: "", email: "", contact: "" });
    console.log(item);
    console.log(user.event_ids);
    console.log(subCategorySelectValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              console.log("Index2: ", index);
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            {activeStep === 0 ? (
              <Fragment>
                <SelectCategory
                  setCatId={setCatId}
                  catId={catId}
                  subCategorySelectValue={subCategorySelectValue}
                  subCatIdSet={subCatIdSet}
                />
              </Fragment>
            ) : activeStep === 1 ? (
              <Fragment>
                <SelectSubCategory
                  catId={catId}
                  subCatIdSet={subCatIdSet}
                  setSubCatIdSet={setSubCatIdSet}
                  setSubCategorySelectValue={setSubCategorySelectValue}
                  subCategorySelectValue={subCategorySelectValue}
                />
              </Fragment>
            ) : activeStep === 2 ? (
              <Fragment>
                <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
                  <SelectEvent
                    catId={catId}
                    subCatIdSet={subCatIdSet}
                    eventId={eventId}
                    setEventId={setEventId}
                  />
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
                  <UserForm eventId={eventId} user={user} setUser={setUser} />
                </Box>
              </Fragment>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Fragment>
        )}
      </Box>
    </>
  );
};
export default Form;
