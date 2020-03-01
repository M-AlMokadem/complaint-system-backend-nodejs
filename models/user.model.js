const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  staffId: {
    type: String,
    required: false
  },
  firstName:{
    type: String,
    required: false
  },
  lastName:{
    type: String,
    required: false
  },
  isAdmin:{
      type: Boolean,
      required: true
  }
});

var User = mongoose.model("User", UserSchema);
module.exports = { User };
