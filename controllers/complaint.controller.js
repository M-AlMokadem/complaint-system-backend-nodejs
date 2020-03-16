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
      //   console.log("response", response);
      res.send(response);
    }
  });
});

//Update
router.put("/update", async (req, res) => {
  if (req.body) {
    let data = req.body;
    try {
      const filter = { _id: data._id };
      const update = { status: data.status, lastUpdatedOn: Date.now()};
      console.log('status --> ', data.status);
      
      // // WE CAN USE THIS FOR MORE THAN ONE PROPERTY UPDATE 
      // let doc = await Complaint.findOne(filter);
      // console.log('doc ->>', doc );
      // doc._id = data._id;
      // doc.status = data.status;
      // doc.staffId = data.staffId;
      // doc.building = data.building;
      // doc.issue = data.issue;
      // doc.floor = data.floor;
      // doc.id = data.id;
      // let result = await doc.save();
      // console.log('result', result);

      let complaintResponse = await Complaint.findOneAndUpdate(filter, update, {
        new: true
      });
      console.log("complaintResponse --> ", complaintResponse);
      res.status(200).send({
        message: "Complaint Updated Successfully"});
    } catch (error) {}
  } else {
    return res.status(404).send("Request parameters are null");
  }
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
    complaint.description = data.description;
    complaint.status = "New";
    // complaint.createdOn = new Date.now();

    const result = await complaint.save();
    if (result) {
      console.log("res --> ", res);
      res.status(200).send({
        message: "Complaint Added Successfully",
        ticketNumber: result.id
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
});

module.exports = router;
