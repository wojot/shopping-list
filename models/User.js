const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: String,
  password: String,
  added: { type: Date, default: Date.now },
});

module.exports = User;
