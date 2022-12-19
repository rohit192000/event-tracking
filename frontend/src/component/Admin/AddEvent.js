import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Stack,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import CategorySelect from "./CategorySelect";
import SubCategorySelect from "./SubCategorySelect";
import EventDate from "./EventDate";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  // Event Details Object
  const navi = useNavigate();
  const [event, setEvent] = useState({
    cat_id: "",
    subCategoryId: "",
    title: "",
    description: "",
    image: "",
    startDate: "",
    endDate: "",
  });
  console.log(event);
  // store data to show multiple data on sub-category toggle
  const [subCategoryNameToggle, setSubCategoryNameToggle] = useState([]);

  const [subCategoryIds, setSubCategoryIds] = useState();

  // function for storing category names from dropdown in variable above.
  const [catId, setCatId] = useState({
    id: "",
  });
  const [subCatIdSet, setSubCatIdSet] = useState(new Set());

  useEffect(() => {
    setSubCategoryIds(subCatIdSet);
    console.log(
      "Added values in set of id's of sub categories : ",
      subCatIdSet
    );
  }, [subCatIdSet]);

  // FILE UPLOAD
  const [file, setFile] = useState();
  // eslint-disable-next-line no-unused-vars
  const [fileName, setFileName] = useState("");

  // Function for save image file
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // DATE and TIME Picker variables
  const [startvalue, setStartValue] = useState();
  const [endvalue, setEndValue] = useState();

  // Function for submitting Event
  const addEvent = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (startvalue < new Date()) {
      alert("Please choose date greter than today's date");
    }
    if (startvalue > endvalue) {
      alert("Event Start Date can not  be greater than event end date");
      return false;
    }
    console.log(startvalue > endvalue);
    data.append("file", file);
    event.image = data;
    // const res = Object.assign(...Array.from(subCategoryIds, v => ({[v]:''})));
    console.log(subCategoryIds);
    // console.log(res)
    let item = [];
    subCategoryIds.forEach((data) => {
      console.log(data);
      item.push(data);
    });
    console.log(item);
    event.subCategoryId = item;
    axios
      .post("http://localhost:3001/event/addImage", event.image)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        axios.post("http://localhost:3001/event/add", event).then((res) => {
          console.log(res.data);
          alert("Event has been added successfully");
          navi('/admin')
        });
      });
  };
  return (
    <>
      <AdminNavbar />
      <form onSubmit={addEvent} method="post">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Event Form
          </Typography>

          {/*Category Select*/}
          <CategorySelect
            setCatId={setCatId}
            catId={catId}
            setSubCategoryNameToggle={setSubCategoryNameToggle}
            subCatIdSet={subCatIdSet}
            subCategoryNameToggle={subCategoryNameToggle}
            event={event}
            setEvent={setEvent}
          />

          <FormControl variant="outlined" sx={{ width: "70%" }}>
            <SubCategorySelect
              catId={catId}
              subCatIdSet={subCatIdSet}
              setSubCatIdSet={setSubCatIdSet}
              setSubCategoryNameToggle={setSubCategoryNameToggle}
              subCategoryNameToggle={subCategoryNameToggle}

            />

            <Stack spacing={3} sx={{ mt: 3 }}>
              {/*Event Title Field */}
              <TextField
                label="Event Title"
                variant="outlined"
                name="eventtitle"
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                required
              />
              {/*Event Description Field */}
              <TextareaAutosize
                placeholder="Event Description *"
                variant="outlined"
                name="description"
                minRows={10}
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
                style={{
                  borderRadius: "4px",
                  padding: "16.5px 14px",
                  font: "inherit",
                  fontSize: "inherit",
                  borderColor: "#c1c2c0",
                }}
                required
              />
              <EventDate
                setStartValue={setStartValue}
                startvalue={startvalue}
                setEndValue={setEndValue}
                endvalue={endvalue}
                setEvent={setEvent}
                event={event}
              />

              {/*Upload Image Button */}
              <input type="file" onChange={saveFile} />

              {/*Submit Event Form Button */}
              <Button
                variant="outlined"
                color="success"
                sx={{ mr: 1 }}
                type="submit"
              >
                Add Event
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </form>
    </>
  );
};

export default AddEvent;