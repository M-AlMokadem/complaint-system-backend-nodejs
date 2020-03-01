const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuildingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

var Building = mongoose.model("Building", BuildingSchema);
module.exports = { Building };
