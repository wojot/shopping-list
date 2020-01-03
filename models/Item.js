var mongoose = require('mongoose');

var Item = new mongoose.Schema({
    name: String,
    added: { type: Date, default: Date.now },
  });

module.exports = Item;