var express = require("express");
var router = express.Router();
var { Issue } = require("../models/issue.model");
var auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    let issues = await Issue.find(function(error, response) {
      if (error) {
        res.send(error);
      } else {
        console.log("response", response);
        res.send(response);
      }
    });
  });


module.exports = router;


