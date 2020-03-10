var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var { User } = require("../models/user.model");
var auth = require("../middleware/auth");
// const nodemailer = require("nodemailer");
// var mustache = require("mustache");
const bcrypt = require("bcrypt");

// var fs = require("fs");
// const readXlsxFile = require("read-excel-file/node");
var multer = require("multer");
// var upload = multer({ storage: multer.memoryStorage() });

router.get("/authData", auth, async (req, res) => {
  res.json({ message: "Authenication", data: req.user });
});

router.get("/users", async (req, res) => {
  let users = await User.find(function(error, response) {
    if (error) {
      res.send(error);
    } else {
      // console.log("response", response);
      res.send(response);
    }
  });
});

router.post("/login", async (req, res) => {
  try {
    console.log("logiiiiiiiin");
    var user = await User.findOne({
      // password: req.body.password,
      email: req.body.email
    });
    // console.log(user);

    if (user) {
      await bcrypt.compare(req.body.password, user.password, function(
        err,
        response
      ) {
        if (response) {
          // Passwords match
          return res.json({
            token: jwt.sign({ email: user.email, _id: user._id } , "key", {expiresIn: 900})
          });
        } else {
          return res.status(200).send("Invalid Email or password");
        }
      });
    } else {
      // console.log("insdie else");
      return res.status(500).send("Invalid Email or password");
    }
  } catch (error) {
    // console.log("insdie catch");
    return res.status(400).send(error.message);
  }
});

//   router.post("/register", async (req, res) => {
//     var data = req.body;
//     try {
//       var segCreate = await User.create(data);
//       console.log(segCreate);

//       return res.send("User added Successfully");
//     } catch (error) {
//       return res.status(400).send(error.message);
//     }
//   });

module.exports = router;
