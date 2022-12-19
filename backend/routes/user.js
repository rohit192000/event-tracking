const express = require("express");
const router = express.Router();
const Users = require("../model/user");
// const Event = require("../model/event");

router.get("/", async (req, res) => {
  await new Users().fetchAll().then((user) => {
    res.send(JSON.stringify(user));
    console.log("hi");
  });
});

router.post("/add", async (req, res, next) => {
  try {
    await new Users(req.body)
      .save()
      .then((data) => {
        res.send(JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        res.status("500").send("Duplicate Entry");
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
