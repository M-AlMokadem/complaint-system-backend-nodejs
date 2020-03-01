var express = require("express");
var router = express.Router();
var { Complaint } = require("../models/complaint.model");
var auth = require("../middleware/auth");

//Get all
router.get("/", async (req, res) => {
  let complaint = await Building.find(function(error, response) {
    if (error) {
      res.send(error);
    } else {
      console.log("response", response);
      res.send(response);
    }
  });
});

//Add
router.post("/add", async (req, res) => {
  if (req.body) {
    var data = req.body;
  } else {
    return res.status(404).send("Request parameters are null");
  }

  try {
    const complaint = new Complaint();
    const latestComplaint = await Complaint.find()
      .sort({ _id: -1 })
      .limit(1);
    console.log(latestComplaint);

    if (!latestComplaint.id == null) {
      // TO DO:: check this if condition again, its not working in the first insert statment
      console.log("inside if cond");
      complaint.id = 1;
    } else {
      console.log("inside else cond");

      complaint.id = latestComplaint[0].id + 1;
    }

    complaint.staffId = data.staffId;
    complaint.building = data.building;
    complaint.floor = data.floor;
    complaint.issue = data.issue;
    complaint.status = data.status;

    const result = await complaint.save();
    if (result) {
      res.status(200).send({
        message: "Complaint Added Successfully",
        ticketNumber: result.id
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
