import React, { useEffect, useState } from "react";
import { getEvent } from "../FetchAll";
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import Filter from "./Filter";
import EventCheckBox from "./EventCheckBox";
const SelectEvent = (props) => {
  const [events, setEvents] = useState([]);
  const [tempEvent, setTempEvent] = useState([]);
  useEffect(() => {
    // getEvent(setEvents);
    // console.log("Events : catid ", props.catId);
    let item = [];
    props.subCatIdSet.forEach((data) => {
      // console.log(data);
      item.push(data);
      console.log(item);
    });
    if (props.catId.id) {
      let size = props.subCatIdSet.size;
      if (size !== 0) {
        console.log(props.subCatIdSet)
        axios
          .post("http://localhost:3001/subevent/event", {
            subcatid: item,
          })
          .then((response) => {
            console.log(response.data);
            let events = [];
            response.data.forEach((data) => {
              events.push(data);
            });
            console.log(events);
            setEvents(events);
          });
      } else {
        console.log("cat_id is there");
        // console.log(props.subCatIdSet);
        axios
          .post("http://localhost:3001/event/category", props.catId)
          .then((response) => {
            console.log(response.data);
            setEvents(response.data);
          });
      }
    } else {
      getEvent(setEvents);
    }
  }, []);
  useEffect(() => {
    setTempEvent(events);
  }, [events])

  return (
    <>
      <Grid>
        <Filter events={events} setTempEvent={setTempEvent}/>
      </Grid>
      {tempEvent.map((post) => (
        <Grid item xs={12} md={6} key={post.id}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: "flex" }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {post.start_date.slice(0, 19).replace("T", " ")}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography>

                <EventCheckBox postId={post.id} eventId={props.eventId} setEventId={props.setEventId}/>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 500, display: { xs: "none", sm: "block" } }}
                src={`http://localhost:3001/images/${post.image}`}
                alt={post.imageLabel}
              />
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </>
  );
};
export default SelectEvent;
