const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const IssueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

var Issue = mongoose.model("Issue", IssueSchema);
module.exports = { Issue };
