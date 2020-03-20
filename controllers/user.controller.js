var express = require("express");
var router = express.Router();
var { User } = require("../models/user.model");
//const bcrypt = require("bcrypt");
var bcrypt = require('bcryptjs');


//Get all
router.get("/", async (req, res) => {
    let users = await User.find(function (error, response) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(response);
        }
    }).select("email");
});

//Add
router.post("/add", async (req, res) => {

    console.log("add user called >>>>> ");
    if (req.body) {
        var data = req.body;
    } else {
        return res.status(404).send("Request parameters are null");
    }

    try {
        const user = new User();
        const latestUser = await User.find()
            .sort({ _id: -1 })
            .limit(1);
        if (!latestUser.id == null) {
            user.id = 1;
        } else {
            user.id = latestUser[0].id + 1;
        }
        ///////////////////// 1 //////////////////////
        // await bcrypt.hash(data.password, 10, async function (err, hash) {
        //     user.password = hash;
        //     console.log(hash);
        // });
        ///////////////////// 2 //////////////////////
        // var hash = bcrypt.hash(data.password, 10);
        // console.log(hash);


        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        user.password = hash;
        user.email = data.email;

        const result = await user.save();
        if (result) {
            res.status(200).send({
                message: "User Added Successfully",
                userId: result.id
            });
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.put("/update", async (req, res) => {
    if (req.body) {
        var data = req.body;

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        try {
            const filter = { _id: data.id };
            const update = { email: data.email, password: hash };
            let userResponse = await User.findOneAndUpdate(filter, update, {
                new: true
            });
            console.log("response -> ", userResponse)
            res.status(200).send({
                message: "User Updated Successfully"
            });
        } catch (error) { }

    } else {
        return res.status(404).send("Request parameters are null");
    }


});

router.put("/changePassword", async (req, res) => {
    if (req.body) {
        var data = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        try {
            const filter = { _id: data.id };
            const update = { password: hash };
            let userResponse = await User.findOneAndUpdate(filter, update, {
                new: true
            });
            console.log("response -> ", userResponse)
            res.status(200).send({
                message: "User Updated Successfully"
            });
        } catch (error) { }

    } else {
        return res.status(404).send("Request parameters are null");
    }
});


module.exports = router;


