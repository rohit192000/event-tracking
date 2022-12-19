const express = require("express");
const router = express.Router();
const Event = require("../model/event");
const SubEvent = require("../model/subevent");
const multer = require("multer");
let imgName = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

router.get("/", async (req, res, next) => {
  try {
    await new Event()
      .fetchAll()
      .then((event) => {
        res.send(event.toJSON());
      })
      .catch((err) => {
        console.log("Fetch all event route : ", err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/addImage", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file);
    console.log(req.file);
    imgName = req.file.filename;
    console.log(imgName);
  });
});

router.post("/add", async (req, res) => {
  let subCategory = req.body.subCategoryId;
  try {
    let event = await new Event({
      category_id: req.body.cat_id,
      title: req.body.title,
      description: req.body.description,
      image: imgName,
      start_date: req.body.startDate,
      end_date: req.body.endDate,
    })
      .save()
      .catch((err) => {
        console.log("Add Event Route : ", err);
      });
    let events = event.toJSON();
    subCategory.forEach(async (data) => {
      console.log(data)
      await new SubEvent({
        subcategory_id: data,
        event_id: events.id,
      })
        .save()
        .catch((err) => {
          console.log("Adding subevent : ", err);
        });
    });
    res.send("Event has been added");
  } catch (err) {
    console.log(err);
  }
});

router.all("/category", async (req, res) => {
  try {
    await Event.where({ category_id: req.body.id })
      .fetchAll({
        withRelated: ["category"],
      })
      .then((categories) => {
        res.send(JSON.stringify(categories));
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
