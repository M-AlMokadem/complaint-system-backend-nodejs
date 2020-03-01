var express = require("express");
var router = express.Router();
var { Building } = require("../models/building.model");
var auth = require("../middleware/auth");

//Get all
router.get("/", async (req, res) => {
    let building = await Building.find(function(error, response) {
      if (error) {
        res.send(error);
      } else {
        console.log("response", response);
        res.send(response);
      }
    });
  });


module.exports = router;