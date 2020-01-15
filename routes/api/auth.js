const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User", require("../../models/User.js"));
const config = require("../../config/default.json");
var jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, usr) => {
    if (err) res.status(500).send({ msg: "Database error!" });
    if(usr == null){
        res.status(500).send({ msg: "Email not found!" });
        return;
    }
    bcrypt.compare(password, usr.password, (err, theSame) => {
      if (err) res.status(500).send({ msg: "Error occured!" });
      if (theSame) {
        const token = jwt.sign({ id: usr._id }, config.secretJWT, { expiresIn: "1h" });
        res.json({
            msg: "Login successful!",
            token,
            user: { id: usr._id, email: usr.email, added: usr.added }
        });
      } else {
        res.status(500).send({ msg: "Wrong password!" });
      }  
    });
  });
});

module.exports = router;
