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
  console.log('express router approached');
  res.json([{"_id":"5e110b83ccdaf41ae766a320","name":"test","added":"2020-01-04T22:02:43.506Z","__v":0},{"_id":"5e147567dcfa4e1380132550","name":"test","added":"2020-01-07T12:11:19.358Z","__v":0}]);
});


// router.get("/", (req, res) => {
//   console.log('express router approached')
//   Item.find((err, item) => {
//     res.json(item);
//   });
// });




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
