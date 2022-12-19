const express = require("express");
const router = express.Router();
const Event = require("../model/event");
const SubEvent = require("../model/subevent");

router.post("/event", async (req, res, next) => {
  try {
    await SubEvent
      .where("subcategory_id", "in", req.body.subcatid)
      .fetchAll({ columns: ["event_id"] })
      .then(async (event) => {
        let subevent = new Set([]);
        event.toJSON().map((a) => {
          return subevent.add(a.event_id);
        });
        let events = Array.from(subevent)
        console.log(events)
        await Event.where("id",'IN', events).fetchAll().then((data) => {
          res.send(data.toJSON())
          console.log(data.toJSON());
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
// .where("subcategory_id", "IN", req.body.subcatid)
