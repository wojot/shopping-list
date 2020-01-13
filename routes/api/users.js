const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("mongoose");
const User = mongoose.model("User", require("../../models/User.js"));

router.get("/", (req, res) => {
  User.find((err, user) => {
    if (err) res.status(500).send("Error when retrieving Users!");
    res.json(user);
  });
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(400).send("Please submit complete data!"); 

  User.countDocuments({ email }, (err, count) => {
    if (err) res.status(500).send("Error when adding new User!");
    if (count > 0) {
      res.status(400).send("Email already has been taken!");
    } else {
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          console.log(`${email} - ${hash}`);
          let newUser = new User({ email, password: hash });
          newUser.save((err, newUser) => {
            if (err) res.status(500).send("Error when adding new User!");
            res.status(200).send(`Dodano uzytkownika ${newUser.email}`);
          });
        });
      });
    }
  });
});

module.exports = router;
