const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FloorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

var Floor = mongoose.model("Floor", FloorSchema);
module.exports = { Floor };
