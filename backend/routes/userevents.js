const express = require("express");
const router = express.Router();
const UserEvents = require("../model/userevents");
// const Event = require("../model/event");

router.get("/", async (req, res, next) => {
  // const item = [];
  res.send("users");
  // await new User({name: "Rohit Samal", email:"rohitsamal2000@gmail.com", contact:'7973945288'}).save();
});

router.post("/add", async (req, res) => {
  try {
    req.body.event_id.forEach(async (data) => {
      await new UserEvents({
        event_id: data,
        user_id: req.body.user_id,
      })
        .save()
        .then((response) => {
          res.send(JSON.stringify(response));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
