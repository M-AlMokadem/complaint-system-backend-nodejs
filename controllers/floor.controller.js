var express = require("express");
var router = express.Router();
var { Floor } = require("../models/floor.model");
var auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    let floors = await Floor.find(function(error, response) {
      if (error) {
        res.send(error);
      } else {
        console.log("response", response);
        res.send(response);
      }
    });
  });


module.exports = router;


