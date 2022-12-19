const express = require("express");
const router = express.Router();
const SubCategory = require("../model/subCategory");

router.get("/", async (req, res) => {
  try {
    await new SubCategory()
      .fetchAll()
      .then((subcategory) => {
        res.send(subcategory.toJSON());
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    await new SubCategory(req.body)
      .save()
      .then((addSubCategory) => {
        res.send(addSubCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.all("/specific", async (req, res) => {
  try {
    await SubCategory.where(
      "category_id",
      req.body.id
    ).fetchAll().then(specific_sub_cat => {
        res.json(specific_sub_cat);
    }).catch(err =>{
        console.log(err)
    });
  } catch (err) {
    console.log(err);
  }
});

// router.all("/category", async (req, res) => {
//   let categories = await SubCategory.where({ category_id: 1 })
//     .fetchAll({ withRelated: ["category"] })
//     .then((sub) => {
//       console.log("hi");
//       res.send(JSON.stringify(sub));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // res.send(categories);
// });

// router.all("/event", async (req, res) => {
//   let event = await SubCategory.where({ id: 1 })
//     .fetchAll({ withRelated: ["subevent"] })
//     .then((sub) => {
//       console.log("hi");
//       res.send(JSON.stringify(sub));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // res.send(categories);
// });

module.exports = router;
