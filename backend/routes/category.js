var express = require("express");
var router = express.Router();
var Category = require("../model/category");

/* GET all category. */
router.get("/", async (req, res) => {
  try {
    await new Category()
      .fetchAll()
      .then((category) => {
        if (category.length === 0) {
          res.send("Category not found");
        } else {
          res.send(category.toJSON());
        }
      })
      .catch((err) => {
        res.status(404);
        console.log("Database module error", err);
      });
  } catch (err) {
    console.log("Error caught by try catch : ", err);
  }
});

router.post("/add", async (req, res) => {
  try {
    await new Category(req.body)
      .save()
      .then((category) => {
        res.send(category);
      })
      .catch((err) => {
        res.status(400).send("Category existed");
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
