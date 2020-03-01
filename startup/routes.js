var express = require("express");

var account = require("../controllers/account.contoller");
var user = require("../controllers/user.controller");
var building = require("../controllers/building.controller");
var floor = require("../controllers/floor.controller");
var issue = require("../controllers/issue.controller");
var complaint = require("../controllers/complaint.controller");



module.exports = function(app) {
  app.use("/api/users", user);
  app.use("/api/building", building);
  app.use("/api/floor", floor);
  app.use("/api/issue", issue);
  app.use("/api/complaint", complaint);
  // app.use("/api/account", account);

};
