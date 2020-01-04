var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Item = mongoose.model("Item", require("../../models/Item"));

// router.get("/", (req, res) => {
//   res.send("Pobierz api /api/items");
// });

router.get("/api/items", (req, res) => {
  Item.find((err, item) => {
    res.json(item);
  });
});

router.delete("/api/items", (req, res) => {
  const id = req.body.id;
  Item.findByIdAndRemove(id, err => {
    if (!err) {
      res.status(200);
      res.send("Added id: " + id);
    } else {
      res.status(400).send();
    }
  });
});

router.post("/api/items", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save(err => {
    if (!err) {
      res.send(newItem);
    } else {
      res.status(400).send();
    }
  });
});

module.exports = router;
