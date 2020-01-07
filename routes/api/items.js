var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Item = mongoose.model("Item", require("../../models/Item"));

// router.get("/", (req, res) => {
//   res.send("Pobierz api /api/items");
// });


// @route   GET api/items
// @desc    Get items
// @access  Private
router.get("/", (req, res) => {
  console.log('express router approached')
  Item.find((err, item) => {
    res.json(item);
  });
});

// @route   DELETE api/items
// @desc    Delete items
// @access  Private
router.delete("/", (req, res) => {
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

// @route   POST api/items
// @desc    Add item
// @access  Private
router.post("/", (req, res) => {
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
